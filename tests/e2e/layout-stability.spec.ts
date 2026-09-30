import { expect, test, type Browser } from "@playwright/test";

/**
 * Hydration must not disturb the layout the prerendered HTML already paints.
 *
 * Root cause this guards: when Angular hydrates an element whose template has a
 * static `class` AND `[class.x]` bindings, it first re-applies the static class
 * attribute (dropping the classes the server rendered from the bindings) and only
 * then, on the next update pass, re-adds them. For one frame the layout-critical
 * classes (`home-page`, `has-media`, ...) are absent and the page reflows.
 */
const mobile = { width: 412, height: 823 };
const desktop = { width: 1350, height: 940 };
const routes = [
  "/",
  "/sobre-mi",
  "/como-trabajo",
  "/areas-de-intervencion/infancia-y-familias",
];
const layoutClasses = [
  "page-shell",
  "home-page",
  "local-page",
  "trauma-page",
  "hero",
  "woven-hero",
  "has-media",
  "wide-media",
  "content-band",
];

test.describe("hydration layout stability", () => {
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "runs once, with its own explicit viewports",
    );
  });

  async function open(
    browser: Browser,
    viewport: { width: number; height: number },
    dpr: number,
  ) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: dpr,
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      const w = window as unknown as {
        __shift: number;
        __states: Map<Element, string[]>;
      };
      w.__shift = 0;
      w.__states = new Map();
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as unknown as {
          value: number;
          hadRecentInput: boolean;
        }[]) {
          if (!entry.hadRecentInput) w.__shift += entry.value;
        }
      }).observe({ type: "layout-shift", buffered: true });
      // Every intermediate value of a `class` attribute, per element (oldValue of
      // each record is the state before that mutation).
      new MutationObserver((records) => {
        for (const r of records) {
          if (r.attributeName !== "class") continue;
          const target = r.target as Element;
          const states = w.__states.get(target) ?? [];
          states.push(r.oldValue ?? "");
          w.__states.set(target, states);
        }
      }).observe(document, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ["class"],
        subtree: true,
      });
    });
    return { context, page };
  }

  for (const [label, viewport, dpr] of [
    ["mobile 412x823", mobile, 1.75],
    ["desktop 1350x940", desktop, 1],
  ] as const) {
    for (const route of routes) {
      test(`layout classes are never dropped during hydration: ${route} (${label})`, async ({
        browser,
      }) => {
        {
          const { context, page } = await open(browser, viewport, dpr);
          await page.goto(route);
          await page.waitForTimeout(1500);
          const dropped = await page.evaluate((tracked) => {
            const w = window as unknown as { __states: Map<Element, string[]> };
            const out: string[] = [];
            for (const [el, states] of w.__states) {
              if (!el.isConnected) continue;
              const initial = new Set(
                (states[0] ?? "")
                  .split(/\s+/)
                  .filter((c) => tracked.includes(c)),
              );
              for (const state of [
                ...states.slice(1),
                el.getAttribute("class") ?? "",
              ]) {
                const tokens = new Set(state.split(/\s+/));
                for (const c of initial)
                  if (!tokens.has(c))
                    out.push(
                      `${el.tagName.toLowerCase()} lost "${c}" (state "${state}")`,
                    );
              }
            }
            return out;
          }, layoutClasses);
          expect(dropped, `${route}: classes dropped after hydration`).toEqual(
            [],
          );
          await context.close();
        }
      });

      test(`total CLS stays under 0.05 across fresh loads: ${route} (${label})`, async ({
        browser,
      }) => {
        {
          for (let run = 0; run < 3; run++) {
            const { context, page } = await open(browser, viewport, dpr);
            await page.goto(route);
            await page.waitForTimeout(2500);
            const cls = await page.evaluate(
              () => (window as unknown as { __shift: number }).__shift,
            );
            expect(cls, `${route} run ${run + 1}: CLS ${cls}`).toBeLessThan(
              0.05,
            );
            await context.close();
          }
        }
      });
    }
  }
});
