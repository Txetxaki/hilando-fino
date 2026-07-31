import { contentPages } from '../content/content-matrix';
import { hubLabels } from '../content/hub-labels';
import { treatmentsForSector } from '../content/treatment-index';
import type { StandardPageKey } from '../content/public-routes';
import { HubKey, PageBlock, PageCard, PageContent, SiteImageKey } from '../content/types';

function topicCards(hub: HubKey): PageCard[] {
  if (hub === 'workshops') return [];
  return treatmentsForSector(hub).map((topic) => ({ title: topic.h1, body: topic.summary, href: topic.canonicalPath }));
}

const areaCards: PageCard[] = [
  { title: hubLabels['children-families'], body: 'Acompaño a niños y familias a comprender el origen de sus dificultades a través del juego, la autorregulación y el vínculo afectivo.', href: '/areas-de-intervencion/infancia-y-familias' },
  { title: hubLabels.adolescents, body: 'Autorregulación corporal, autoestima y relaciones con el entorno, mientras la familia reaprende las dinámicas de esta nueva etapa.', href: '/areas-de-intervencion/adolescentes' },
  { title: hubLabels.adults, body: 'Acompañamiento individual para recuperar la calma, la claridad y el equilibrio cuando se sostiene mucho durante demasiado tiempo.', href: '/areas-de-intervencion/adultos' },
  { title: hubLabels.perinatal, body: 'Cuidado para la fertilidad, el embarazo, el posparto, el vínculo con el bebé y el duelo perinatal.', href: '/areas-de-intervencion/psicologia-perinatal' },
  { title: hubLabels['education-training'], body: 'Orientación a familias y centros educativos ante aprendizaje, altas capacidades, coordinación escolar y asesoramiento familiar.', href: '/areas-de-intervencion/orientacion-educativa-y-formacion' },
  { title: 'Trauma y duelo en Ciudad Real', body: 'Una página específica para entender cómo acompaño el trauma y el duelo desde la evaluación, el ritmo y el cuidado clínico.', href: '/psicologia-trauma-ciudad-real' },
  { title: hubLabels.workshops, body: 'Formación para centros educativos, familias y profesionales sobre desarrollo emocional, trauma y relaciones humanas.', href: '/talleres' }
];

const commonRelated: PageCard[] = [
  { title: 'Cómo trabajo', body: 'La evaluación cuidadosa, la mirada integradora y el lugar que ocupan EMDR, Gestalt, Bioenergética o el Círculo de Seguridad Parental.', href: '/como-trabajo' },
  { title: 'Psicología en Ciudad Real', body: 'Una página para situar la atención psicológica en el contexto local y elegir con más criterio.', href: '/psicologia-ciudad-real' },
  { title: 'Contacto', body: 'Si quieres orientar tu consulta, empieza por un mensaje breve y práctico.', href: '/contacto' }
];

const evaluationSection = {
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
};

export const pageContents: Record<StandardPageKey, PageContent> = {
  home: {
    page: contentPages.home,
    heroNote: 'Psicología en Ciudad Real para personas y familias.',
    heroImage: 'consultingRoom',
    sections: [
      {
        eyebrow: 'Tirando del hilo',
        title: 'Un lugar para desenredar lo que ahora pesa.',
        body: [
          'Me llamo Marta Martín. Acompaño a personas y familias a comprender el origen de su malestar y a desarrollar nuevas formas de afrontarlo, integrando una atención cercana y respetuosa con intervenciones adaptadas a cada persona.',
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
        title: 'Psicología cercana en Ciudad Real.',
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
          'Infancia y familias, adolescencia, adultos, psicología perinatal, orientación educativa y talleres se organizan como puertas de entrada amplias. Dentro de cada área encontrarás situaciones frecuentes descritas sin diagnosticar ni prometer resultados.',
          'La intención es que puedas reconocer un tema, leerlo con cuidado y decidir si merece la pena pedir una primera consulta.'
        ],
        links: [
          { label: 'Ver áreas de intervención', href: '/areas-de-intervencion' },
          { label: 'Ver talleres y formación', href: '/talleres' },
          { label: 'Ir a contacto', href: '/contacto' }
        ]
      }
    ],
    blocks: [{ kind: 'quote', text: 'Trabajo desde una mirada integradora, humana y profunda, que une el conocimiento clínico con el respeto por la historia, el cuerpo y el ritmo de cada persona.' }],
    cards: areaCards.slice(0, 4),
    related: [areaCards[4], areaCards[5], commonRelated[2]]
  },
  about: {
    page: contentPages.about,
    heroNote: 'Siempre me ha interesado comprender a las personas.',
    heroImage: 'martaDesk',
    sections: [
      {
        eyebrow: 'Mi trayectoria',
        title: 'Del cuerpo y el movimiento a la psicología clínica.',
        body: [
          'Antes de dedicarme a la psicología recorrí un camino ligado al arte, el movimiento y la expresión corporal. Aquella experiencia me enseñó que las emociones no solo se cuentan con palabras, sino también a través del cuerpo, las relaciones y la forma en que vivimos nuestras experiencias.',
          'Con el tiempo decidí orientar ese interés hacia la psicología clínica, formándome como Psicóloga General Sanitaria y ampliando mi formación en diferentes modelos terapéuticos para ofrecer una atención rigurosa y adaptada a cada persona.',
          'Actualmente trabajo con niños, adolescentes, adultos y familias, acompañando procesos relacionados con la ansiedad, el trauma, el duelo, las dificultades emocionales y las relaciones familiares.'
        ],
        links: [{ label: 'Ver cómo trabajo', href: '/como-trabajo' }]
      },
      {
        eyebrow: 'Mirada clínica',
        title: 'Persona, emoción, cuerpo y relaciones.',
        body: [
          'Trabajo desde una mirada humanista y centrada en la persona. Esto implica escuchar la experiencia subjetiva, pero también observar cómo influyen el cuerpo, las emociones, los vínculos y el entorno.',
          'Con las familias, esa mirada se abre al apego y a la comprensión de las necesidades emocionales de niños y adolescentes, con referencias como el Círculo de Seguridad Parental.'
        ],
        links: [
          { label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' },
          { label: 'Psicología perinatal', href: '/areas-de-intervencion/psicologia-perinatal' }
        ]
      },
      {
        eyebrow: 'Ciudad Real',
        title: 'Una consulta pensada para acompañar de cerca.',
        body: [
          'Acompaño a personas y familias que buscan atención psicológica en Ciudad Real y valoran un lenguaje claro, una relación terapéutica cuidada y un proceso construido paso a paso.',
          'Si estás comparando opciones, puede ayudarte leer también la página local y la explicación sobre trauma y duelo.'
        ],
        links: [
          { label: 'Psicología en Ciudad Real', href: '/psicologia-ciudad-real' },
          { label: 'Trauma y duelo', href: '/psicologia-trauma-ciudad-real' },
          { label: 'Ver áreas de intervención', href: '/areas-de-intervencion' }
        ]
      }
    ],
    blocks: [
      { kind: 'credentials', eyebrow: 'Formación', title: 'Mi formación', intro: 'Una base académica sanitaria y educativa, con especialización clínica y formación continuada en distintos modelos psicoterapéuticos.' },
      { kind: 'figure', imageKey: 'consultingRoom', caption: 'El espacio de consulta en Ciudad Real.' }
    ],
    related: commonRelated
  },
  method: {
    page: contentPages.method,
    heroNote: 'Creo en una psicología integradora.',
    heroImage: 'martaWorking',
    sections: [
      evaluationSection,
      {
        eyebrow: 'Integración',
        title: 'No una técnica para todo, sino un proceso ajustado a cada persona.',
        body: [
          'Cada persona tiene una historia única y merece una intervención adaptada a sus necesidades. Por eso comienzo siempre realizando una evaluación cuidadosa para comprender no solo los síntomas, sino también aquello que los mantiene.',
          'Trabajo desde un enfoque integrador que combina intervenciones con respaldo científico, como EMDR y otros modelos de eficacia demostrada, con una mirada humanista centrada en la persona, sus emociones, sus relaciones y sus recursos.'
        ],
        links: [{ label: 'Psicología para trauma y duelo', href: '/psicologia-trauma-ciudad-real' }]
      },
      {
        eyebrow: 'Cuerpo y emoción',
        title: 'Lo que sentimos también se expresa en el cuerpo y en los vínculos.',
        body: [
          'Mi formación en Terapia Gestalt y Bioenergética enriquece esta manera de entender la terapia, ayudándome a prestar atención tanto a la experiencia emocional como al papel del cuerpo y de las relaciones en el bienestar psicológico.',
          'Muchas veces el malestar no aparece solo como pensamiento: también se manifiesta como tensión, bloqueo, impulsividad, cansancio o dificultad para poner límites. Trabajar con esa complejidad exige un ritmo prudente y una relación terapéutica segura.'
        ],
        links: [{ label: 'Adultos', href: '/areas-de-intervencion/adultos' }]
      },
      {
        eyebrow: 'Familias y apego',
        title: 'Comprender las necesidades emocionales detrás de la conducta.',
        body: [
          'Con las familias trabajo desde modelos basados en el apego, entre ellos el Círculo de Seguridad Parental, favoreciendo una comprensión más profunda de las necesidades emocionales de niños y adolescentes y fortaleciendo el vínculo entre padres e hijos.',
          'El objetivo es que los adultos puedan responder con más claridad, presencia y límites, sin culpabilizar ni perder de vista el contexto.'
        ],
        links: [
          { label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' },
          { label: 'Adolescentes', href: '/areas-de-intervencion/adolescentes' }
        ]
      }
    ],
    blocks: [
      { kind: 'quote', text: 'Mi objetivo no es aplicar una técnica concreta, sino encontrar la forma de acompañar mejor a cada persona.' },
      { kind: 'models', eyebrow: 'Modelos', title: 'Los enfoques con los que trabajo', intro: 'Ninguno se aplica por defecto: entran en el proceso cuando la evaluación indica que pueden ayudar.' },
      { kind: 'resources', eyebrow: 'Recursos', title: 'Herramientas dentro de la sesión', intro: 'Recursos que abren la expresión cuando las palabras no alcanzan, especialmente con niños, adolescentes y familias.' }
    ],
    cards: [
      { title: 'Evaluación cuidadosa', body: 'Antes de decidir el camino escucho, ordeno la demanda y comprendo el contexto.' },
      { title: 'Herramientas con criterio', body: 'EMDR y el resto de recursos se valoran dentro de un proceso, no como recetas universales.' },
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
        title: 'Cinco áreas principales y una línea formativa.',
        body: [
          'Encuentra el punto de entrada que más se parece a lo que necesitas. Infancia y familias, adolescencia, adultos, psicología perinatal, orientación educativa y talleres se organizan como puertas de entrada amplias.',
          'Dentro de cada área encontrarás situaciones frecuentes descritas sin diagnosticar ni prometer resultados. La intención es que puedas reconocer un tema, leerlo con cuidado y decidir si merece la pena pedir una primera consulta.'
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
          'Trauma y duelo aparecen en infancia, adolescencia, etapa perinatal y vida adulta. Por eso cuentan también con una página propia orientada a Ciudad Real, conectada con cada área y con mi forma de trabajar.',
          'La prioridad es explicar con prudencia: evaluar antes, respetar el ritmo y evitar promesas sobre resultados.'
        ],
        links: [
          { label: 'Leer trauma y duelo en Ciudad Real', href: '/psicologia-trauma-ciudad-real' },
          { label: 'Talleres y formación', href: '/talleres' }
        ]
      }
    ],
    cards: areaCards,
    related: commonRelated
  },
  childrenFamilies: hubPage({
    key: 'childrenFamilies',
    hub: 'children-families',
    heroNote: 'Juego, autorregulación y vínculo para recuperar la calma en casa.',
    intro:
      'La infancia se expresa, siente y sana a través de la vivencia corporal, porque el cuerpo del niño expresa lo que aún no puede nombrar. Acompaño a niños y familias a comprender el origen de sus dificultades a través del juego, la autorregulación y el fortalecimiento del vínculo afectivo: un espacio de escucha libre de juicios para recuperar el equilibrio y la calma en el hogar.',
    situations:
      'Acompañar a un niño implica mirar también a la familia, la escuela, las rutinas y los vínculos. Puede tener sentido pedir orientación cuando la ansiedad, los miedos, los conflictos de conducta, la autoestima, el sueño, el control de esfínteres, una separación familiar, el trauma o el duelo empiezan a afectar al bienestar cotidiano.',
    work: 'El trabajo combina escucha a la familia, comprensión de las necesidades emocionales, coordinación prudente con el entorno educativo si procede y una mirada de apego para responder con más seguridad.',
    links: [
      { label: 'Cómo trabajo con familias', href: '/como-trabajo' },
      { label: 'Trauma y duelo infantil', href: '/psicologia-trauma-ciudad-real' },
      { label: 'Orientación educativa', href: '/areas-de-intervencion/orientacion-educativa-y-formacion' }
    ],
    blocks: [
      {
        kind: 'highlight',
        eyebrow: 'Herramientas',
        title: 'Círculo de Seguridad Parental (COSP)',
        body: [
          '¿A veces sientes que no entiendes qué necesita tu hijo o tu hija detrás de su comportamiento?',
          'A través del Círculo de Seguridad Parental trabajamos para cambiar la forma en que miras la conducta infantil. Aprendemos a leer las necesidades reales del niño, tanto cuando busca explorar como cuando necesita cobijo, a autorregularnos como adultos frente a sus desbordamientos y a consolidar un apego seguro que le acompañe toda la vida.'
        ],
        links: [{ label: 'Ver todos los modelos', href: '/como-trabajo' }]
      },
      { kind: 'figure', imageKey: 'sandtray', caption: 'La caja de arena permite representar lo que todavía no encuentra palabras.' }
    ]
  }),
  adolescents: hubPage({
    key: 'adolescents',
    hub: 'adolescents',
    heroNote: 'Autorregulación, autoestima y vínculos en una etapa de transformación.',
    intro:
      'La adolescencia es una etapa de transformación física, emocional y social. Acompaño a los adolescentes a transitar este periodo trabajando la autorregulación corporal, la autoestima y las relaciones con su entorno. En paralelo, invito a las familias a reaprender sobre las dinámicas familiares para adaptarse a esta nueva etapa con serenidad y confianza.',
    situations: 'Autoestima, ansiedad, relaciones sociales, identidad, orientación académica, trauma, duelo y regulación emocional pueden aparecer mezclados y cambiar de forma rápida según el momento vital.',
    work: 'El proceso busca escuchar al adolescente, cuidar la alianza terapéutica y, cuando ayuda, incluir a la familia para crear un marco más comprensible y seguro.',
    links: [
      { label: 'Cómo trabajo', href: '/como-trabajo' },
      { label: 'Trauma y duelo', href: '/psicologia-trauma-ciudad-real' },
      { label: 'Orientación académica', href: '/areas-de-intervencion/orientacion-educativa-y-formacion' }
    ],
    blocks: [{ kind: 'figure', imageKey: 'projectiveFigures', caption: 'Las figuras proyectivas ayudan a observar las dinámicas familiares desde fuera.' }]
  }),
  adults: hubPage({
    key: 'adults',
    hub: 'adults',
    heroNote: 'Acompañamiento individual para recuperar la calma, la claridad y el equilibrio.',
    intro: 'En la vida adulta muchas personas sostienen mucho durante demasiado tiempo. Ansiedad, estrés, duelo, trauma o dificultades vinculares pueden ser señales de que hace falta parar y comprender.',
    situations: 'Ansiedad, estrés, trauma, duelo, dependencia emocional, relaciones de pareja y crecimiento personal se abordan atendiendo a historia, cuerpo, emociones, límites y patrones relacionales.',
    work: 'El trabajo no busca respuestas prefabricadas. Construimos un proceso para entender qué ocurre, qué se repite y qué recursos pueden desarrollarse con más coherencia.',
    links: [
      { label: 'Trauma en adultos', href: '/psicologia-trauma-ciudad-real' },
      { label: 'Psicología perinatal', href: '/areas-de-intervencion/psicologia-perinatal' },
      { label: 'Contacto', href: '/contacto' }
    ],
    blocks: [
      {
        kind: 'checklist',
        eyebrow: 'Motivos de consulta',
        title: 'Con qué llega la mayoría de las personas adultas',
        items: [
          'Gestión de la ansiedad y el estrés: sobrecarga constante, angustia, responsabilidad sostenida, pensamientos en bucle o síntomas físicos como tensión, insomnio o presión en el pecho.',
          'Estado de ánimo y bajo nivel de energía: sensación de vacío, tristeza profunda, apatía o pérdida de motivación en el día a día.',
          'Dificultades relacionales y de pareja: conflictos repetitivos, problemas para poner límites, dependencia emocional o momentos de crisis e incertidumbre en la relación.',
          'Autoestima, identidad y patrones que se repiten: autoexigencia elevada, miedo al rechazo o la sensación de estar bloqueado en las mismas dinámicas vitales.',
          'Trauma y duelo: la huella que las pérdidas y las experiencias difíciles dejan en el cuerpo, para recuperar la seguridad y la regulación emocional.'
        ]
      }
    ]
  }),
  perinatal: hubPage({
    key: 'perinatal',
    hub: 'perinatal',
    heroNote: 'Sostener a quien sostiene: cuidado para la maternidad y la primera crianza.',
    intro:
      'Apoyo y cuidado en las etapas de concepción, embarazo y posparto. Te acompaño a atender los profundos cambios emocionales y corporales de este proceso, favoreciendo la adaptación a la maternidad o la paternidad y el fortalecimiento de un apego seguro con tu bebé desde sus primeros días.',
    situations:
      'Ofrezco también un lugar cálido y respetuoso para procesar vivencias difíciles, como experiencias complejas en el parto o duelos perinatales, transitando esta etapa con mayor calma y seguridad. Fertilidad, gestación, posparto, vínculo temprano, identidad y pérdida pueden aparecer solos o entrelazados.',
    work: 'El acompañamiento combina escucha, trabajo corporal para bajar la activación, mirada de apego y respeto absoluto por el ritmo de cada mujer y de cada familia.',
    links: [
      { label: 'Cómo trabajo', href: '/como-trabajo' },
      { label: 'Adultos', href: '/areas-de-intervencion/adultos' },
      { label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' }
    ],
    blocks: [
      {
        kind: 'highlight',
        eyebrow: 'Un apunte importante',
        title: 'También acompaño la maternidad que no llega.',
        body: [
          'La psicología perinatal se asocia casi siempre al embarazo y al bebé que nace. Pero esta etapa incluye también la fertilidad que se alarga, la pérdida gestacional y la decisión o la circunstancia de no ser madre.',
          'Ninguna de esas historias es una versión incompleta de otra. Todas tienen sitio aquí.'
        ],
        links: [{ label: 'Duelo perinatal', href: '/areas-de-intervencion/psicologia-perinatal/duelo-perinatal' }]
      }
    ]
  }),
  educationTraining: hubPage({
    key: 'educationTraining',
    hub: 'education-training',
    heroNote: 'Leer lo que ocurre entre aprendizaje, emoción, familia y escuela.',
    intro: 'La orientación educativa ayuda a leer lo que ocurre entre aprendizaje, emoción, familia y escuela. No se trata solo de rendimiento: también importan la vivencia del niño y el marco que lo acompaña.',
    situations: 'Dificultades de aprendizaje, altas capacidades, coordinación con centros educativos y asesoramiento familiar pueden requerir una mirada que una psicología, comunicación y contexto escolar.',
    work: 'El acompañamiento busca traducir necesidades, ordenar prioridades y favorecer respuestas coordinadas entre familia y centro cuando esa coordinación es útil.',
    links: [
      { label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' },
      { label: 'Talleres y formación', href: '/talleres' },
      { label: 'Contacto', href: '/contacto' }
    ],
    blocks: [
      {
        kind: 'checklist',
        eyebrow: 'Cuándo consultar',
        title: '¿Cuándo consultar con una orientadora educativa?',
        items: [
          'Notas un bajón repentino en el rendimiento académico de tu hijo o de tu hija.',
          'El colegio os sugiere realizar una valoración externa.',
          'Hay dudas sobre si sus dificultades son emocionales o de aprendizaje.',
          'Sentís que el colegio no termina de ajustar las medidas que vuestro hijo o vuestra hija necesita.'
        ]
      },
      {
        kind: 'highlight',
        eyebrow: 'Asesoramiento familiar',
        title: 'Cuando la necesidad es entender qué está pasando en casa.',
        body: [
          'Os acompaño como familia cuando la necesidad es comprender qué está pasando en casa y cómo responder con más claridad. No se trata de ser padres y madres perfectos, sino de encontrar las respuestas más ajustadas y sostenibles.',
          'El proceso puede incluir sesiones con adultos, momentos familiares, revisión de rutinas, lenguaje emocional y coordinación educativa si forma parte de la demanda.'
        ],
        links: [{ label: 'Asesoramiento familiar', href: '/areas-de-intervencion/orientacion-educativa-y-formacion/asesoramiento-familiar' }]
      }
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
          'Atiendo en la Calle Ramón y Cajal 2, en Ciudad Real, y priorizo una atención cercana, especialmente valiosa cuando el proceso se beneficia de continuidad presencial y de un vínculo terapéutico cuidado.'
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
          'Antes de iniciar un proceso, es razonable preguntar cómo se realiza la evaluación, qué papel tendrá la familia si se trata de infancia o adolescencia y cómo se cuida la privacidad de la consulta. También puedes comprobar el número de colegiada y el registro sanitario del centro.'
        ],
        links: [{ label: 'Ver áreas de intervención', href: '/areas-de-intervencion' }]
      },
      {
        eyebrow: 'Áreas frecuentes',
        title: 'Infancia, adolescencia, adultos, perinatal, orientación educativa, trauma y duelo.',
        body: [
          'La página local conecta con las áreas principales: infancia y familias, adolescentes, adultos, psicología perinatal y orientación educativa. También enlaza con una ruta específica sobre trauma y duelo, porque son motivos que requieren especial cuidado y una explicación propia.',
          'Si estás en Ciudad Real y no sabes por dónde empezar, puedes leer el área que más se acerca a tu situación y después enviar una consulta breve.'
        ],
        links: [
          { label: 'Trauma y duelo en Ciudad Real', href: '/psicologia-trauma-ciudad-real' },
          { label: 'Psicología perinatal', href: '/areas-de-intervencion/psicologia-perinatal' },
          { label: 'Contacto', href: '/contacto?modalidad=in-person-ciudad-real' }
        ]
      },
      {
        eyebrow: 'Preguntas frecuentes',
        title: '¿Qué puedo contar en un primer contacto?',
        body: [
          'Para una primera orientación basta con explicar si consultas para ti, para tu hijo o hija, para una situación familiar, para una dificultad educativa o para un proceso de trauma o duelo. No necesitas escribir detalles íntimos ni resumir toda tu historia.',
          'También puedes indicar que buscas psicóloga en Ciudad Real y que quieres valorar si mi enfoque encaja con lo que necesitas. La conversación inicial debe ayudarte a ordenar el siguiente paso, no a sentir presión.'
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
          { label: 'Duelo perinatal', href: '/areas-de-intervencion/psicologia-perinatal/duelo-perinatal' }
        ]
      },
      {
        eyebrow: 'EMDR e integración',
        title: 'EMDR puede formar parte del proceso, pero siempre con valoración previa.',
        body: [
          'EMDR es un abordaje terapéutico que utiliza la estimulación bilateral (movimientos oculares, tapping o sonidos) para ayudar al cerebro a procesar y desbloquear recuerdos o experiencias difíciles que siguen generando malestar en el presente. Guías clínicas internacionales como la OMS, NICE o ISTSS lo recomiendan como tratamiento de primera elección para el trauma.',
          'En trauma y duelo, este tipo de herramientas puede considerarse dentro de un enfoque integrador, atendiendo a estabilidad, vínculo terapéutico, historia personal y necesidades actuales. La intervención se plantea con prudencia clínica: comprender, estabilizar cuando sea necesario y elegir el camino que mejor cuide a la persona.'
        ],
        links: [{ label: 'Psicología en Ciudad Real', href: '/psicologia-ciudad-real' }]
      },
      {
        eyebrow: 'Etapas vitales',
        title: 'Trauma y duelo en infancia, adolescencia, etapa perinatal y vida adulta.',
        body: [
          'En niños y adolescentes, el acompañamiento suele incluir a la familia y una mirada de apego para entender señales emocionales y de conducta. En adultos, puede abrir preguntas sobre historia, relaciones, límites y cuerpo. En la etapa perinatal, la pérdida gestacional o un parto difícil necesitan un cuidado propio.',
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
      { title: 'Todas las etapas vitales', body: 'El trauma y el duelo se expresan distinto según la etapa vital y el entorno relacional.' }
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
    heroNote: 'Aprendizaje y divulgación para centros educativos, familias y profesionales.',
    sections: [
      {
        eyebrow: 'Formación y talleres',
        title: 'Espacios de aprendizaje sobre desarrollo emocional, trauma y relaciones humanas.',
        body: [
          'Diseño espacios de aprendizaje dirigidos a centros educativos, familias y profesionales para comprender mejor el desarrollo emocional, el trauma y las relaciones humanas desde una perspectiva práctica y basada en la evidencia.',
          'La idea no es sustituir un proceso terapéutico, sino ofrecer lenguaje, criterios y herramientas para acompañar mejor situaciones cotidianas, sin convertir el malestar en etiquetas rígidas.'
        ],
        links: [
          { label: 'Orientación educativa', href: '/areas-de-intervencion/orientacion-educativa-y-formacion' },
          { label: 'Infancia y familias', href: '/areas-de-intervencion/infancia-y-familias' }
        ]
      },
      {
        eyebrow: 'Siguiente paso',
        title: 'Si quieres proponer una formación, empieza por el contexto.',
        body: [
          'Para valorar una formación tiene sentido explicar a quién va dirigida, qué situación se quiere trabajar y qué formato sería más útil para ese grupo.',
          'Cada taller se ajusta al grupo que lo recibe, así que las condiciones concretas se acuerdan sobre cada propuesta real.'
        ],
        links: [
          { label: 'Consultar disponibilidad de talleres', href: '/contacto?motivo=talleres' },
          { label: 'Adolescentes', href: '/areas-de-intervencion/adolescentes' }
        ]
      }
    ],
    blocks: [{ kind: 'workshops', eyebrow: 'Líneas de trabajo', title: 'Tres líneas de formación' }],
    related: [areaCards[4], commonRelated[0], commonRelated[2]]
  }
};

function hubPage(input: {
  key: 'childrenFamilies' | 'adolescents' | 'adults' | 'perinatal' | 'educationTraining';
  hub: HubKey;
  heroNote: string;
  intro: string;
  situations: string;
  work: string;
  links: { label: string; href: string }[];
  blocks?: PageBlock[];
}): PageContent {
  const page = contentPages[input.key];
  return {
    page,
    heroNote: input.heroNote,
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
        body: [input.work, 'Dentro de esta área encontrarás páginas específicas para cada tema, porque cada motivo necesita matices propios. Si un tema te resuena, no necesitas saber nombrarlo perfectamente para pedir orientación.'],
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
    blocks: input.blocks,
    cards: topicCards(input.hub),
    related: [commonRelated[0], commonRelated[1], commonRelated[2]]
  };
}

export type { SiteImageKey };
