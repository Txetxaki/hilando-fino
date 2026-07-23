import { contentPages } from '../content/content-matrix';
import { hubLabels, topicsForHub } from '../content/interventions';
import type { StandardPageKey } from '../content/public-routes';
import { HubKey, PageCard, PageContent } from '../content/types';

function topicCards(hub: HubKey): PageCard[] {
  return topicsForHub(hub).map((topic) => ({
    title: topic.sourceLabel,
    body: topicSummaries[`${topic.parentHub}:${topic.sourceLabel}`],
    status: topic.status
  }));
}

const topicSummaries: Record<string, string> = {
  'children-families:ansiedad': 'Inventario para orientar futuras explicaciones sobre preocupación, miedo anticipatorio y acompañamiento familiar, pendiente de validar oferta y límites clínicos.',
  'children-families:miedos': 'Registro para contenidos sobre miedos infantiles y contexto evolutivo, sin convertirlo en página independiente hasta contar con criterio profesional aprobado.',
  'children-families:regulación emocional': 'Tema reservado para explicar habilidades emocionales en infancia y familia con lenguaje prudente, evitando promesas de cambio rápido.',
  'children-families:problemas de conducta': 'Entrada mantenida para abordar dificultades de conducta desde una mirada contextual y familiar, pendiente de confirmar enfoque y alcance real.',
  'children-families:dificultades escolares': 'Tema de infancia vinculado al entorno educativo; se conserva en el hub hasta diferenciarlo de orientación educativa y evitar duplicidades.',
  'children-families:trauma y duelo infantil': 'Área especialmente sensible que requiere revisión clínica cuidadosa antes de publicar cualquier explicación pública o pauta de contacto.',
  'children-families:separación de los padres': 'Registro para una futura pieza sobre acompañamiento familiar ante separación, sin asumir servicios, resultados ni situaciones legales concretas.',
  'children-families:autoestima': 'Tema preservado para infancia y familias con enfoque no etiquetante; necesita profundidad suficiente antes de plantearse como contenido propio.',
  'children-families:problemas de sueño': 'Entrada específica para sueño infantil que debe evitar consejos genéricos o medicalizados hasta contar con revisión profesional.',
  'children-families:control de esfínteres': 'Tema mantenido por su relevancia familiar, pendiente de delimitar cuándo procede orientación psicológica y cuándo derivación o consulta sanitaria.',
  'adolescents:autoestima': 'Inventario adolescente para hablar de autoconcepto y etapa vital con cuidado, sin reforzar autodiagnósticos ni mensajes simplistas.',
  'adolescents:ansiedad': 'Tema adolescente reservado para explicar malestar ansioso de forma comprensible, pendiente de confirmar oferta y límites de intervención.',
  'adolescents:relaciones sociales': 'Entrada para futuras orientaciones sobre vínculos, grupo y convivencia adolescente, sin prometer cambios ni usar presión comercial.',
  'adolescents:identidad': 'Tema sensible que exige lenguaje respetuoso y revisión de Marta antes de publicar cualquier contenido dirigido a adolescentes o familias.',
  'adolescents:orientación académica': 'Registro orientado a decisiones académicas y etapa adolescente, coordinable con el hub educativo para evitar canibalización.',
  'adolescents:trauma': 'Área clínica sensible preservada solo como inventario; requiere aprobación expresa antes de convertirse en contenido visible detallado.',
  'adolescents:duelo': 'Tema de acompañamiento ante pérdida en adolescencia, pendiente de una explicación prudente y no prescriptiva aprobada por Marta.',
  'adolescents:regulación emocional': 'Entrada para contenidos sobre emociones en adolescencia, habilidades y contexto familiar, todavía agrupada en el hub por seguridad editorial.',
  'adults:ansiedad': 'Inventario adulto para futuras explicaciones sobre ansiedad en la vida cotidiana, sin prometer alivio ni publicar técnicas sin revisión.',
  'adults:estrés': 'Tema reservado para diferenciar estrés, carga diaria y límites personales con lenguaje útil, pendiente de validación clínica y editorial.',
  'adults:trauma': 'Área adulta especialmente sensible; se mantiene en hub hasta contar con contenido profundo, revisado y coherente con los límites de la consulta.',
  'adults:duelo': 'Registro para acompañamiento en procesos de pérdida, evitando frases hechas o promesas sobre tiempos de recuperación.',
  'adults:dependencia emocional': 'Tema preservado para hablar de vínculos y autonomía con cuidado, sin culpabilizar ni usar reclamos de alto impacto.',
  'adults:relaciones de pareja': 'Entrada adulta para futuras explicaciones sobre relación de pareja, comunicación y conflicto, pendiente de confirmar alcance del servicio.',
  'adults:crecimiento personal': 'Tema amplio que queda agrupado para no crear contenido vacío; necesita definición concreta antes de ser publicable.',
  'education-training:dificultades de aprendizaje': 'Inventario educativo para orientar futuras explicaciones sobre aprendizaje, coordinación y familia, sin invadir evaluación no confirmada.',
  'education-training:altas capacidades': 'Tema formativo pendiente de delimitar entre orientación, acompañamiento familiar y coordinación educativa antes de publicarse.',
  'education-training:coordinación con centros educativos': 'Entrada operativa para colaboración con centros, bloqueada hasta confirmar protocolos, permisos y canales reales de coordinación.',
  'education-training:asesoramiento familiar': 'Tema de orientación a familias que requiere concretar formato, objetivos y límites antes de presentarse como servicio activo.'
};

const hubCards: PageCard[] = [
  {
    title: hubLabels['children-families'],
    body: 'Acompañamiento pendiente de concretar para necesidades de infancia, vínculos familiares y contexto escolar.',
    href: '/areas-de-intervencion/infancia-y-familias'
  },
  {
    title: hubLabels.adolescents,
    body: 'Un espacio de trabajo para etapa adolescente, pendiente de validación de servicios y límites concretos.',
    href: '/areas-de-intervencion/adolescentes'
  },
  {
    title: hubLabels.adults,
    body: 'Proceso psicológico para personas adultas, sin prometer resultados ni publicar especialidades no confirmadas.',
    href: '/areas-de-intervencion/adultos'
  },
  {
    title: hubLabels['education-training'],
    body: 'Orientación educativa y formación como línea pendiente de detallar con Marta.',
    href: '/areas-de-intervencion/orientacion-educativa-y-formacion'
  },
  {
    title: hubLabels.workshops,
    body: 'Ruta futura bloqueada hasta confirmar formato, fechas, audiencia, privacidad y condiciones.',
    href: '/talleres',
    status: 'future-scope'
  }
];

export const pageContents: Record<StandardPageKey, PageContent> = {
  home: {
    page: contentPages.home,
    heroNote: 'Borrador seguro: faltan datos profesionales, legales y de consulta antes de publicar o indexar.',
    sections: [
      {
        eyebrow: 'Cercanía profesional',
        title: 'Un lugar donde empezar a ordenar lo que ahora aparece enredado.',
        body: [
          'Hilando Fino Psicología parte de una idea sencilla: mirar con cuidado, sin prisa y sin convertir a la persona en una etiqueta.',
          'Esta web todavía no publica credenciales, dirección ni modalidades porque esos datos deben ser confirmados por Marta antes de salir a producción.'
        ],
        links: [
          { label: 'Ver cómo trabajo', href: '/como-trabajo' },
          { label: 'Contacto en modo seguro', href: '/contacto?modalidad=in-person-ciudad-real' }
        ]
      },
      {
        eyebrow: 'Ciudad Real',
        title: 'La ruta local está preparada, pero no fuerza datos no verificados.',
        body: [
          'La página de Psicología en Ciudad Real será la propietaria del contenido local cuando estén aprobados la dirección, el área de servicio y los canales de contacto.',
          'Hasta entonces, la web queda noindex para evitar publicar una presencia local incompleta.'
        ],
        links: [{ label: 'Leer la página local', href: '/psicologia-ciudad-real' }]
      }
    ],
    cards: hubCards.slice(0, 4)
  },
  about: {
    page: contentPages.about,
    heroNote: 'No se inventan colegiación, títulos, años de experiencia ni especialidades.',
    sections: [
      {
        eyebrow: 'Perfil pendiente de validar',
        title: 'Sobre Marta, sin adornos que sustituyan a los datos reales.',
        body: [
          'El nombre de marca confirmado es Marta Martín — Hilando Fino Psicología. El resto de datos profesionales siguen marcados como pendientes en la fuente de verdad del proyecto.',
          'Cuando Marta confirme número de colegiada, formación, especialidades, modalidad y datos de consulta, esta página podrá pasar de borrador seguro a contenido publicable.'
        ],
        links: [{ label: 'Ver datos pendientes', href: '/contacto#bloqueadores' }]
      }
    ]
  },
  method: {
    page: contentPages.method,
    heroNote: 'Texto basado en la fuente verificada IMG_0742.JPG, pendiente de revisión clínica final.',
    sections: [
      {
        eyebrow: 'Cómo trabajo',
        title: 'Una mirada integradora, cuidadosa y adaptada a cada persona.',
        body: [
          'Marta describe su trabajo desde una psicología integradora: cada persona trae una historia única y merece una intervención ajustada a sus necesidades.',
          'El proceso empieza con una evaluación cuidadosa para comprender no solo los síntomas, sino también aquello que puede estar manteniéndolos.'
        ]
      },
      {
        eyebrow: 'Enfoque',
        title: 'Rigor, humanidad y atención al cuerpo.',
        body: [
          'La fuente de trabajo menciona intervenciones con respaldo científico, como EMDR y otros modelos de eficacia demostrada, con una mirada humanista centrada en la persona, sus emociones, sus relaciones y sus recursos.',
          'También recoge formación en Terapia Gestalt y Bioenergética como parte de una comprensión que atiende tanto a la experiencia emocional como al papel del cuerpo y las relaciones en el bienestar psicológico.'
        ]
      },
      {
        eyebrow: 'Familias',
        title: 'Vínculo y comprensión de necesidades emocionales.',
        body: [
          'Con familias, la fuente menciona modelos basados en el apego, entre ellos el Círculo de Seguridad Parental, para favorecer la comprensión de las necesidades emocionales de niños y adolescentes.',
          'El objetivo declarado no es aplicar una técnica concreta de forma rígida, sino encontrar la forma de acompañar mejor a cada persona.'
        ]
      }
    ],
    cards: [
      { title: 'Evaluación cuidadosa', body: 'Primero comprender; después decidir cómo intervenir.' },
      { title: 'Sin promesas rápidas', body: 'La web evita plazos mágicos, garantías y presión comercial.' },
      { title: 'Proceso situado', body: 'Cada intervención debe ajustarse a la persona y a su contexto.' }
    ]
  },
  interventions: {
    page: contentPages.interventions,
    heroNote: 'Todos los temas están preservados; ninguno se publica como página fina sin aprobación.',
    sections: [
      {
        eyebrow: 'Áreas de intervención',
        title: 'Hubs claros antes que páginas duplicadas o vacías.',
        body: [
          'La arquitectura agrupa los temas por etapa o contexto. Esto permite orientar a la persona sin crear páginas SEO pobres, repetidas o clínicamente imprecisas.',
          'Cada tema conserva su etiqueta exacta en el inventario y queda pendiente de aprobación de Marta antes de convertirse en contenido final.'
        ]
      }
    ],
    cards: hubCards
  },
  childrenFamilies: hubPage('childrenFamilies', 'children-families'),
  adolescents: hubPage('adolescents', 'adolescents'),
  adults: hubPage('adults', 'adults'),
  educationTraining: hubPage('educationTraining', 'education-training'),
  local: {
    page: contentPages.local,
    heroNote: 'Ruta prioritaria para Ciudad Real, todavía no indexable por falta de NAP/modalidad aprobados.',
    sections: [
      {
        eyebrow: 'Psicología en Ciudad Real',
        title: 'Preparada para intención local, sin inventar dirección ni disponibilidad.',
        body: [
          'Esta página será la propietaria de la intención local: personas que buscan psicología en Ciudad Real y necesitan entender si la consulta encaja con lo que buscan.',
          'La prioridad de contacto presencial queda modelada, pero se muestra como pendiente hasta que Marta confirme dirección, modalidad presencial, horario y canales.'
        ],
        links: [{ label: 'Preguntar por disponibilidad presencial', href: '/contacto?modalidad=in-person-ciudad-real' }]
      },
      {
        eyebrow: 'SEO honesto',
        title: 'Sin keyword stuffing, sin puerta falsa y sin promesas de posición.',
        body: [
          'La estructura técnica soporta metadatos únicos, canonical, migas de pan, sitemap y schema seguro. La publicación local queda bloqueada hasta disponer de datos idénticos en web, Google Business Profile, citas y páginas legales.'
        ]
      }
    ]
  },
  workshops: {
    page: contentPages.workshops,
    heroNote: 'Sección futura: no existe oferta verificable de talleres todavía.',
    sections: [
      {
        eyebrow: 'Futuro alcance',
        title: 'Los talleres necesitan datos reales antes de aparecer como oferta.',
        body: [
          'Esta ruta existe para preservar la intención del proyecto, pero no anuncia fechas, formatos, precios ni resultados.',
          'Para activarla hacen falta audiencia, contenido, modalidad, condiciones, privacidad y aprobación comercial/legal.'
        ]
      }
    ]
  }
};

function hubPage(key: 'childrenFamilies' | 'adolescents' | 'adults' | 'educationTraining', hub: HubKey): PageContent {
  const page = contentPages[key];
  return {
    page,
    heroNote: 'Hub noindex hasta confirmar servicio real, límites y profundidad editorial.',
    sections: [
      {
        eyebrow: hubLabels[hub],
        title: 'Inventario completo, publicación prudente.',
        body: [
          'Estos temas aparecen exactamente como fueron solicitados. Por seguridad editorial y SEO, se mantienen dentro del hub hasta que Marta confirme cuáles forman parte de su trabajo real.',
          'No hay diagnósticos, autodiagnóstico ni promesas clínicas. La página ayuda a ordenar información, no sustituye una valoración profesional.'
        ],
        links: [
          { label: 'Cómo trabajo', href: '/como-trabajo' },
          { label: 'Contacto', href: '/contacto' }
        ]
      }
    ],
    cards: topicCards(hub)
  };
}
