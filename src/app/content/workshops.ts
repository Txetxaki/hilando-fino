/**
 * Workshop catalogue, verbatim from Marta's copy document (2026-07-31).
 *
 * Dates, prices, venues and past clients are deliberately absent: she did not
 * supply them, and a training page that invents them is a commercial claim she
 * would have to honour.
 */
export interface WorkshopLine {
  name: string;
  audience?: string;
  body: string;
  contentsTitle?: string;
  contents?: readonly string[];
}

export const workshopLines: readonly WorkshopLine[] = [
  {
    name: 'Talleres para centros educativos',
    body: 'Formaciones prácticas para comprender qué hay detrás de las conductas de niños y adolescentes y aprender herramientas útiles que puedan aplicarse desde el primer día en el aula.',
    audience: 'Dirigido a docentes, equipos directivos y de orientación.',
    contentsTitle: 'Trauma y duelo en el aula',
    contents: [
      'Cómo afectan el trauma y el duelo al aprendizaje.',
      'Señales de alerta y detección temprana.',
      'Regulación emocional en el aula de forma segura.',
      'Qué hacer y qué evitar como educadores.',
      'Estrategias para acompañar desde la escuela.'
    ]
  },
  {
    name: 'Psicología y movimiento',
    body: 'Talleres experienciales donde el movimiento, el cuerpo y la expresión se convierten en herramientas para favorecer el autoconocimiento, la regulación emocional y las habilidades sociales.',
    contentsTitle: 'Qué se trabaja',
    contents: [
      'Conciencia e integración corporal.',
      'Sistemas de regulación emocional del sistema nervioso.',
      'Expresión de emociones a través de lo corporal.',
      'Creatividad y espontaneidad relacional.',
      'Cohesión y seguridad en dinámicas grupales.'
    ]
  },
  {
    name: 'Educación emocional',
    body: 'Espacios de prevención y sensibilización orientados a familias, escuelas y colectivos sociales para dotar de herramientas emocionales prácticas que fortalezcan la resiliencia, la empatía y la resolución saludable de los conflictos cotidianos.'
  }
];
