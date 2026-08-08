declare const __HILANDO_FINO_SITE_URL__: string;
declare const __HILANDO_FINO_BASE_HREF__: string;

export const siteConfig = {
  siteUrl: __HILANDO_FINO_SITE_URL__,
  baseHref: __HILANDO_FINO_BASE_HREF__,
  draftNoindex: true
} as const;
