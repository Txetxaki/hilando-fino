declare const __HILANDO_FINO_SITE_URL__: string;
declare const __HILANDO_FINO_BASE_HREF__: string;
declare const __HILANDO_FINO_DRAFT_NOINDEX__: boolean;

export const siteConfig = {
  siteUrl: __HILANDO_FINO_SITE_URL__,
  baseHref: __HILANDO_FINO_BASE_HREF__,
  draftNoindex: __HILANDO_FINO_DRAFT_NOINDEX__
} as const;
