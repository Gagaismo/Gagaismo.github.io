import type { Lang } from "./ui";

export const email = "contacto@lautaroguebel.tech";

interface Item {
  title: string;
  text: string;
}

interface Draft {
  value: string;
  label: string;
  text: string;
}

export interface HomeCopy {
  skip: string;
  nav: { label: string; cases: string; method: string; offer: string; contact: string; language: string; cta: string };
  hero: {
    line1: string;
    line2: string;
    lead: string;
    cta: string;
    secondary: string;
  };
  change: {
    title: string;
    intro: string;
    before: { title: string; items: string[]; imageAlt: string };
    after: { title: string; items: string[] };
    /** Real, anonymized screens of the student diagnostic: one alt per screen, one caption. */
    screens: { alts: string[]; caption: string };
  };
  flow: {
    title: string;
    /** Word of the title laid on a straw wash (L56). */
    highlight: string;
    intro: string;
    steps: string[];
    failure: string;
    /** Under the plan's scale bar, whose length is one station to the next. */
    scale: string;
    /** The plan's live event log (L76, moved from the hero): sample events oldest first, times by
     *  position newest first, a caption that says the data is a sample. */
    feed: { label: string; description: string; events: string[]; times: string[] };
    /** The real sale-to-onboarding workflow, redrawn with generic node names. */
    graph: {
      /** The disclosure's summary on phones. */
      open: string;
      label: string;
      no: string;
      nodes: { form: string; check: string; mail: string; invite: string; contract: string; done: string; retry: string; alert: string };
    };
  };
  method: {
    title: string;
    intro: string;
    /** Accessible name of the list of steps (the stacking cards). */
    label: string;
    /** One short sentence per step, each proven by its artifact. */
    steps: { when: string; line: string; text: string; caption?: string }[];
    survey: { title: string; rows: { task: string; how: string }[] };
    map: { title: string; label: string; nodes: string[]; links: string[]; glossary: Item[] };
    decision: { title: string; context: string; status: string };
    health: { title: string; checks: string[] };
    review: { title: string; states: string[] };
  };
  padel: {
    title: string;
    /** Opens with "second case": the case number lives in the first sentence, not in a label. */
    lead: string;
    /** The club's system drawn as a plan: one plot per part, each a name and one sentence. */
    plan: { title: string; caption: string; plots: Item[] };
    problemTitle: string;
    problems: string[];
    builtTitle: string;
    built: string[];
    outcomeTitle: string;
    /** A register of what happened: when (with an ISO date only where the copy states one) and what. */
    outcomes: { when: string; date?: string; text: string }[];
    imageAlt: string;
  };
  /** What I can build for a small business, each thing told as the owner's benefit (L40: no tool names). */
  offer: {
    title: string;
    intro: string;
    imageAlt: string;
    /** `was` is the old way the thing replaces, shown struck through; `text` is one sentence. */
    items: (Item & { was: string })[];
    /** Hidden prefix that reads the struck-through line aloud as the old way. */
    wasLabel: string;
    /** The offer's last sentence; the contact section right below is the call to action. */
    close: string;
  };
  contact: {
    title: string;
    text: string;
    pickTitle: string;
    drafts: Draft[];
    draftLabel: string;
    subject: string;
    send: string;
    copy: string;
    copied: string;
    copyFailed: string;
    emailNote: string;
    place: string;
    placeNote: string;
  };
  footer: {
    /** Accessible name of the footer's link columns. */
    label: string;
    /** Accessible name of the email icon button. */
    emailLabel: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    year: string;
    made: string;
  };
}

const es: HomeCopy = {
  skip: "Saltar al contenido",
  nav: { label: "Secciones", cases: "Casos", method: "Cómo trabajo", offer: "Qué hago", contact: "Contacto", language: "Idioma", cta: "Contactame" },
  hero: {
    line1: "Ordeno tu",
    line2: "negocio",
    lead: "Soy Lautaro Guebel, estudiante de Ingeniería en Sistemas en la UTN. Paso las tareas que hoy hacés a mano, las planillas y los WhatsApp de tu negocio a sistemas y automatizaciones hechas a medida.",
    cta: "Escribime por email",
    secondary: "o mirá cómo lo hice, paso a paso",
  },
  change: {
    title: "Qué cambia en el día a día",
    intro:
      "Así trabajaba una academia online de ventas antes de automatizar, y así trabaja ahora. Si en tu negocio repetís los mismos pasos después de cada venta, el cambio es el mismo.",
    before: {
      title: "Antes",
      items: [
        "Después de cada pago, el dueño mandaba a mano el mail de bienvenida.",
        "Daba el acceso a la plataforma y preparaba el contrato, alumno por alumno.",
        "Seguía las cuotas pendientes en una planilla.",
        "Armaba los reportes juntando datos de varios lados.",
      ],
      imageAlt: "Escritorio desordenado de un negocio chico: cuaderno con listas tachadas, planillas impresas, notas adhesivas amarillas, una calculadora y un celular.",
    },
    after: {
      title: "Después",
      items: [
        "De la venta al alumno listo para empezar, sin pasos manuales.",
        "Mail, acceso y contrato salen solos y en orden.",
        "Si algo falla, el sistema reintenta y le avisa al operador.",
        "El dueño solo aprueba desde WhatsApp.",
      ],
    },
    screens: {
      alts: [
        "Pantalla de celular \"Alta de alumno\": venta registrada, mail de bienvenida enviado, acceso a la plataforma activado, contrato enviado para firmar y aviso por WhatsApp, cada uno tildado con su hora, y al final \"Alumno listo para empezar\".",
      ],
      caption: "Así queda cada alta, sin que nadie toque nada. Pantalla ilustrativa.",
    },
  },
  flow: {
    title: "Lo que pasa después de cada venta",
    highlight: "venta",
    intro: "Cada paso dispara el siguiente. Nadie tiene que acordarse de nada.",
    steps: ["Venta registrada", "Mail de bienvenida", "Acceso a la plataforma", "Contrato para firmar", "Aviso por WhatsApp"],
    failure: "Si algo falla: reintenta y avisa al operador",
    scale: "escala: un paso",
    feed: {
      label: "Así se ve un día del sistema · datos de ejemplo",
      description:
        "Ejemplo, con datos inventados, de un día del sistema de automatización: se registra una venta, sale el mail de bienvenida, se activa el acceso a la plataforma, se envía y se firma el contrato, y salen los recordatorios de cuota sin que nadie los mande a mano.",
      events: [
        "Venta registrada",
        "Mail de bienvenida enviado",
        "Acceso a la plataforma activado",
        "Contrato enviado para firmar",
        "Contrato firmado",
        "Recordatorio de cuota enviado",
        "Reporte semanal de campañas listo",
        "Publicación aprobada desde WhatsApp",
      ],
      times: ["ahora", "hace 2 min", "hace 6 min", "hace 11 min"],
    },
    graph: {
      open: "Ver el flujo real, por dentro",
      label:
        "Diagrama del flujo real del alta. El formulario de venta pasa por una validación; si no es válida, se avisa al operador. Si es válida, salen en paralelo el mail de bienvenida y el contrato. Cuando sale el mail, se envía la invitación a la plataforma. Si el mail o la invitación fallan, se reintenta y, si siguen fallando, se avisa al operador; si falla el contrato, también se le avisa. Al final, el alta queda lista.",
      no: "no",
      nodes: {
        form: "Formulario de venta",
        check: "¿Venta válida?",
        mail: "Mail de bienvenida",
        invite: "Invitación a la plataforma",
        contract: "Contrato",
        done: "Alta lista",
        retry: "Reintento",
        alert: "Aviso al operador",
      },
    },
  },
  method: {
    title: "Cómo trabajo, paso a paso",
    intro: "Cada paso deja algo concreto que podés ver antes de seguir. Estos son los de la academia.",
    label: "Los cinco pasos",
    steps: [
      {
        when: "Primero,",
        line: "te escucho.",
        text: "Entiendo cómo trabajás hoy y dónde se pierde tiempo.",
      },
      {
        when: "Después,",
        line: "ordenamos el problema.",
        text: "Dibujo el proceso de punta a punta y armamos un glosario común.",
      },
      {
        when: "Juntos,",
        line: "decidimos por escrito.",
        text: "Cada decisión importante queda escrita con su motivo.",
      },
      {
        when: "Luego,",
        line: "lo construyo y lo probamos.",
        text: "Cada parte llega con pruebas que corren solas, y el servidor se revisa con un chequeo de salud.",
        caption: "Algunas verificaciones, en palabras simples.",
      },
      {
        when: "Y",
        line: "lo ajustamos sobre la marcha.",
        text: "El sistema crece con el negocio, y cada cambio se revisa antes de entrar.",
      },
    ],
    survey: {
      title: "Cómo se trabajaba",
      rows: [
        { task: "Mail de bienvenida", how: "A mano, después de cada pago" },
        { task: "Acceso a la plataforma", how: "A mano, alumno por alumno" },
        { task: "Contrato", how: "A mano, con seguimiento propio" },
        { task: "Cuotas pendientes", how: "En una planilla" },
        { task: "Reporte de anuncios", how: "A mano" },
      ],
    },
    map: {
      title: "El proceso, de punta a punta",
      label: "Mapa del proceso: la venta crea al alumno; el alumno recibe el acceso, firma el contrato y paga las cuotas; los avisos le llegan al operador.",
      nodes: ["Venta", "Alumno", "Acceso", "Operador", "Contrato", "Cuotas"],
      links: ["crea", "recibe", "firma", "paga", "avisos"],
      glossary: [
        { title: "Alta", text: "El momento en que un alumno queda listo para empezar." },
        { title: "Operador", text: "La persona que recibe los avisos y aprueba." },
      ],
    },
    decision: {
      title: "Dos canales de WhatsApp según a quién le hablás.",
      context: "Los avisos para el equipo y los mensajes para los alumnos no se mezclan.",
      status: "Estado: aceptada",
    },
    health: {
      title: "Chequeo de salud del servidor",
      checks: ["Todos los servicios están en marcha", "Las automatizaciones están cargadas", "Hay copias de seguridad", "WhatsApp está conectado"],
    },
    review: {
      title: "Cada cambio",
      states: ["Se propone", "Se revisa", "Entra y queda registrado"],
    },
  },
  padel: {
    title: "Club deportivo y academia de pádel",
    lead: "Segundo caso, más chico: un club con escuela de adultos, programa infantil, fútbol y parrilla, que dependía de registros informales.",
    plan: {
      title: "Plano del sistema",
      caption: "Las partes del club, en un solo sistema.",
      plots: [
        { title: "Roles", text: "Un solo sistema y seis roles: cada persona ve su parte." },
        { title: "Stock", text: "Avisa cuando algo está por agotarse." },
        { title: "Limpieza", text: "Una lista por turno, y queda quién la hizo." },
        { title: "Parrilla", text: "Reservas sin superposiciones, hasta dos por día." },
        { title: "Cuotas Kids", text: "Cada mes, quién está al día y quién no." },
      ],
    },
    problemTitle: "El problema",
    problems: ["Registros informales, repartidos en varios lados.", "Los programas de la escuela se mezclaban.", "Los datos pasaban de un área a otra."],
    builtTitle: "Lo que construí",
    built: ["Funciona en el celular y en la compu.", "Un historial de cambios que no se borra."],
    outcomeTitle: "Cómo terminó",
    outcomes: [
      { when: "17/09/2026", date: "2026-09-17", text: "Demo aprobada." },
      { when: "El mismo día", text: "Dos cambios pedidos en la demo, incorporados." },
      { when: "17/10/2026", date: "2026-10-17", text: "Sistema terminado y entregado." },
    ],
    imageAlt: "Cancha de pádel vacía al aire libre, con piso azul, paredes de vidrio y dos pelotas junto al vidrio.",
  },
  offer: {
    title: "Lo que tu negocio puede hacer solo",
    imageAlt: "Dueña de una ferretería de barrio, detrás del mostrador, revisando el celular entre estanterías ordenadas.",
    intro: "No hace falta que sepas de tecnología. Me contás cómo trabajás hoy y lo convierto en un sistema hecho a medida que hace por vos el trabajo repetitivo.",
    wasLabel: "Antes: ",
    items: [
      {
        title: "Que tus clientes reserven solos",
        was: "Turnos por WhatsApp a cualquier hora",
        text: "Reservan online, reciben la confirmación y un recordatorio antes del turno: menos mensajes y menos ausencias.",
      },
      {
        title: "Stock que avisa antes de faltar",
        was: "Contar a mano y enterarte tarde",
        text: "Cada entrada y salida queda anotada sola, y te llega un aviso cuando algo está por agotarse.",
      },
      {
        title: "Cobros que se reclaman solos",
        was: "Perseguir cuotas con una planilla",
        text: "Los recordatorios de pago salen solos y ves de un vistazo quién pagó y quién no.",
      },
      {
        title: "Cada venta sigue sin vos",
        was: "Mails, accesos y contratos a mano",
        text: "Después de cada venta salen solos el mail de bienvenida, los accesos y el contrato para firmar, en orden y sin olvidos.",
      },
      {
        title: "Los números te llegan solos",
        was: "Armar reportes juntando datos",
        text: "Cada semana te llega al WhatsApp o al mail un resumen de ventas, cobros o anuncios, sin que tengas que armarlo.",
      },
      {
        title: "Todo en un lugar, cada uno con lo suyo",
        was: "Planillas, cuadernos y grupos de WhatsApp",
        text: "Un solo sistema en el celular y en la compu: tu equipo ve solo su parte y queda registrado quién cambió qué.",
      },
    ],
    close: "Arrancamos por lo que más tiempo te come, y lo ves funcionando antes de seguir con lo próximo.",
  },
  contact: {
    title: "Empecemos por tu caso",
    text: "Estudio Ingeniería en Sistemas en la UTN (Facultad Regional Tucumán) y hago sistemas y automatizaciones para clientes reales. Contame qué hace tu negocio: te respondo con preguntas para entenderlo y, si encaja, con una propuesta por escrito.",
    pickTitle: "¿Qué se te complica hoy?",
    drafts: [
      { value: "tareas", label: "Tareas que repito después de cada venta", text: "Hola Lautaro. Después de cada venta repito a mano los mismos pasos (mails, accesos, planillas). Quisiera que pasen solos. ¿Lo podemos ver?" },
      { value: "cobros", label: "Saber quién pagó", text: "Hola Lautaro. Me cuesta saber quién me pagó y quién no: lo tengo repartido entre chats y una planilla. ¿Lo podemos ver?" },
      { value: "turnos", label: "Los turnos y las reservas", text: "Hola Lautaro. Manejo turnos y reservas por WhatsApp y a veces se me superponen. Quisiera que se ordenen solos. ¿Lo podemos ver?" },
      { value: "stock", label: "El stock", text: "Hola Lautaro. Tengo un negocio y se me complica el stock: lo controlo a mano y me entero tarde cuando algo falta. ¿Lo podemos ver?" },
      { value: "todo", label: "Tengo todo en planillas y WhatsApp", text: "Hola Lautaro. Tengo la información del negocio repartida entre planillas, cuadernos y WhatsApp. Quisiera tenerla en un solo lugar. ¿Lo podemos ver?" },
    ],
    draftLabel: "Tu primer mensaje, ya escrito",
    subject: "Consulta desde tu portfolio",
    send: "Enviar por email",
    copy: "Copiar mensaje",
    copied: "Copiado. Pegalo donde quieras.",
    copyFailed: "No se pudo copiar. Seleccioná el texto y copialo.",
    emailNote: "Te respondo por acá",
    place: "Tucumán, Argentina",
    placeNote: "Donde estudio y trabajo",
  },
  footer: {
    label: "Pie de página",
    emailLabel: "Escribirle un email a Lautaro",
    columns: [
      {
        title: "Secciones",
        links: [
          { label: "Casos", href: "#automation" },
          { label: "Cómo trabajo", href: "#method" },
          { label: "Qué hago", href: "#offer" },
          { label: "Contacto", href: "#contact" },
        ],
      },
      {
        title: "Contacto",
        links: [
          { label: "Escribime por email", href: `mailto:${email}` },
          { label: "Volver arriba", href: "#top" },
        ],
      },
    ],
    year: "© 2026 Lautaro Guebel · Argentina",
    made: "Hecho en Tucumán",
  },
};

const en: HomeCopy = {
  skip: "Skip to content",
  nav: { label: "Sections", cases: "Work", method: "How I work", offer: "What I do", contact: "Contact", language: "Language", cta: "Contact me" },
  hero: {
    line1: "Your business,",
    line2: "in order",
    lead: "I'm Lautaro Guebel, a Systems Engineering student at UTN (Argentina). I turn the manual tasks, spreadsheets and WhatsApp threads of your business into custom systems and automations.",
    cta: "Email me",
    secondary: "or see how I did it, step by step",
  },
  change: {
    title: "What changes day to day",
    intro:
      "This is how an online sales academy worked before automating, and how it works now. If your business repeats the same steps after every sale, the change is the same.",
    before: {
      title: "Before",
      items: [
        "After every payment, the owner sent the welcome email by hand.",
        "Platform access and the contract were set up by hand, one student at a time.",
        "Pending instalments lived in a spreadsheet.",
        "Reports meant pulling numbers together from several places.",
      ],
      imageAlt: "Messy desk of a small business: a notebook of crossed-out lists, printed spreadsheets, yellow sticky notes, a calculator and a phone.",
    },
    after: {
      title: "After",
      items: [
        "From the sale to a student ready to start, with no manual steps.",
        "Email, access and contract go out on their own, in order.",
        "If something fails, the system retries and alerts the operator.",
        "The owner only approves, from WhatsApp.",
      ],
    },
    screens: {
      alts: [
        "Phone screen \"Alta de alumno\" (new student): sale recorded, welcome email sent, platform access activated, contract sent for signature and WhatsApp notice, each ticked with its time, ending in \"Alumno listo para empezar\" (student ready to start).",
      ],
      caption: "Every new student, set up with nobody touching a thing. Illustrative screen.",
    },
  },
  flow: {
    title: "What happens after every sale",
    highlight: "sale",
    intro: "Each step triggers the next. Nobody has to remember anything.",
    steps: ["Sale recorded", "Welcome email", "Platform access", "Contract to sign", "WhatsApp alert"],
    failure: "If something fails: retry and alert the operator",
    scale: "scale: one step",
    feed: {
      label: "A day in the system · sample data",
      description:
        "A sample day of the automation system, with made-up data: a sale is recorded, the welcome email goes out, platform access is turned on, the contract is sent and signed, and instalment reminders go out without anyone sending them by hand.",
      events: [
        "Sale recorded",
        "Welcome email sent",
        "Platform access activated",
        "Contract sent for signature",
        "Contract signed",
        "Instalment reminder sent",
        "Weekly campaign report ready",
        "Post approved from WhatsApp",
      ],
      times: ["now", "2 min ago", "6 min ago", "11 min ago"],
    },
    graph: {
      open: "See the real workflow, inside",
      label:
        "Diagram of the real onboarding workflow. The sale form goes through a check; if it is not valid, the operator is alerted. If it is valid, the welcome email and the contract go out in parallel. Once the email is sent, the platform invite goes out. If the email or the invite fails, it is retried and, if it still fails, the operator is alerted; if the contract fails, the operator is alerted too. At the end, the onboarding is done.",
      no: "no",
      nodes: {
        form: "Sale form",
        check: "Valid sale?",
        mail: "Welcome email",
        invite: "Platform invite",
        contract: "Contract",
        done: "Onboarding done",
        retry: "Retry",
        alert: "Operator alert",
      },
    },
  },
  method: {
    title: "How I work, step by step",
    intro: "Every step leaves something concrete you can see before we move on. These are the academy's.",
    label: "The five steps",
    steps: [
      {
        when: "First,",
        line: "I listen.",
        text: "I learn how you work today and where time gets lost.",
      },
      {
        when: "Then,",
        line: "we map the problem.",
        text: "I draw the process end to end and we write a shared glossary.",
      },
      {
        when: "Together,",
        line: "we decide in writing.",
        text: "Every important decision is written down with its reason.",
      },
      {
        when: "Next,",
        line: "I build it and we test it.",
        text: "Every part ships with tests that run on their own, and the server gets a health check.",
        caption: "A few of the checks, in plain words.",
      },
      {
        when: "And",
        line: "we keep tuning it.",
        text: "The system grows with the business, and every change is reviewed before it goes in.",
      },
    ],
    survey: {
      title: "How the work was done",
      rows: [
        { task: "Welcome email", how: "By hand, after every payment" },
        { task: "Platform access", how: "By hand, one student at a time" },
        { task: "Contract", how: "By hand, chased personally" },
        { task: "Pending instalments", how: "In a spreadsheet" },
        { task: "Ads report", how: "By hand" },
      ],
    },
    map: {
      title: "The process, end to end",
      label: "Process map: the sale creates the student; the student gets access, signs the contract and pays the instalments; alerts go to the operator.",
      nodes: ["Sale", "Student", "Access", "Operator", "Contract", "Instalments"],
      links: ["creates", "gets", "signs", "pays", "alerts"],
      glossary: [
        { title: "Onboarding", text: "The moment a student is ready to start." },
        { title: "Operator", text: "The person who gets the alerts and approves." },
      ],
    },
    decision: {
      title: "Two WhatsApp channels, one per audience.",
      context: "Alerts for the team and messages for students never mix.",
      status: "Status: accepted",
    },
    health: {
      title: "Server health check",
      checks: ["Every service is running", "The automations are loaded", "Backups exist", "WhatsApp is connected"],
    },
    review: {
      title: "Every change",
      states: ["Proposed", "Reviewed", "Merged and on record"],
    },
  },
  padel: {
    title: "Sports club and padel academy",
    lead: "A smaller second case: a club with an adult school, a kids' programme, football and a barbecue area, running on informal records.",
    plan: {
      title: "Plan of the system",
      caption: "The parts of the club, in one system.",
      plots: [
        { title: "Roles", text: "One system and six roles: everyone sees their own part." },
        { title: "Stock", text: "Warns you when something is about to run out." },
        { title: "Cleaning", text: "A checklist per shift, with who did it." },
        { title: "Grill", text: "Bookings without overlaps, at most two a day." },
        { title: "Kids fees", text: "Each month, who is up to date and who isn't." },
      ],
    },
    problemTitle: "The problem",
    problems: ["Informal records, scattered everywhere.", "The school's programmes got mixed up.", "Data leaked from one area to another."],
    builtTitle: "What I built",
    built: ["Works on phone and desktop.", "A change history that can't be erased."],
    outcomeTitle: "How it ended",
    outcomes: [
      { when: "17/09/2026", date: "2026-09-17", text: "Demo approved." },
      { when: "The same day", text: "Two changes requested in the demo, added." },
      { when: "17/10/2026", date: "2026-10-17", text: "System finished and delivered." },
    ],
    imageAlt: "Empty outdoor padel court with a blue floor, glass walls and two balls by the glass.",
  },
  offer: {
    title: "What your business can do on its own",
    imageAlt: "Owner of a neighbourhood hardware store behind the counter, checking her phone among tidy shelves.",
    intro: "You don't need to know anything about technology. Tell me how you work today and I'll turn it into a custom system that does the repetitive work for you.",
    wasLabel: "Before: ",
    items: [
      {
        title: "Customers book on their own",
        was: "Bookings over WhatsApp at all hours",
        text: "They book online and get a confirmation and a reminder before the appointment: fewer messages and fewer no-shows.",
      },
      {
        title: "Stock that warns you before it runs out",
        was: "Counting by hand and finding out too late",
        text: "Every item in and out is recorded on its own, and you get an alert when something is about to run out.",
      },
      {
        title: "Payments that chase themselves",
        was: "Chasing instalments with a spreadsheet",
        text: "Payment reminders go out on their own, and you see at a glance who has paid and who hasn't.",
      },
      {
        title: "Every sale moves on without you",
        was: "Emails, access and contracts by hand",
        text: "After every sale the welcome email, the access and the contract to sign go out on their own, in order and with nothing forgotten.",
      },
      {
        title: "Your numbers come to you",
        was: "Building reports from scattered data",
        text: "Every week a summary of sales, payments or ads reaches your WhatsApp or inbox, without you putting it together.",
      },
      {
        title: "One place, everyone with their part",
        was: "Spreadsheets, notebooks and WhatsApp groups",
        text: "One system on your phone and computer: your team sees only their part, and every change is on record.",
      },
    ],
    close: "We start with whatever eats most of your time, and you see it working before we move on to the next thing.",
  },
  contact: {
    title: "Let's start with your case",
    text: "I study Systems Engineering at UTN (Tucumán Regional Faculty) and build systems and automations for real clients. Tell me what your business does: I'll reply with questions to understand it and, if it's a fit, a written proposal.",
    pickTitle: "What's giving you trouble today?",
    drafts: [
      { value: "tareas", label: "Tasks I repeat after every sale", text: "Hi Lautaro. After every sale I repeat the same steps by hand (emails, access, spreadsheets). I'd like them to happen on their own. Can we talk?" },
      { value: "cobros", label: "Knowing who has paid", text: "Hi Lautaro. It's hard to tell who has paid and who hasn't: it's spread across chats and a spreadsheet. Can we talk?" },
      { value: "turnos", label: "Bookings and appointments", text: "Hi Lautaro. I handle bookings over WhatsApp and they sometimes overlap. I'd like them to sort themselves out. Can we talk?" },
      { value: "stock", label: "Stock", text: "Hi Lautaro. Stock is a headache: I track it by hand and find out too late when something runs out. Can we talk?" },
      { value: "todo", label: "Everything lives in spreadsheets and WhatsApp", text: "Hi Lautaro. My business information is spread across spreadsheets, notebooks and WhatsApp. I'd like to keep it in a single place. Can we talk?" },
    ],
    draftLabel: "Your first message, already written",
    subject: "Enquiry from your portfolio",
    send: "Send by email",
    copy: "Copy message",
    copied: "Copied. Paste it wherever you like.",
    copyFailed: "Couldn't copy. Select the text and copy it.",
    emailNote: "I reply here",
    place: "Tucumán, Argentina",
    placeNote: "Where I study and work",
  },
  footer: {
    label: "Footer",
    emailLabel: "Send Lautaro an email",
    columns: [
      {
        title: "Sections",
        links: [
          { label: "Work", href: "#automation" },
          { label: "How I work", href: "#method" },
          { label: "What I do", href: "#offer" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Email me", href: `mailto:${email}` },
          { label: "Back to top", href: "#top" },
        ],
      },
    ],
    year: "© 2026 Lautaro Guebel · Argentina",
    made: "Made in Tucumán",
  },
};

export const home: Record<Lang, HomeCopy> = { es, en };

export function mailto(subject: string, body: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
