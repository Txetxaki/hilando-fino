/**
 * The therapeutic models and in-session resources Marta describes in her copy
 * document (2026-07-31). Kept as data rather than template markup so the same
 * definitions can feed the method page, the hub pages and structured data
 * without three copies drifting apart.
 */
export interface MethodModel {
  name: string;
  /** Optional labelled rows ("¿Qué es?", "Aval científico") when she wrote them. */
  facets: readonly { label: string; text: string }[];
  /** Single-paragraph description for the models she summarised in one line. */
  summary?: string;
}

export interface MethodResource {
  name: string;
  qualifier: string;
  body: string;
  imageKey?: 'sandtray' | 'projectiveFigures';
}

export const methodModels: readonly MethodModel[] = [
  {
    name: 'Terapia EMDR',
    facets: [
      {
        label: '¿Qué es?',
        text: 'Un abordaje terapéutico que utiliza la estimulación bilateral (movimientos oculares, tapping o sonidos) para ayudar al cerebro a procesar y desbloquear recuerdos o experiencias difíciles que siguen generando malestar en el presente.'
      },
      { label: '¿Para qué se usa?', text: 'Altamente eficaz para el tratamiento de traumas, ansiedad, estrés y experiencias vitales adversas.' },
      { label: 'Aval científico', text: 'Recomendada por guías clínicas internacionales como la OMS, NICE o ISTSS como tratamiento de primera elección para el trauma.' }
    ]
  },
  {
    name: 'Círculo de Seguridad Parental',
    facets: [
      { label: '¿Qué es?', text: 'Un programa internacional basado en más de 50 años de investigación sobre la teoría del apego.' },
      {
        label: '¿Para qué sirve?',
        text: 'No busca enseñar la «crianza perfecta», sino ayudar a padres y cuidadores a comprender las verdaderas necesidades emocionales que se esconden tras las conductas de sus hijos.'
      },
      { label: 'El objetivo', text: 'Fortalecer un vínculo seguro que favorezca la autoestima y la regulación emocional del niño a lo largo de toda su vida.' }
    ]
  },
  {
    name: 'Terapia cognitivo-conductual',
    facets: [],
    summary: 'Enfoque práctico centrado en el presente. Ayuda a identificar y modificar patrones de pensamiento y comportamiento para gestionar la ansiedad y mejorar el día a día.'
  },
  {
    name: 'Terapia Gestalt',
    facets: [],
    summary: 'Centrada en el «aquí y el ahora». Favorece el autoconocimiento y el desarrollo personal desde un enfoque humanista, ampliando la conciencia de cómo te relacionas.'
  },
  {
    name: 'Bioenergética',
    facets: [],
    summary: 'Toma de conciencia del cuerpo. Ayuda a liberar tensiones físicas crónicas que sostienen emociones reprimidas, devolviendo la vitalidad y la conexión corporal.'
  },
  {
    name: 'Terapias de Tercera Generación',
    facets: [
      {
        label: '¿En qué consisten?',
        text: 'Abordajes orientados a la presencia plena, la aceptación emocional y la acción con sentido, ayudan a cambiar la manera en la que te relacionas con el malestar.'
      },
      {
        label: 'Herramientas que integro',
        text: 'Mindfulness para calmar la reactividad mental y conectar con el presente; ACT para actuar con libertad según tus decisiones y lo que realmente te importa; y Activación Conductual para romper el bucle de la apatía y la desmotivación.'
      }
    ]
  }
];

export const methodResources: readonly MethodResource[] = [
  {
    name: 'Terapia con caja de arena',
    qualifier: 'Sandtray Therapy',
    body: 'Una técnica proyectiva y no verbal que permite plasmar el mundo interno a través del uso de la arena y la elección de miniaturas. Facilita la representación de emociones, vivencias o traumas que resulta difícil expresar solo con palabras, permitiendo procesar y ordenar conflictos desde un espacio de seguridad y contención.',
    imageKey: 'sandtray'
  },
  {
    name: 'Trabajo proyectivo con Playmobil',
    qualifier: 'Muñecos y figuras proyectivas',
    body: 'Un recurso de orientación sistémica que utiliza figuras para representar visualmente las dinámicas familiares, los conflictos relacionales o los bloqueos internos. Al externalizar la situación sobre la mesa, la persona o la familia puede tomar distancia, observar el problema desde una nueva perspectiva y encontrar alternativas de solución de forma muy ágil.',
    imageKey: 'projectiveFigures'
  },
  {
    name: 'Cartas Dixit en terapia',
    qualifier: 'Proyección metafórica',
    body: 'Un recurso visual basado en imágenes ilustradas que actúa como puente para la expresión emocional y la autoexploración. Es especialmente útil para desbloquear la comunicación, poner nombre a sensaciones difíciles de definir y facilitar que niños, adolescentes y adultos conecten de forma intuitiva con lo que están sintiendo.'
  }
];
