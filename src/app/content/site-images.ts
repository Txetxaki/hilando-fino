/**
 * Photo manifest for the real consulting-room images Marta supplied (2026-07-31).
 *
 * Each entry lists the pre-rendered widths that exist in `public/images/`. Intrinsic
 * `width`/`height` are the largest rendered variant, so templates can set the
 * attributes that reserve layout space and keep CLS at zero before the file lands.
 */
export interface SiteImage {
  base: string;
  widths: readonly number[];
  width: number;
  height: number;
  alt: string;
  sizes: string;
}

function srcset(image: SiteImage, extension: 'webp' | 'jpg'): string {
  return image.widths.map((width) => `images/${image.base}-${width}.${extension} ${width}w`).join(', ');
}

export function webpSrcset(image: SiteImage): string {
  return srcset(image, 'webp');
}

export function jpgSrcset(image: SiteImage): string {
  return srcset(image, 'jpg');
}

export function fallbackSrc(image: SiteImage): string {
  return `images/${image.base}-${image.widths[image.widths.length - 1]}.jpg`;
}

export const siteImages = {
  martaDesk: {
    base: 'marta-escritorio',
    widths: [480, 720, 960, 1280],
    width: 1280,
    height: 1280,
    alt: 'Marta Martín, psicóloga general sanitaria, sentada en el escritorio de su consulta de Ciudad Real.',
    sizes: '(max-width: 720px) 92vw, 34rem'
  },
  martaWorking: {
    base: 'marta-consulta',
    widths: [480, 720, 960],
    width: 960,
    height: 1280,
    alt: 'Marta Martín trabajando en su consulta de psicología, junto a la ventana y una planta.',
    sizes: '(max-width: 720px) 92vw, 26rem'
  },
  consultingRoom: {
    base: 'sala-consulta',
    widths: [480, 720, 960],
    width: 960,
    height: 1222,
    alt: 'Rincón de la sala de consulta: sofá mostaza, lámpara de madera y planta junto a la pared.',
    sizes: '(max-width: 720px) 92vw, 26rem'
  },
  sandtray: {
    base: 'caja-de-arena',
    widths: [480, 720, 960],
    width: 960,
    height: 720,
    alt: 'Caja de arena de terapia con cuatro figuras colocadas sobre la arena.',
    sizes: '(max-width: 720px) 92vw, 30rem'
  },
  projectiveFigures: {
    base: 'figuras-proyectivas',
    widths: [480, 720, 960],
    width: 960,
    height: 720,
    alt: 'Figuras Playmobil colocadas sobre una bandeja giratoria de madera durante un trabajo proyectivo familiar.',
    sizes: '(max-width: 720px) 92vw, 30rem'
  }
} as const satisfies Record<string, SiteImage>;

export const ogImagePath = 'images/og-hilando-fino.jpg';
