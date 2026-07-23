import { contentPages } from '../content/content-matrix';
import { hubLabels } from '../content/hub-labels';
import { treatmentsForSector } from '../content/treatment-index';
import type { StandardPageKey } from '../content/public-routes';
import { HubKey, PageCard, PageContent } from '../content/types';

function topicCards(hub: HubKey): PageCard[] {
  if (hub === 'workshops') return [];
  return treatmentsForSector(hub).map((topic) => ({ title: topic.h1, body: topic.summary, href: topic.canonicalPath }));
}

const areaCards: PageCard[] = [
  { title: hubLabels['children-families'], body: 'Acompañamiento a niños y familias cuando la emoción, la conducta, la escuela o los vínculos necesitan una mirada más fina.', href: '/areas-de-intervencion/infancia-y-familias' },
  { title: hubLabels.adolescents, body: 'Un espacio para escuchar la adolescencia sin simplificarla: identidad, ansiedad, relaciones, duelo, trauma y decisiones académicas.', href: '/areas-de-intervencion/adolescentes' },
  { title: hubLabels.adults, body: 'Proceso para personas adultas que quieren comprender ansiedad, estrés, trauma, duelo, dependencia emocional, pareja o crecimiento personal.', href: '/areas-de-intervencion/adultos' },
  { title: hubLabels['education-training'], body: 'Orientación a familias y contextos educativos ante aprendizaje, altas capacidades, coordinación con centros y acompañamiento familiar.', href: '/areas-de-intervencion/orientacion-educativa-y-formacion' },
  { title: 'Trauma y duelo en Ciudad Real', body: 'Una página específica para entender cómo se puede acompañar el trauma y el duelo desde evaluación, ritmo y cuidado clínico.', href: '/psicologia-trauma-ciudad-real' },
  { title: hubLabels.workshops, body: 'Talleres y formación para convertir conocimiento psicológico en herramientas comprensibles para familias, adolescentes, adultos y educación.', href: '/talleres' }
];

const commonRelated: PageCard[] = [
  { title: 'Cómo trabajo', body: 'Conoce la evaluación cuidadosa, la mirada integradora y el lugar de herramientas como EMDR.', href: '/como-trabajo' },
  { title: 'Psicología en Ciudad Real', body: 'Una página para situar la atención psicológica en el contexto local y elegir con más criterio.', href: '/psicologia-ciudad-real' },
  { title: 'Contacto', body: 'Si quieres orientar tu consulta, empieza por un mensaje breve y práctico.', href: '/contacto' }
];

export const pageContents: Record<StandardPageKey, PageContent> = {
  home: {
    page: contentPages.home,
    heroNote: 'Psicología en Ciudad Real con una mirada cálida, rigurosa y profundamente humana.',
    sections: [
      {
        eyebrow: 'Empezar con calma',
        title: 'Un lugar para desenredar lo que ahora pesa.',
        body: [
          'Trabajo desde una idea sencilla: antes de intervenir necesito comprender bien. No se trata de encajarte en una etiqueta, sino de mirar historia, contexto, cuerpo, emociones y vínculos.',
          'Mi forma de acompañar es integradora, con evaluación cuidadosa y comunicación clara. La prioridad es que entiendas qué te ocurre, qué necesitas y qué camino terapéutico puede tener sentido para tu situación.'
        ],
        links: [
          { label: 'Conocer cómo trabajo', href: '/como-trabajo' },
          { label: 'Leer sobre mí', href: '/sobre-mi' }
        ]
      },
      {
        eyebrow: 'Ciudad Real',
        title: 'Psicología cercana para personas y familias de Ciudad Real.',
        body: [
          'Si buscas psicología en Ciudad Real, quiero que puedas valorar el encaje con calma: qué tipo de acompañamiento puedo ofrecer, cómo entiendo el proceso y qué áreas pueden trabajarse.',
          'Si tu búsqueda tiene que ver con trauma, duelo, ansiedad, infancia, adolescencia o una etapa adulta compleja, puedes moverte por las áreas principales sin perder el hilo.'
        ],
        links: [
          { label: 'Psicóloga en Ciudad Real', href: '/psicologia-ciudad-real' },
          { label: 'Trauma y duelo en Ciudad Real', href: '/psicologia-trauma-ciudad-real' }
        ]
      },
      {
        eyebrow: 'Áreas',
        title: 'Encuentra el punto de entrada que más se parece a lo que necesitas.',
        body: [
          'Infancia y familias, adolescencia, adultos, orientación educativa y talleres se organizan como puertas de entrada amplias. Dentro de cada área encontrarás situaciones frecuentes descritas sin diagnosticar ni prometer resultados.',
          'La intención es que puedas reconocer un tema, leerlo con cuidado y decidir si merece la pena pedir una primera orientación.'
        ],
        links: [
          { label: 'Ver áreas de intervención', href: '/areas-de-intervencion' },
          { label: 'Ir a contacto', href: '/contacto' }
        ]
      }
    ],
    cards: areaCards.slice(0, 4),
    related: [areaCards[4], areaCards[5], commonRelated[2]]
  },
  about: {
    page: contentPages.about,
    heroNote: 'Una presentación honesta desde lo que sí sostiene la forma de trabajar.',
    sections: [
      {
        eyebrow: 'Marta Martín',
        title: 'Una forma de acompañar que empieza por mirar bien.',
        body: [
          'Estoy al frente de Hilando Fino Psicología con una forma de entender la consulta que pone cuidado, comprensión y precisión clínica en el centro del proceso terapéutico.',
          'Mi manera de trabajar habla de integración: evaluar con detalle, atender a la persona completa y escoger herramientas que tengan sentido para cada caso, sin imponer un molde único.'
        ],
        links: [{ label: 'Ver el método de trabajo', href: '/como-trabajo' }]
      },
      {
        eyebrow: 'Mirada clínica',
        title: 'Persona, emoción, cuerpo y relaciones.',
        body: [
          'Trabajo desde una mirada humanista y centrada en la persona. Esto implica escuchar la experiencia subjetiva, pero también observar cómo influyen el cuerpo, las emociones, los vínculos y el entorno.',
          'En familias, esa mirada se abre al apego y a la comprensión de las necesidades emocionales de niños y adolescentes, con referencias como Círculo de Seguridad Parental.'
        ],
        links: [{ label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' }]
      },
      {
        eyebrow: 'Ciudad Real',
        title: 'Un proyecto pensado para acompañar de cerca.',
        body: [
          'Acompaño a personas y familias que buscan atención psicológica en Ciudad Real y valoran un lenguaje claro, una relación terapéutica cuidada y un proceso construido paso a paso.',
          'Si estás comparando opciones, puede ayudarte leer también la página local y la explicación sobre trauma y duelo.'
        ],
        links: [
          { label: 'Psicología en Ciudad Real', href: '/psicologia-ciudad-real' },
          { label: 'Trauma y duelo', href: '/psicologia-trauma-ciudad-real' }
        ]
      }
    ],
    related: commonRelated
  },
  method: {
    page: contentPages.method,
    heroNote: 'Evaluar, comprender e intervenir con una mirada integradora.',
    sections: [
      {
        eyebrow: 'Evaluación',
        title: 'Primero comprender qué ocurre y qué lo mantiene.',
        body: [
          'El proceso empieza con una evaluación cuidadosa. Esto significa escuchar lo que trae la persona, ordenar la demanda, explorar el contexto y observar qué factores pueden estar sosteniendo el malestar.',
          'La evaluación no es una entrevista fría ni una lista de síntomas. Es el primer tramo del hilo: permite decidir qué necesita la persona, qué recursos ya tiene y qué tipo de intervención puede ser más adecuada.'
        ],
        links: [
          { label: 'Ver áreas de intervención', href: '/areas-de-intervencion' },
          { label: 'Leer sobre mí', href: '/sobre-mi' }
        ]
      },
      {
        eyebrow: 'Integración',
        title: 'No una técnica para todo, sino un proceso ajustado a cada persona.',
        body: [
          'Trabajo desde una forma integradora. Esa integración combina una mirada humanista, centrada en la persona, con herramientas psicológicas respaldadas científicamente cuando son pertinentes.',
          'Entre esas herramientas aparece EMDR, especialmente conocido por su uso en experiencias traumáticas, siempre dentro de una valoración previa y sin convertirlo en una solución automática para todos los casos.'
        ],
        links: [{ label: 'Psicología para trauma y duelo', href: '/psicologia-trauma-ciudad-real' }]
      },
      {
        eyebrow: 'Cuerpo y emoción',
        title: 'Lo que sentimos también se expresa en el cuerpo y en los vínculos.',
        body: [
          'La formación en Terapia Gestalt y Bioenergética suma una sensibilidad hacia la experiencia emocional, corporal y relacional. Muchas veces el malestar no aparece solo como pensamiento: también se manifiesta como tensión, bloqueo, impulsividad, cansancio o dificultad para poner límites.',
          'Trabajar con esa complejidad exige un ritmo prudente y una relación terapéutica segura.'
        ],
        links: [{ label: 'Adultos', href: '/areas-de-intervencion/adultos' }]
      },
      {
        eyebrow: 'Familias y apego',
        title: 'Comprender las necesidades emocionales detrás de la conducta.',
        body: [
          'En infancia, adolescencia y familias, el trabajo incorpora una mirada basada en el apego. Modelos como Círculo de Seguridad Parental ayudan a entender qué necesita un niño o adolescente cuando muestra miedo, rabia, bloqueo o conductas difíciles.',
          'El objetivo es que los adultos puedan responder con más claridad, presencia y límites, sin culpabilizar ni perder de vista el contexto.'
        ],
        links: [
          { label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' },
          { label: 'Adolescentes', href: '/areas-de-intervencion/adolescentes' }
        ]
      }
    ],
    cards: [
      { title: 'Evaluación cuidadosa', body: 'Antes de decidir el camino, se escucha, se ordena la demanda y se comprende el contexto.' },
      { title: 'Herramientas con criterio', body: 'EMDR y otros recursos se valoran dentro de un proceso, no como recetas universales.' },
      { title: 'Vínculo terapéutico', body: 'La relación de trabajo también es parte del cuidado: claridad, ritmo y seguridad.' }
    ],
    related: [commonRelated[1], areaCards[0], commonRelated[2]]
  },
  interventions: {
    page: contentPages.interventions,
    heroNote: 'Un mapa claro para elegir por etapa, contexto o motivo de consulta.',
    sections: [
      {
        eyebrow: 'Mapa de ayuda',
        title: 'Cuatro áreas principales y una línea formativa.',
        body: [
          'Las áreas de intervención están organizadas para que puedas orientarte sin tener que traducir lenguaje técnico. Cada bloque agrupa situaciones frecuentes y las explica de forma amplia, no como diagnósticos cerrados.',
          'Si dudas entre varias áreas, empieza por la etapa vital o el contexto: infancia y familia, adolescencia, vida adulta, entorno educativo o talleres.'
        ],
        links: [
          { label: 'Psicología en Ciudad Real', href: '/psicologia-ciudad-real' },
          { label: 'Cómo trabajo', href: '/como-trabajo' },
          { label: 'Sobre mí', href: '/sobre-mi' }
        ]
      },
      {
        eyebrow: 'Trauma y duelo',
        title: 'Una ruta específica para experiencias que necesitan especial cuidado.',
        body: [
          'Trauma y duelo aparecen en infancia, adolescencia y vida adulta. Por eso cuentan también con una página propia orientada a Ciudad Real, conectada con cada área y con el método de trabajo.',
          'La prioridad es explicar con prudencia: evaluar antes, respetar el ritmo y evitar promesas sobre resultados.'
        ],
        links: [{ label: 'Leer trauma y duelo en Ciudad Real', href: '/psicologia-trauma-ciudad-real' }]
      }
    ],
    cards: areaCards,
    related: commonRelated
  },
  childrenFamilies: hubPage({
    key: 'childrenFamilies',
    hub: 'children-families',
    intro: 'Acompañar a un niño implica mirar también a la familia, la escuela, las rutinas y los vínculos. La conducta, el miedo o el sueño rara vez se entienden bien si se separan del contexto.',
    situations: 'Puede tener sentido pedir orientación cuando la ansiedad, los miedos, los conflictos de conducta, la autoestima, el sueño, el control de esfínteres, una separación familiar, el trauma o el duelo empiezan a afectar al bienestar cotidiano.',
    work: 'El trabajo combina escucha a la familia, comprensión de necesidades emocionales, coordinación prudente con el entorno educativo si procede y una mirada de apego para responder con más seguridad.',
    links: [
      { label: 'Cómo trabajo con familias', href: '/como-trabajo' },
      { label: 'Trauma y duelo infantil', href: '/psicologia-trauma-ciudad-real' },
      { label: 'Orientación educativa', href: '/areas-de-intervencion/orientacion-educativa-y-formacion' }
    ]
  }),
  adolescents: hubPage({
    key: 'adolescents',
    hub: 'adolescents',
    intro: 'La adolescencia necesita un espacio propio: ni infantilizar ni exigir madurez inmediata. Es una etapa de identidad, grupo, cuerpo, estudios, autonomía y vínculos intensos.',
    situations: 'Autoestima, ansiedad, relaciones sociales, identidad, orientación académica, trauma, duelo y regulación emocional pueden aparecer mezclados y cambiar de forma rápida según el momento vital.',
    work: 'El proceso busca escuchar al adolescente, cuidar la alianza terapéutica y, cuando ayuda, incluir a la familia para crear un marco más comprensible y seguro.',
    links: [
      { label: 'Cómo trabajo', href: '/como-trabajo' },
      { label: 'Trauma y duelo', href: '/psicologia-trauma-ciudad-real' },
      { label: 'Orientación académica', href: '/areas-de-intervencion/orientacion-educativa-y-formacion' }
    ]
  }),
  adults: hubPage({
    key: 'adults',
    hub: 'adults',
    intro: 'En la vida adulta muchas personas sostienen mucho durante demasiado tiempo. Ansiedad, estrés, duelo, trauma o dificultades vinculares pueden ser señales de que hace falta parar y comprender.',
    situations: 'Ansiedad, estrés, trauma, duelo, dependencia emocional, relaciones de pareja y crecimiento personal se abordan atendiendo a historia, cuerpo, emociones, límites y patrones relacionales.',
    work: 'El trabajo no busca respuestas prefabricadas. Se construye un proceso para entender qué ocurre, qué se repite y qué recursos pueden desarrollarse con más coherencia.',
    links: [
      { label: 'Trauma en adultos', href: '/psicologia-trauma-ciudad-real' },
      { label: 'Psicología en Ciudad Real', href: '/psicologia-ciudad-real' },
      { label: 'Contacto', href: '/contacto' }
    ]
  }),
  educationTraining: hubPage({
    key: 'educationTraining',
    hub: 'education-training',
    intro: 'La orientación educativa ayuda a leer lo que ocurre entre aprendizaje, emoción, familia y escuela. No se trata solo de rendimiento: también importan la vivencia del niño y el marco que lo acompaña.',
    situations: 'Dificultades de aprendizaje, altas capacidades, coordinación con centros educativos y asesoramiento familiar pueden requerir una mirada que una psicología, comunicación y contexto escolar.',
    work: 'El acompañamiento busca traducir necesidades, ordenar prioridades y favorecer respuestas coordinadas entre familia y centro cuando esa coordinación es útil.',
    links: [
      { label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' },
      { label: 'Talleres y formación', href: '/talleres' },
      { label: 'Contacto', href: '/contacto' }
    ]
  }),
  local: {
    page: contentPages.local,
    heroNote: 'Una página para elegir psicóloga en Ciudad Real con más criterio y menos ruido.',
    sections: [
      {
        eyebrow: 'Psicología en Ciudad Real',
        title: 'Buscar ayuda cerca también es buscar una forma de trabajar que encaje contigo.',
        body: [
          'Quien busca psicóloga en Ciudad Real suele necesitar algo más que una lista de servicios. Necesita entender cómo será el proceso, si la mirada profesional le resulta segura y si el lenguaje de la consulta encaja con lo que está viviendo.',
          'Priorizo una atención cercana, especialmente valiosa cuando el proceso se beneficia de continuidad presencial y de un vínculo terapéutico cuidado.'
        ],
        links: [
          { label: 'Conocer mi trayectoria', href: '/sobre-mi' },
          { label: 'Cómo trabajo', href: '/como-trabajo' }
        ]
      },
      {
        eyebrow: 'Cómo elegir',
        title: 'Qué mirar al elegir psicóloga en Ciudad Real.',
        body: [
          'Una buena elección no depende solo de la cercanía geográfica. También conviene fijarse en la claridad con la que se explica el método, el cuidado del encuadre, la prudencia al hablar de resultados y la capacidad de adaptar el trabajo a cada persona.',
          'Antes de iniciar un proceso, es razonable preguntar cómo se realiza la evaluación, qué papel tendrá la familia si se trata de infancia o adolescencia y cómo se cuida la privacidad de la consulta.'
        ],
        links: [{ label: 'Ver áreas de intervención', href: '/areas-de-intervencion' }]
      },
      {
        eyebrow: 'Áreas frecuentes',
        title: 'Infancia, adolescencia, adultos, orientación educativa, trauma y duelo.',
        body: [
          'La página local conecta con las áreas principales: infancia y familias, adolescentes, adultos y orientación educativa. También enlaza con una ruta específica sobre trauma y duelo, porque son motivos que requieren especial cuidado y una explicación propia.',
          'Si estás en Ciudad Real y no sabes por dónde empezar, puedes leer el área que más se acerca a tu situación y después enviar una consulta breve.'
        ],
        links: [
          { label: 'Trauma y duelo en Ciudad Real', href: '/psicologia-trauma-ciudad-real' },
          { label: 'Contacto', href: '/contacto?modalidad=in-person-ciudad-real' }
        ]
      },
      {
        eyebrow: 'Preguntas frecuentes',
        title: '¿Qué puedo contar en un primer contacto?',
        body: [
          'Para una primera orientación basta con explicar si consultas para ti, para tu hijo o hija, para una situación familiar, para una dificultad educativa o para un proceso de trauma o duelo. No necesitas escribir detalles íntimos ni resumir toda tu historia.',
          'También puedes indicar que buscas psicóloga en Ciudad Real y que quieres valorar si el enfoque de Hilando Fino Psicología encaja con lo que necesitas. La conversación inicial debe ayudarte a ordenar el siguiente paso, no a sentir presión.'
        ],
        links: [
          { label: 'Contacto', href: '/contacto?modalidad=in-person-ciudad-real' },
          { label: 'Privacidad', href: '/privacidad' }
        ]
      }
    ],
    cards: areaCards.slice(0, 5),
    related: [commonRelated[0], commonRelated[2], areaCards[0]]
  },
  traumaLocal: {
    page: contentPages.traumaLocal,
    heroNote: 'Trauma y duelo necesitan evaluación, ritmo y un acompañamiento especialmente respetuoso.',
    sections: [
      {
        eyebrow: 'Trauma',
        title: 'No todo dolor es trauma, y no todo trauma se trabaja de la misma manera.',
        body: [
          'El trauma puede aparecer tras experiencias puntuales, pérdidas, situaciones relacionales sostenidas o momentos en los que la persona sintió que no podía responder con seguridad. A veces se expresa como ansiedad, bloqueo, reactividad, desconexión, tensión corporal o dificultad para confiar.',
          'Por eso el primer paso no es aplicar una técnica, sino evaluar qué ocurre, qué recursos tiene la persona y qué ritmo puede sostener.'
        ],
        links: [{ label: 'Cómo trabajo', href: '/como-trabajo' }]
      },
      {
        eyebrow: 'Duelo',
        title: 'Acompañar una pérdida sin imponer tiempos ni frases hechas.',
        body: [
          'El duelo puede traer tristeza, rabia, alivio, culpa, confusión o momentos de aparente normalidad. No siempre necesita las mismas palabras ni el mismo tipo de intervención.',
          'Un proceso psicológico puede ayudar a hacer espacio a la pérdida, cuidar el vínculo con lo perdido y sostener la vida cotidiana mientras la persona encuentra su propio modo de atravesarlo.'
        ],
        links: [
          { label: 'Trauma en adultos', href: '/areas-de-intervencion/adultos/trauma' },
          { label: 'Duelo en adultos', href: '/areas-de-intervencion/adultos/duelo' },
          { label: 'Trauma en adolescentes', href: '/areas-de-intervencion/adolescentes/trauma-adolescente' }
        ]
      },
      {
        eyebrow: 'EMDR e integración',
        title: 'EMDR puede formar parte del proceso, pero siempre con valoración previa.',
        body: [
          'Dentro de mi forma de trabajo aparecen intervenciones con respaldo científico, entre ellas EMDR. En trauma y duelo, este tipo de herramientas puede considerarse dentro de un enfoque integrador, atendiendo a estabilidad, vínculo terapéutico, historia personal y necesidades actuales.',
          'La intervención se plantea con prudencia clínica: comprender, estabilizar cuando sea necesario y elegir el camino que mejor cuide a la persona.'
        ],
        links: [{ label: 'Psicología en Ciudad Real', href: '/psicologia-ciudad-real' }]
      },
      {
        eyebrow: 'Etapas vitales',
        title: 'Trauma y duelo en infancia, adolescencia y vida adulta.',
        body: [
          'En niños y adolescentes, el acompañamiento suele incluir a la familia y una mirada de apego para entender señales emocionales y de conducta. En adultos, puede abrir preguntas sobre historia, relaciones, límites y cuerpo.',
          'Cada etapa necesita un lenguaje distinto, pero todas comparten una condición: el proceso debe sentirse seguro.'
        ],
        links: [
          { label: 'Trauma y duelo infantil', href: '/areas-de-intervencion/infancia-y-familias/trauma-y-duelo-infantil' },
          { label: 'Duelo en adolescentes', href: '/areas-de-intervencion/adolescentes/duelo-adolescente' },
          { label: 'Contacto', href: '/contacto?motivo=trauma-duelo' }
        ]
      },
      {
        eyebrow: 'Preguntas frecuentes',
        title: '¿Tengo que hablar de todo desde el principio?',
        body: [
          'No. En trauma y duelo es especialmente importante que la persona no sienta que debe contarlo todo de golpe. Un primer contacto puede centrarse en qué te trae, qué necesitas cuidar ahora y qué límites quieres poner al relato.',
          'La evaluación permite decidir si conviene empezar por estabilización, por comprensión del contexto, por trabajo familiar o por una intervención más centrada en recuerdos, cuerpo y emociones. El proceso se construye con consentimiento, claridad y respeto por el ritmo.'
        ],
        links: [
          { label: 'Cómo trabajo', href: '/como-trabajo' },
          { label: 'Contacto', href: '/contacto?motivo=trauma-duelo' }
        ]
      }
    ],
    cards: [
      { title: 'Evaluación antes de intervenir', body: 'Comprender síntomas, contexto y recursos evita ir demasiado rápido.' },
      { title: 'Ritmo y seguridad', body: 'El proceso debe cuidar estabilidad, vínculo y capacidad de la persona para sostener el trabajo.' },
      { title: 'Infancia, adolescencia y adultos', body: 'El trauma y el duelo se expresan distinto según la etapa vital y el entorno relacional.' }
    ],
    related: [
      { title: 'Trauma y duelo infantil', body: 'Cómo acompaño pérdidas y experiencias difíciles cuando la familia necesita palabras y presencia segura.', href: '/areas-de-intervencion/infancia-y-familias/trauma-y-duelo-infantil' },
      { title: 'Trauma en adolescentes', body: 'Una ruta específica para adolescencia, seguridad, autonomía y familia.', href: '/areas-de-intervencion/adolescentes/trauma-adolescente' },
      { title: 'Trauma en adultos', body: 'Trabajo adulto con historia, cuerpo, vínculos y posible EMDR tras evaluación.', href: '/areas-de-intervencion/adultos/trauma' },
      commonRelated[2]
    ]
  },
  workshops: {
    page: contentPages.workshops,
    heroNote: 'Formación psicológica clara, práctica y respetuosa para contextos familiares y educativos.',
    sections: [
      {
        eyebrow: 'Talleres',
        title: 'Aprender a mirar mejor lo que ocurre en casa, en el aula o en la relación con uno mismo.',
        body: [
          'Concibo los talleres como espacios de formación comprensibles y útiles. La idea no es sustituir un proceso terapéutico, sino ofrecer lenguaje, criterios y herramientas para acompañar mejor situaciones cotidianas.',
          'Pueden orientarse a familias, adolescentes, personas adultas o contextos educativos, siempre desde una comunicación clara y sin convertir el malestar en etiquetas rígidas.'
        ],
        links: [
          { label: 'Orientación educativa', href: '/areas-de-intervencion/orientacion-educativa-y-formacion' },
          { label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' }
        ]
      },
      {
        eyebrow: 'Líneas posibles',
        title: 'Regulación emocional, apego, adolescencia, aprendizaje y autocuidado.',
        body: [
          'A partir de la taxonomía de la web, las líneas formativas pueden girar en torno a regulación emocional, acompañamiento familiar, dificultades escolares, altas capacidades, adolescencia, trauma y duelo, relaciones o cuidado adulto.',
          'Cada taller debe cuidar el lenguaje: formación no es diagnóstico, y orientación no es promesa de cambio inmediato.'
        ],
        links: [
          { label: 'Adolescentes', href: '/areas-de-intervencion/adolescentes' },
          { label: 'Adultos', href: '/areas-de-intervencion/adultos' }
        ]
      },
      {
        eyebrow: 'Siguiente paso',
        title: 'Si quieres proponer una formación, empieza por el contexto.',
        body: [
          'Para valorar una formación tiene sentido explicar a quién va dirigida, qué situación se quiere trabajar y qué formato sería más útil para ese grupo.',
          'No se anuncian fechas, precios ni entidades concretas porque esos datos deben responder a cada propuesta real.'
        ],
        links: [{ label: 'Contactar sobre talleres', href: '/contacto?motivo=talleres' }]
      }
    ],
    related: [areaCards[3], commonRelated[0], commonRelated[2]]
  }
};

function hubPage(input: {
  key: 'childrenFamilies' | 'adolescents' | 'adults' | 'educationTraining';
  hub: HubKey;
  intro: string;
  situations: string;
  work: string;
  links: { label: string; href: string }[];
}): PageContent {
  const page = contentPages[input.key];
  return {
    page,
    heroNote: `${hubLabels[input.hub]} desde una mirada clínica clara, cercana y no reduccionista.`,
    sections: [
      {
        eyebrow: hubLabels[input.hub],
        title: 'Qué puede estar pasando.',
        body: [input.intro, input.situations],
        links: input.links
      },
      {
        eyebrow: 'Cómo se trabaja',
        title: 'Comprender la situación antes de elegir herramientas.',
        body: [input.work, 'Dentro de este hub encontrarás páginas específicas para cada tema, porque ansiedad, duelo, sueño, escuela o vínculos necesitan matices propios. Si un tema te resuena, no necesitas saber nombrarlo perfectamente para pedir orientación.'],
        links: [
          { label: 'Cómo trabajo', href: '/como-trabajo' },
          { label: 'Contacto', href: '/contacto' }
        ]
      },
      {
        eyebrow: 'Preguntas frecuentes',
        title: '¿Tengo que saber exactamente qué me ocurre para consultar?',
        body: [
          'No. Muchas personas llegan con una sensación mezclada: preocupación, bloqueo, conflicto, cansancio o dudas sobre cómo acompañar a alguien cercano. La primera función del proceso es ordenar esa demanda.',
          'Tampoco hace falta convertir una dificultad en diagnóstico para poder hablar de ella. Basta con explicar qué ocurre, desde cuándo preocupa y qué impacto tiene en la vida diaria.'
        ],
        links: [{ label: 'Psicología en Ciudad Real', href: '/psicologia-ciudad-real' }]
      }
    ],
    cards: topicCards(input.hub),
    related: [commonRelated[0], commonRelated[1], commonRelated[2]]
  };
}
