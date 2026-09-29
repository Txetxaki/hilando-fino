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
  /* Inicio.jpg (Marta, delivered 2026-09-27), 5184x3456 landscape. Home hero,
     paired with the logo mark instead of replacing it. */
  homeHero: {
    base: 'hero-inicio',
    widths: [480, 720, 960, 1280],
    width: 1280,
    height: 853,
    alt: 'Manos sosteniendo un anillo sobre una mesa de madera clara, en un gesto cercano y cuidadoso.',
    sizes: '(max-width: 720px) 92vw, 34rem'
  },
  /* Tirando.jpg, 3456x5184 portrait. Smaller side image for the home "Tirando
     del hilo" section, not a hero. */
  tirandoDelHilo: {
    base: 'tirando-del-hilo',
    widths: [480, 720, 960],
    width: 960,
    height: 1440,
    alt: 'Una bola de lana roja con el hilo extendido en primer plano y una mujer de pie al fondo, en un campo al atardecer.',
    sizes: '(max-width: 720px) 92vw, 22rem'
  },
  /* sobre mi.jpg, 3456x5184 portrait. About-page hero, replacing the previous
     marta-escritorio placeholder. */
  aboutPortrait: {
    base: 'sobre-mi',
    widths: [480, 720, 960],
    width: 960,
    height: 1440,
    alt: 'Retrato en blanco y negro de Marta Martín sonriendo, con una varita en forma de estrella cerca del rostro.',
    sizes: '(max-width: 720px) 92vw, 34rem'
  },
  /* cuerpo.jpg, 5184x3456 landscape. Side image for the about-page section on
     her path through movement and bodily expression. */
  aboutBody: {
    base: 'cuerpo-y-movimiento',
    widths: [480, 720, 960],
    width: 960,
    height: 640,
    alt: 'Marta Martín sentada dentro de un aro rojo junto a un lago, con expresión relajada.',
    sizes: '(max-width: 720px) 92vw, 26rem'
  },
  /* cerca.jpg, 3456x5184 portrait. Side image for the about-page section on the
     consulting room. */
  aboutDesk: {
    base: 'consulta-cerca',
    widths: [480, 720, 960],
    width: 960,
    height: 1440,
    alt: 'Una planta en un jarrón de cristal junto a una ventana, en un rincón sereno de la consulta.',
    sizes: '(max-width: 720px) 92vw, 22rem'
  },
  /* trabajo.jpg, 5184x3456 landscape. Método-page hero, replacing the previous
     marta-consulta placeholder. */
  methodHero: {
    base: 'como-trabajo',
    widths: [480, 720, 960, 1280],
    width: 1280,
    height: 853,
    alt: 'Mujer reclinada en un sillón con un libro sobre el rostro, rodeada de plantas, en un momento de pausa.',
    sizes: '(max-width: 720px) 92vw, 34rem'
  },
  /* proceso.png, 1024x1536 portrait. Side image for the "no una técnica para
     todo" section. */
  methodProcess: {
    base: 'proceso-terapeutico',
    widths: [480, 720, 960],
    width: 960,
    height: 1440,
    alt: 'Retrato de Marta Martín con gafas y camisa blanca, en actitud reflexiva.',
    sizes: '(max-width: 720px) 92vw, 22rem'
  },
  /* vinculos.jpg, 3456x5184 portrait. Side image for the section on the body
     and on bonds. */
  methodBonds: {
    base: 'cuerpo-y-vinculos',
    widths: [480, 720, 960],
    width: 960,
    height: 1440,
    alt: 'Manos colocando muñecos de madera de colores sobre una mesa, representando vínculos y relaciones.',
    sizes: '(max-width: 720px) 92vw, 22rem'
  },
  /* duelo.jpg, 3456x5184 portrait. Hero for the adults intervention area. */
  adultsHero: {
    base: 'adultos-duelo',
    widths: [480, 720, 960],
    width: 960,
    height: 1440,
    alt: 'Mujer de pie junto a un lago al atardecer, con la mirada baja, en un momento de calma introspectiva.',
    sizes: '(max-width: 720px) 92vw, 26rem'
  },
  /* Perinatal.JPG, delivered at 951x634: the only source that is not a
     high-resolution original, so it stops at its native width instead of the
     usual 960 step to avoid upscaling. */
  perinatalHero: {
    base: 'psicologia-perinatal',
    widths: [480, 720, 951],
    width: 951,
    height: 634,
    alt: 'Mujer embarazada sentada al aire libre, con las manos sobre el vientre.',
    sizes: '(max-width: 720px) 92vw, 26rem'
  },
  /* familias.jpg, 5184x3456 landscape. Hero for the children-and-families
     intervention area. */
  childrenFamiliesHero: {
    base: 'infancia-y-familias',
    widths: [480, 720, 960],
    width: 960,
    height: 640,
    alt: 'Mano sosteniendo una bandeja de madera con figuras de colores, un recurso de juego terapéutico.',
    sizes: '(max-width: 720px) 92vw, 26rem'
  },
  /* adolescentes.jpg, 3456x5184 portrait. Hero for the adolescents
     intervention area. */
  adolescentsHero: {
    base: 'adolescentes',
    widths: [480, 720, 960],
    width: 960,
    height: 1440,
    alt: 'Teléfono de disco antiguo en rojo sobre una superficie tejida, con una persona sentada al fondo.',
    sizes: '(max-width: 720px) 92vw, 26rem'
  },
  /* contacto.jpg, delivered but unlisted in Marta's photo doc; used on the
     contact page hero, whose natural slot it fits closely (a phone call). */
  contactHero: {
    base: 'contacto',
    widths: [480, 720, 960],
    width: 960,
    height: 1440,
    alt: 'Marta Martín hablando por un teléfono de disco antiguo junto a un lago, sonriendo.',
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
  },
  /* IMG_6303.jpeg (Marta, 2026-08-29), 4280x4978. Kept at its native portrait
     ratio rather than cropped to the 4:3 of its siblings: the four cards run
     almost edge to edge vertically, so any centred crop clips two of them. */
  dixitCards: {
    base: 'cartas-dixit',
    widths: [480, 720, 960],
    width: 960,
    height: 1117,
    alt: 'Cuatro cartas ilustradas de Dixit extendidas sobre una mesa clara de madera.',
    sizes: '(max-width: 720px) 92vw, 22rem'
  }
} as const satisfies Record<string, SiteImage>;

export const ogImagePath = 'images/og-hilando-fino.jpg';
