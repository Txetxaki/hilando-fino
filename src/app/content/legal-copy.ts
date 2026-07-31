import { practiceIdentity } from './practice-identity';

export interface LegalSection {
  heading?: string;
  body: string[];
  items?: string[];
}

const identityLines = [
  `Titular: ${practiceIdentity.practitionerName} (${practiceIdentity.brandName}).`,
  `${practiceIdentity.professionalTitle}, colegiada nº ${practiceIdentity.collegiateNumber}.`,
  `Nº de Registro Sanitario: ${practiceIdentity.healthRegistryNumber}.`,
  `Domicilio profesional: ${practiceIdentity.address.streetAddress}, ${practiceIdentity.address.addressLocality}.`,
  `Teléfono: ${practiceIdentity.phone}.`,
  `Correo electrónico: ${practiceIdentity.email}.`
];

/**
 * Adapted from the template Marta supplied, with her real identity in place of the
 * `xxxxxx` markers. Two obligations still need data only she can give before this
 * page goes live: the fiscal identifier (NIF) required by the LSSI-CE and the
 * identity of the hosting provider. They are absent rather than invented.
 */
export const legalCopy: Record<'legalNotice' | 'privacy' | 'cookies', LegalSection[]> = {
  legalNotice: [
    {
      body: [
        'En este espacio encontrarás la información relativa a los términos y condiciones legales que definen la relación entre las personas usuarias y esta web. Conviene que los conozcas antes de continuar tu navegación.',
        'Esta web cumple con el Reglamento (UE) 2016/679 General de Protección de Datos y con la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE).'
      ]
    },
    {
      heading: 'Datos identificativos',
      body: ['Los datos de la responsable de esta web y de la consulta son los siguientes:'],
      items: identityLines
    },
    {
      heading: 'Condiciones generales de uso',
      body: [
        'Las presentes condiciones regulan el uso, incluido el mero acceso, de las páginas que integran este sitio web, así como de los contenidos puestos a disposición en ellas. Toda persona que acceda a la web acepta someterse a las condiciones vigentes en cada momento.',
        'El acceso a esta web no supone en modo alguno el inicio de una relación asistencial ni comercial. La persona usuaria se compromete a utilizar el sitio, sus servicios y contenidos sin contravenir la legislación vigente, la buena fe y el orden público.'
      ]
    },
    {
      heading: 'Alcance de los contenidos',
      body: [
        'Los textos publicados tienen finalidad informativa y divulgativa. No constituyen un diagnóstico, ni un tratamiento, ni sustituyen una valoración psicológica o médica individual.',
        'Si necesitas orientación sobre una situación concreta, utiliza la página de contacto o el teléfono de la consulta, y evita compartir datos de salud innecesarios en un primer mensaje.',
        'Si te encuentras ante una urgencia con riesgo para tu vida o la de otra persona, llama al 112 o al 024, o acude al servicio de urgencias más cercano.'
      ]
    },
    {
      heading: 'Propiedad intelectual e industrial',
      body: [
        'En virtud de lo dispuesto en los artículos 8 y 32.1 de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, distribución y comunicación pública, total o parcial, de los contenidos de esta web con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin autorización de la titular.',
        'La totalidad del sitio, incluidos textos, fotografías, material gráfico, estructura y presentación de los contenidos, está protegida por la normativa de propiedad intelectual e industrial aplicable en España.'
      ]
    },
    {
      heading: 'Exclusión de garantías y responsabilidad',
      body: ['La titular no se hace responsable, en ningún caso, de los daños y perjuicios que pudieran derivarse de:'],
      items: [
        'La falta de disponibilidad, mantenimiento o funcionamiento efectivo de la web, de sus servicios o de sus contenidos.',
        'La existencia de programas maliciosos o lesivos introducidos por terceros en los contenidos.',
        'El uso ilícito, negligente, fraudulento o contrario a este aviso legal.',
        'La licitud, calidad, fiabilidad, utilidad y disponibilidad de servicios prestados por terceros y enlazados desde este sitio.'
      ]
    },
    {
      heading: 'Enlaces externos',
      body: [
        'Esta web puede proporcionar enlaces a otros sitios y contenidos que son propiedad de terceros. Su único objeto es facilitar el acceso a esa información, sin que ello implique responsabilidad alguna sobre los resultados derivados de dicho acceso.',
        'Para establecer un enlace desde otro sitio hacia esta web es necesaria la autorización previa y por escrito de la titular. Un enlace no implica relación, aprobación ni respaldo de los contenidos del sitio enlazante.'
      ]
    },
    {
      heading: 'Reclamaciones y resolución de conflictos',
      body: [
        `Existen hojas de reclamación a disposición de las personas usuarias. Puedes solicitarlas en la consulta o remitir tu reclamación a ${practiceIdentity.email}, indicando tu nombre y apellidos, el servicio recibido, la fecha y los motivos de la reclamación.`,
        'También puedes utilizar la plataforma de resolución de litigios en línea de la Comisión Europea, disponible en https://ec.europa.eu/consumers/odr/.'
      ]
    },
    {
      heading: 'Ley aplicable y jurisdicción',
      body: ['Las relaciones entre la titular y las personas usuarias de esta web se someten a la legislación y jurisdicción españolas y a los tribunales que resulten competentes.']
    }
  ],
  privacy: [
    {
      body: [
        `Responsable del tratamiento: ${practiceIdentity.practitionerName} (${practiceIdentity.brandName}), con domicilio profesional en ${practiceIdentity.address.streetAddress}, ${practiceIdentity.address.addressLocality}, y correo electrónico ${practiceIdentity.email}.`,
        'La privacidad se cuida desde el diseño de esta web: el formulario solicita únicamente los datos básicos necesarios para poder responderte y no necesita que cuentes tu historia clínica.'
      ]
    },
    {
      heading: 'Finalidades — ¿con qué finalidades tratamos tus datos?',
      body: ['En cumplimiento del Reglamento (UE) 2016/679, te informamos de que los datos que nos facilitas se tratarán para:'],
      items: [
        'Atender tu solicitud de información o de cita y mantener el contacto necesario para ello.',
        'Gestionar la prestación del servicio psicológico contratado y su facturación.',
        'Dar cumplimiento a las obligaciones legales aplicables a la actividad sanitaria.'
      ]
    },
    {
      heading: 'Categorías de datos — ¿qué datos tratamos?',
      body: ['Derivadas de las finalidades anteriores, se gestionan las siguientes categorías de datos:'],
      items: [
        'Datos identificativos y de contacto (nombre, teléfono, correo electrónico).',
        'Metadatos de las comunicaciones electrónicas que mantengamos.',
        'Los datos de salud que resulten estrictamente necesarios cuando se inicie una relación asistencial, con la protección reforzada que la normativa exige.'
      ]
    },
    {
      heading: 'Qué no conviene enviar en un primer mensaje',
      body: [
        'No incluyas diagnósticos, informes, detalles íntimos ni información sobre terceras personas en el formulario o en el primer correo. Es suficiente con explicar de forma breve qué tipo de orientación buscas y cómo prefieres recibir respuesta.',
        'Si facilitas datos de un tercero, manifiestas contar con su consentimiento y te comprometes a trasladarle esta información.'
      ]
    },
    {
      heading: 'Legitimación — ¿cuál es la base legal?',
      body: [
        'El tratamiento de tus datos de contacto se basa en tu consentimiento al enviarnos una solicitud, que puedes retirar en cualquier momento.',
        'El tratamiento de los datos vinculados a la prestación del servicio se basa en la ejecución de la relación asistencial y en el cumplimiento de las obligaciones legales que la regulan.'
      ]
    },
    {
      heading: 'Conservación — ¿durante cuánto tiempo?',
      body: [
        'Los datos de contacto de quien solicita información se conservan únicamente el tiempo necesario para atender esa solicitud, mientras no se revoque el consentimiento.',
        'La documentación clínica se conserva durante los plazos que establece la normativa sanitaria aplicable, y después permanece bloqueada mientras puedan derivarse responsabilidades legales.'
      ]
    },
    {
      heading: 'Destinatarios — ¿quién puede acceder a tus datos?',
      body: [
        'Pueden acceder a tus datos los proveedores que prestan servicios técnicos necesarios para el funcionamiento de la consulta y de esta web, siempre bajo el correspondiente contrato de encargo de tratamiento.',
        'Fuera de esos casos, tus datos solo se comunican a organismos públicos o a las Fuerzas y Cuerpos de Seguridad cuando exista una obligación legal, y a entidades financieras cuando resulte necesario para el cobro de los servicios.'
      ]
    },
    {
      heading: 'Confidencialidad y secreto profesional',
      body: [
        'El contenido de las sesiones está amparado por el secreto profesional. Solo se rompe en los supuestos que la ley contempla, principalmente cuando existe un riesgo grave para la vida o la integridad de la persona o de un tercero.',
        'En el trabajo con menores, la información se comparte con quienes ejercen la responsabilidad parental cuidando al mismo tiempo el espacio de confianza del propio menor.'
      ]
    },
    {
      heading: 'Seguridad de la información',
      body: ['Se aplican las medidas técnicas y organizativas necesarias para evitar la pérdida, manipulación, difusión o alteración de los datos:'],
      items: [
        'Cifrado de las comunicaciones entre tu dispositivo y esta web mediante protocolo HTTPS.',
        'Acceso restringido a la documentación clínica y custodia bajo llave o con control de acceso.',
        'Medidas para impedir el acceso de terceros a los datos de las personas usuarias.'
      ]
    },
    {
      heading: 'Derechos — ¿cómo puedes ejercerlos?',
      body: [
        `Puedes solicitar acceso a tus datos personales, su rectificación o su supresión, así como la limitación u oposición al tratamiento y la portabilidad, escribiendo a ${practiceIdentity.email} o a ${practiceIdentity.address.streetAddress}, ${practiceIdentity.address.addressLocality}.`,
        'Puedes retirar en cualquier momento los consentimientos otorgados, sin que ello afecte a la licitud del tratamiento previo a su retirada.',
        'Si consideras que tus derechos no han sido debidamente atendidos, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).'
      ]
    },
    {
      heading: 'Modificación de esta política',
      body: ['Esta política puede modificarse para adaptarla a cambios normativos o de funcionamiento. Las sucesivas versiones se publicarán en esta misma página.']
    }
  ],
  cookies: [
    {
      body: [
        'Esta web utiliza únicamente cookies técnicas necesarias para el funcionamiento básico de la navegación. Sin ellas, la página no puede servirse correctamente.',
        'No se utilizan cookies de analítica, de publicidad, de perfilado ni de redes sociales, y no hay herramientas de seguimiento de terceros instaladas en el sitio.'
      ]
    },
    {
      heading: 'Qué significa esto en la práctica',
      body: ['Como no se emplean cookies que requieran consentimiento, no verás un banner pidiéndotelo. En concreto:'],
      items: [
        'No se construye ningún perfil de navegación sobre ti.',
        'No se comparten datos de uso con plataformas publicitarias ni de medición.',
        'El contenido del formulario de contacto y tus datos personales nunca se envían a herramientas de analítica.'
      ]
    },
    {
      heading: 'Control desde tu navegador',
      body: [
        'Puedes bloquear o eliminar las cookies almacenadas desde la configuración de tu navegador. Al tratarse solo de cookies técnicas, hacerlo puede afectar al funcionamiento de algunas partes de la web, pero no limita el acceso a la información publicada.',
        'Si en el futuro se incorporase cualquier medición adicional, sería proporcionada, respetuosa con la privacidad, limitada a datos agregados y solicitaría tu consentimiento previo.'
      ]
    }
  ]
};
