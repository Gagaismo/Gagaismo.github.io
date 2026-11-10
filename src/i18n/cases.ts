import type { Lang } from "./ui";

/** The case pages (T4): one per case and language. The key is the entry's file name in
 *  src/content/case-studies/{es,en}/. */
export type CaseKey = "automation" | "club-padel";

/** Path after the site root, one per language; each page links its counterpart through these. */
export const casePaths: Record<CaseKey, Record<Lang, string>> = {
  automation: { es: "casos/automatizacion/", en: "cases/automation/" },
  "club-padel": { es: "casos/club-de-padel/", en: "cases/padel-club/" },
};

export const caseHref = (key: CaseKey, lang: Lang) => `/${lang}/${casePaths[key][lang]}`;

interface Item {
  title: string;
  text: string;
}

/** A drawn sheet: its title above, its italic caption under it. */
interface Sheet {
  title: string;
  caption: string;
}

/** A chapter of the story: a heading and a few paragraphs in plain words. */
interface Chapter {
  title: string;
  text: string[];
}

interface Term {
  term: string;
  text: string;
  /** Words the glossary says not to use for it. */
  avoid?: string;
}

export interface CaseUi {
  /** The home's link to each case page. */
  full: string;
  sector: string;
  problem: string;
  /** First chapter, above the entry's own text. */
  business: string;
  /** Under the closing heading: the other case and the home. */
  close: { title: string; text: string; cta: string; subject: string; other: string; back: string };
}

export interface AutomationStory {
  imageAlt: string;
  analysis: Chapter & {
    survey: Sheet & { rows: { task: string; how: string }[] };
    map: Sheet & { label: string; nodes: [string, string, string, string, string, string]; links: [string, string, string, string, string] };
    glossary: Sheet & { terms: Term[] };
    decision: Sheet & { decision: string; why: string; status: string };
  };
  built: Chapter & { screen: { alt: string; caption: string } };
  around: Chapter & {
    plan: Sheet & { plots: Item[] };
    contract: Sheet & { days: { day: string; text: string }[] };
  };
  care: Chapter & {
    health: Sheet & { checks: string[] };
    change: Sheet & { states: string[] };
  };
  outcome: Chapter & { runs: string; runsCaption: string; size: string[] };
}

export interface PadelStory {
  imageAlt: string;
  before: Sheet & { was: string; now: string; rows: { was: string; now: string }[] };
  analysis: Chapter & {
    survey: Sheet & { profiles: string[]; low: string; high: string };
    rules: Sheet & { items: string[] };
    glossary: Sheet & { avoid: string; terms: Term[] };
  };
  built: Chapter & {
    roles: Sheet & { plots: Item[] };
    supply: Sheet & { steps: string[]; ends: string; endStates: string[] };
    grill: Sheet & { days: string[]; booked: string; rejected: string; legend: string };
  };
  care: Chapter & { checks: Sheet & { items: string[] } };
  outcome: Chapter & {
    runs: string;
    runsCaption: string;
    decision: Sheet & { decision: string; context: string; optionsTitle: string; options: string[]; consequence: string; status: string };
  };
}

export const caseUi: Record<Lang, CaseUi> = {
  es: {
    full: "Ver el caso completo",
    sector: "Rubro",
    problem: "El problema",
    business: "El negocio y su problema",
    close: {
      title: "¿Tu negocio tiene algo parecido?",
      text: "Contame cómo trabajás hoy. Te respondo con preguntas para entenderlo y, si encaja, con una propuesta por escrito.",
      cta: "Escribime por email",
      subject: "Consulta desde un caso de tu portfolio",
      other: "Ver el otro caso",
      back: "Volver al inicio",
    },
  },
  en: {
    full: "See the full case",
    sector: "Business",
    problem: "The problem",
    business: "The business and its problem",
    close: {
      title: "Does your business have something similar?",
      text: "Tell me how you work today. I'll reply with questions to understand it and, if it's a fit, a written proposal.",
      cta: "Email me",
      subject: "Enquiry from a case on your portfolio",
      other: "See the other case",
      back: "Back to the home page",
    },
  },
};

export const automationStory: Record<Lang, AutomationStory> = {
  es: {
    imageAlt: "Escritorio desordenado de un negocio chico: cuaderno con listas tachadas, planillas impresas, notas adhesivas amarillas, una calculadora y un celular.",
    analysis: {
      title: "Cómo lo analizamos",
      text: [
        "Antes de construir nada, me senté a entender cómo trabajaban. Anotamos cada tarea que se repetía después de una venta, cómo se hacía y dónde se trababa.",
        "Con eso dibujé el proceso de punta a punta y armamos un glosario: palabras como «alta» u «operador» quieren decir una sola cosa para todos, así nadie se confunde cuando pide un cambio.",
        "Cada decisión importante quedó escrita con su motivo. Si dentro de un año alguien pregunta por qué algo funciona así, la respuesta está escrita.",
      ],
      survey: {
        title: "Lo que relevamos",
        caption: "Relevamiento resumido para esta página.",
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
        caption: "Mapa simplificado.",
        label:
          "Mapa del proceso: la venta crea al alumno; el alumno recibe el acceso, firma el contrato y paga las cuotas; si algo falla, el aviso le llega al operador.",
        nodes: ["Venta", "Alumno", "Acceso", "Contrato", "Cuotas", "Operador"],
        links: ["crea", "recibe", "firma", "paga", "avisos"],
      },
      glossary: {
        title: "Glosario",
        caption: "Cuatro palabras del glosario del proyecto.",
        terms: [
          { term: "Alta", text: "El momento en que un alumno queda listo para empezar: con acceso, contrato y bienvenida." },
          { term: "Operador", text: "La persona del equipo que recibe los avisos y aprueba lo delicado." },
          { term: "Cuota", text: "Cada una de las partes en que se paga el curso." },
          { term: "Aviso", text: "Un mensaje al operador cuando algo necesita a una persona." },
        ],
      },
      decision: {
        title: "Una decisión escrita",
        caption: "Una decisión real, resumida.",
        decision: "Dos canales de WhatsApp, según a quién le hablás.",
        why: "Los avisos para el equipo y los mensajes para los alumnos no se mezclan.",
        status: "Estado: aceptada",
      },
    },
    built: {
      title: "Lo que construimos",
      text: [
        "El sistema toma cada venta y hace, en orden, todo lo que antes hacía el dueño. Cada paso dispara el siguiente. Si uno falla, lo vuelve a intentar, y si sigue fallando le avisa a una persona.",
        "Abajo está el plano de ese recorrido, cómo se ve un día del sistema y el flujo real, por dentro.",
      ],
      screen: {
        alt: "Pantalla de celular \"Alta de alumno\": venta registrada, mail de bienvenida enviado, acceso a la plataforma activado, contrato enviado para firmar y aviso por WhatsApp, cada uno tildado con su hora, y al final \"Alumno listo para empezar\".",
        caption: "Así queda cada alta, sin que nadie toque nada. Pantalla ilustrativa.",
      },
    },
    around: {
      title: "Y lo que corre alrededor",
      text: [
        "La venta fue el primer paso. Después se sumaron otras tareas que también se repetían: las cuotas, los reportes, el seguimiento de cada alumno y la búsqueda de oportunidades de trabajo para ellos.",
        "El dueño no tiene que entrar a ningún sistema: lo que necesita su visto bueno le llega por WhatsApp, y lo aprueba desde ahí.",
      ],
      plan: {
        title: "Plano de lo que corre solo",
        caption: "Las partes del sistema, en palabras simples.",
        plots: [
          { title: "Cuotas", text: "Todos los días revisa las cuotas y manda los recordatorios a quien corresponde." },
          { title: "Diagnóstico", text: "Cada alumno responde un diagnóstico: el sistema lo ubica en cuatro ejes, le asigna un perfil y le arma un plan de 15 días." },
          { title: "Oportunidades", text: "Junta las ofertas de trabajo que se publican en la comunidad, ordena sus datos y manda un resumen diario." },
          { title: "Reporte de anuncios", text: "Cada semana llega solo el resumen de las campañas." },
          { title: "Asistente del operador", text: "El operador le pide cosas por WhatsApp; lo delicado espera su aprobación antes de hacerse." },
        ],
      },
      contract: {
        title: "El contrato, día por día",
        caption: "Si nadie firma, el sistema no se olvida.",
        days: [
          { day: "Día 0", text: "Sale el contrato para firmar." },
          { day: "Día 2", text: "Primer recordatorio al alumno." },
          { day: "Día 5", text: "Segundo recordatorio." },
          { day: "Día 7", text: "Aviso al operador." },
        ],
      },
    },
    care: {
      title: "Cómo se controla y se mantiene",
      text: [
        "Un sistema que trabaja solo tiene que avisar cuando algo anda mal. Un chequeo de salud revisa el servidor punto por punto: que cada servicio esté en marcha, que las automatizaciones estén cargadas, que haya copias de seguridad y que WhatsApp esté conectado.",
        "El sistema tiene sus propias pruebas automáticas, cada cambio se revisa antes de entrar, y un control se fija que ninguna contraseña quede escrita donde no debe. Hay copias de seguridad del servidor, y restaurar una también está automatizado.",
        "Algunas automatizaciones quedan apagadas hasta que su chequeo pasa: es preferible que algo no corra a que corra mal.",
      ],
      health: {
        title: "Chequeo de salud del servidor",
        caption: "Algunos de los controles, en palabras simples.",
        checks: ["Todos los servicios están en marcha", "Las automatizaciones están cargadas", "Hay copias de seguridad", "WhatsApp está conectado"],
      },
      change: {
        title: "Cada cambio",
        caption: "Cómo entra un cambio al sistema.",
        states: ["Se propone", "Se revisa", "Entra y queda registrado"],
      },
    },
    outcome: {
      title: "Cómo quedó",
      text: [
        "No hay métricas de uso para mostrar, y no las voy a inventar. Lo que sí puedo mostrar es lo que hoy corre solo, todos los días, sin que el dueño intervenga.",
      ],
      runs: "Lo que hoy corre solo",
      runsCaption: "Todos los días, sin que el dueño intervenga.",
      size: [
        "Para dar una idea del tamaño: son 12 flujos automáticos, cada uno una cadena de entre 3 y 40 pasos.",
        "Hay 24 decisiones escritas con su motivo, como la de los dos canales.",
        "Y el chequeo de salud revisa 27 puntos del servidor.",
      ],
    },
  },
  en: {
    imageAlt: "Messy desk of a small business: a notebook of crossed-out lists, printed spreadsheets, yellow sticky notes, a calculator and a phone.",
    analysis: {
      title: "How we analysed it",
      text: [
        "Before building anything, I sat down to understand how they worked. We wrote down every task repeated after a sale, how it was done and where it got stuck.",
        "With that I drew the process end to end and we wrote a glossary: words like \"onboarding\" or \"operator\" mean one thing for everyone, so nobody gets confused when asking for a change.",
        "Every important decision was written down with its reason. If someone asks in a year why something works the way it does, the answer is written.",
      ],
      survey: {
        title: "What we surveyed",
        caption: "Survey summarised for this page.",
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
        caption: "Simplified map.",
        label:
          "Process map: the sale creates the student; the student gets access, signs the contract and pays the instalments; if something fails, the alert goes to the operator.",
        nodes: ["Sale", "Student", "Access", "Contract", "Instalments", "Operator"],
        links: ["creates", "gets", "signs", "pays", "alerts"],
      },
      glossary: {
        title: "Glossary",
        caption: "Four words from the project's glossary.",
        terms: [
          { term: "Onboarding", text: "The moment a student is ready to start: with access, contract and welcome." },
          { term: "Operator", text: "The team member who gets the alerts and approves anything sensitive." },
          { term: "Instalment", text: "Each of the parts the course is paid in." },
          { term: "Alert", text: "A message to the operator when something needs a person." },
        ],
      },
      decision: {
        title: "A decision in writing",
        caption: "A real decision, summarised.",
        decision: "Two WhatsApp channels, one per audience.",
        why: "Alerts for the team and messages for students never mix.",
        status: "Status: accepted",
      },
    },
    built: {
      title: "What we built",
      text: [
        "The system takes every sale and does, in order, everything the owner used to do. Each step triggers the next. If one fails, it tries again, and if it keeps failing it alerts a person.",
        "Below is the plan of that route, what a day of the system looks like, and the real workflow, inside.",
      ],
      screen: {
        alt: "Phone screen \"Alta de alumno\" (new student): sale recorded, welcome email sent, platform access activated, contract sent for signature and WhatsApp notice, each ticked with its time, ending in \"Alumno listo para empezar\" (student ready to start).",
        caption: "Every new student, set up with nobody touching a thing. Illustrative screen.",
      },
    },
    around: {
      title: "And what runs around it",
      text: [
        "The sale was the first step. Other repeated tasks followed: instalments, reports, following up each student and finding work opportunities for them.",
        "The owner doesn't have to open any system: whatever needs their go-ahead reaches them on WhatsApp, and they approve it from there.",
      ],
      plan: {
        title: "Plan of what runs on its own",
        caption: "The parts of the system, in plain words.",
        plots: [
          { title: "Instalments", text: "Every day it checks the instalments and sends the reminders to whoever is due." },
          { title: "Diagnostic", text: "Each student answers a diagnostic: the system places them on four axes, gives them a profile and builds a 15-day plan." },
          { title: "Opportunities", text: "It gathers the job offers posted in the community, sorts their details and sends a daily summary." },
          { title: "Ads report", text: "Every week the campaign summary arrives on its own." },
          { title: "Operator's assistant", text: "The operator asks it for things on WhatsApp; anything sensitive waits for their approval." },
        ],
      },
      contract: {
        title: "The contract, day by day",
        caption: "If nobody signs, the system doesn't forget.",
        days: [
          { day: "Day 0", text: "The contract goes out to sign." },
          { day: "Day 2", text: "First reminder to the student." },
          { day: "Day 5", text: "Second reminder." },
          { day: "Day 7", text: "Alert to the operator." },
        ],
      },
    },
    care: {
      title: "How it is checked and kept running",
      text: [
        "A system that works on its own has to speak up when something goes wrong. A health check goes over the server point by point: every service running, the automations loaded, backups in place and WhatsApp connected.",
        "The system has its own automatic tests, every change is reviewed before it goes in, and a check makes sure no password is written where it shouldn't be. There are server backups, and restoring one is automated too.",
        "Some automations stay switched off until their check passes: better that something doesn't run than that it runs wrong.",
      ],
      health: {
        title: "Server health check",
        caption: "A few of the checks, in plain words.",
        checks: ["Every service is running", "The automations are loaded", "Backups exist", "WhatsApp is connected"],
      },
      change: {
        title: "Every change",
        caption: "How a change gets into the system.",
        states: ["Proposed", "Reviewed", "Merged and on record"],
      },
    },
    outcome: {
      title: "Where it stands",
      text: [
        "There are no usage metrics to show, and I won't make them up. What I can show is what runs on its own today, every day, without the owner stepping in.",
      ],
      runs: "What runs on its own today",
      runsCaption: "Every day, without the owner stepping in.",
      size: [
        "To give a sense of size: there are 12 automatic workflows, each a chain of 3 to 40 steps.",
        "There are 24 decisions written down with their reasons, like the one about the two channels.",
        "And the health check goes over 27 points on the server.",
      ],
    },
  },
};

export const padelStory: Record<Lang, PadelStory> = {
  es: {
    imageAlt: "Cancha de pádel vacía al aire libre, con piso azul, paredes de vidrio y dos pelotas junto al vidrio.",
    before: {
      title: "Lo que había y lo que hacía falta",
      caption: "Resumen del primer relevamiento.",
      was: "El prototipo anterior",
      now: "Lo que el club necesitaba",
      rows: [
        { was: "Solo pádel", now: "Pádel y fútbol" },
        { was: "Datos guardados en una sola compu", now: "Online, en el celular y en la compu" },
        { was: "Dos tipos de usuario", now: "Seis roles que se combinan" },
        { was: "Sin stock, insumos ni quincho", now: "Stock, pedidos de insumos y reservas" },
        { was: "Sin historial", now: "Un historial que no se borra" },
      ],
    },
    analysis: {
      title: "Cómo lo analizamos",
      text: [
        "Primero, una encuesta a tres perfiles del club. Cada pregunta se respondía del 1 al 5, para ver dónde dolía más.",
        "Con las respuestas armé el modelo del club: qué cosas existen (alumnos, clases, áreas, turnos), cómo se relacionan y qué reglas no se pueden romper. Las reglas quedaron escritas en palabras del club, y un glosario fija qué quiere decir cada palabra y cuáles evitar.",
        "Después, cada cosa que el sistema tenía que hacer quedó escrita como un pedido concreto, con sus pruebas.",
      ],
      survey: {
        title: "La encuesta",
        caption: "La forma de la encuesta. Las respuestas no se muestran.",
        profiles: ["Dirección y administración", "Profesores", "Familias del programa infantil"],
        low: "Nada",
        high: "Mucho",
      },
      rules: {
        title: "Reglas del club",
        caption: "Cuatro de las siete reglas, en palabras simples.",
        items: [
          "Cada chico del programa infantil tiene al menos un tutor responsable.",
          "Una cuota está al día o pendiente: no hay pagos a medias.",
          "Cualquiera de los profesores de una clase puede tomar asistencia.",
          "Pasar del programa infantil a adultos lo decide solo la administración.",
        ],
      },
      glossary: {
        title: "Glosario",
        caption: "Tres entradas del glosario del club.",
        avoid: "Evitar:",
        terms: [
          { term: "Área operativa", text: "Pádel o fútbol: cada una con sus comunicados, incidencias, limpieza, stock y pedidos.", avoid: "sección, sector, módulo" },
          { term: "Turno", text: "La franja del día en que se completa la lista de limpieza de un área.", avoid: "horario, franja" },
          { term: "Registro de completado", text: "La constancia de que una tarea se hizo, en qué turno, por quién y a qué hora.", avoid: "tilde, check" },
        ],
      },
    },
    built: {
      title: "Lo que construimos",
      text: [
        "Un solo sistema con seis roles, y una persona puede tener más de uno, como un profesor que además es encargado de pádel. Para entrar, cada uno recibe una invitación que vence a las 24 horas.",
        "El stock se calcula con cada entrada y salida, y avisa cuando algo está por agotarse. Los pedidos de insumos siguen siempre los mismos pasos, y el quincho no acepta reservas que se pisen.",
      ],
      roles: {
        title: "Plano del sistema, por partes",
        caption: "Los roles y las partes del sistema. Plano simplificado.",
        plots: [
          { title: "Seis roles que se combinan", text: "Administrador, profesor, encargado de pádel, encargado de fútbol, encargado del programa infantil y personal de limpieza." },
          { title: "Clases", text: "Con uno o más profesores, cupo y asistencia, una evaluación técnica del 1 al 10 y una nota mensual." },
          { title: "Áreas de pádel y fútbol", text: "Comunicados, incidencias y la lista de limpieza de cada turno." },
          { title: "Stock y pedidos", text: "Un saldo que sale de cada entrada y salida, con aviso de stock bajo, y pedidos de insumos." },
          { title: "Quincho", text: "Un calendario que no acepta reservas que se pisen." },
          { title: "Programa infantil", text: "Cada chico con sus tutores, y su cuota del mes al día o pendiente." },
        ],
      },
      supply: {
        title: "Un pedido de insumos",
        caption: "Siempre los mismos pasos, para todos.",
        steps: ["Pendiente", "Recibido", "En proceso", "Cumplido"],
        ends: "O termina antes:",
        endStates: ["Rechazado", "Cancelado"],
      },
      grill: {
        title: "El quincho, en una semana",
        caption: "Semana de ejemplo, con datos inventados.",
        days: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
        booked: "Reservado",
        rejected: "Tercera reserva: rechazada",
        legend: "Hasta dos reservas por día. La tercera se rechaza, para cualquier rol.",
      },
    },
    care: {
      title: "Cómo se controla",
      text: [
        "Las partes del sistema se construyeron con sus propias pruebas automáticas, y corren solas antes de publicar: si una falla, el cambio no sale.",
        "Los permisos de cada rol los controla el sistema por dentro, no solo la pantalla: lo que un rol no puede ver, no le llega.",
        "Y lo importante queda en un historial que no se borra ni se edita: quién cambió qué, y cuándo.",
      ],
      checks: {
        title: "Antes de publicar",
        caption: "Lo que se controla, en palabras simples.",
        items: [
          "Las pruebas corren solas antes de publicar",
          "Si una prueba falla, no se publica",
          "Los permisos de cada rol, controlados por dentro",
          "Cada cambio queda en el historial",
        ],
      },
    },
    outcome: {
      title: "Cómo terminó",
      text: [
        "El 17/09/2026 le mostramos el sistema al club y la demo quedó aprobada. En la misma reunión pidieron dos cambios: que la lista de limpieza se reinicie por turno, para saber qué se hizo en cada uno, y que el quincho acepte como máximo dos reservas por día.",
        "Ese mismo día los dos cambios quedaron escritos en la especificación, en el glosario y en una decisión de diseño. Las reservas de las canchas siguen en el sistema que el club ya usaba: quedaron afuera a propósito.",
      ],
      runs: "El resultado",
      runsCaption: "Lo que quedó escrito después de la demo.",
      decision: {
        title: "La decisión de ese día",
        caption: "La primera decisión escrita del proyecto, resumida.",
        decision: "La limpieza se registra por turno.",
        context: "Cada tarea hecha deja una constancia: en qué turno, por quién y a qué hora. Así el historial de cada turno sale solo, y nada depende de que alguien abra el sistema a la hora justa.",
        optionsTitle: "Opciones descartadas",
        options: ["Una tilde que se borra al cambiar de turno: pierde el historial.", "Copiar la lista entera en cada turno: duplica las tareas."],
        consequence: "Un turno cerrado ya no se corrige: lo que se hizo, queda.",
        status: "Aceptada el 17/09/2026",
      },
    },
  },
  en: {
    imageAlt: "Empty outdoor padel court with a blue floor, glass walls and two balls by the glass.",
    before: {
      title: "What there was and what was needed",
      caption: "Summary of the first survey.",
      was: "The earlier prototype",
      now: "What the club needed",
      rows: [
        { was: "Padel only", now: "Padel and football" },
        { was: "Data kept on one computer", now: "Online, on phone and computer" },
        { was: "Two kinds of user", now: "Six roles that combine" },
        { was: "No stock, supplies or barbecue", now: "Stock, supply requests and bookings" },
        { was: "No history", now: "A history that can't be erased" },
      ],
    },
    analysis: {
      title: "How we analysed it",
      text: [
        "First, a survey of three groups at the club. Every question was answered from 1 to 5, to see where it hurt most.",
        "With the answers I built the club's model: what exists (students, classes, areas, shifts), how it relates and which rules can't be broken. The rules were written in the club's own words, and a glossary fixes what each word means and which ones to avoid.",
        "Then everything the system had to do was written as a concrete request, with its tests.",
      ],
      survey: {
        title: "The survey",
        caption: "The shape of the survey. The answers are not shown.",
        profiles: ["Management", "Coaches", "Kids' programme families"],
        low: "Not at all",
        high: "A lot",
      },
      rules: {
        title: "The club's rules",
        caption: "Four of the seven rules, in plain words.",
        items: [
          "Every child in the kids' programme has at least one responsible guardian.",
          "A fee is either paid or pending: no partial payments.",
          "Any of a class's coaches can take attendance.",
          "Moving from the kids' programme to adults is decided by management only.",
        ],
      },
      glossary: {
        title: "Glossary",
        caption: "Three entries from the club's glossary.",
        avoid: "Avoid:",
        terms: [
          { term: "Operating area", text: "Padel or football: each with its notices, incidents, cleaning, stock and requests.", avoid: "section, sector, module" },
          { term: "Shift", text: "The part of the day when an area's cleaning checklist is done.", avoid: "schedule, slot" },
          { term: "Completion record", text: "The proof that a task was done, in which shift, by whom and at what time.", avoid: "tick, check" },
        ],
      },
    },
    built: {
      title: "What we built",
      text: [
        "One system with six roles, and a person can hold more than one, like a coach who also runs the padel area. To get in, everyone receives an invitation that expires after 24 hours.",
        "Stock is worked out from every item in and out, and it warns when something is about to run out. Supply requests always follow the same steps, and the barbecue area never takes overlapping bookings.",
      ],
      roles: {
        title: "Plan of the system, by part",
        caption: "The roles and the parts of the system. Simplified plan.",
        plots: [
          { title: "Six roles that combine", text: "Administrator, coach, padel manager, football manager, kids' programme manager and cleaning staff." },
          { title: "Classes", text: "With one or more coaches, capacity and attendance, a technical score from 1 to 10 and a monthly note." },
          { title: "Padel and football areas", text: "Notices, incidents and each shift's cleaning checklist." },
          { title: "Stock and requests", text: "A balance worked out from every item in and out, with low-stock alerts, and supply requests." },
          { title: "Barbecue area", text: "A calendar that never takes overlapping bookings." },
          { title: "Kids' programme", text: "Each child with their guardians, and their monthly fee up to date or pending." },
        ],
      },
      supply: {
        title: "A supply request",
        caption: "Always the same steps, for everyone.",
        steps: ["Pending", "Received", "In progress", "Done"],
        ends: "Or it ends early:",
        endStates: ["Rejected", "Cancelled"],
      },
      grill: {
        title: "The barbecue area, over a week",
        caption: "A sample week, with made-up data.",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        booked: "Booked",
        rejected: "Third booking: rejected",
        legend: "Up to two bookings a day. A third is rejected, whatever the role.",
      },
    },
    care: {
      title: "How it is checked",
      text: [
        "The parts of the system were built with their own automatic tests, and they run on their own before publishing: if one fails, the change doesn't go out.",
        "Each role's permissions are enforced inside the system, not just on screen: what a role can't see never reaches it.",
        "And what matters stays in a history that can't be erased or edited: who changed what, and when.",
      ],
      checks: {
        title: "Before publishing",
        caption: "What gets checked, in plain words.",
        items: ["The tests run on their own before publishing", "If a test fails, nothing is published", "Each role's permissions, enforced inside", "Every change stays in the history"],
      },
    },
    outcome: {
      title: "How it ended",
      text: [
        "On 17/09/2026 we showed the system to the club and the demo was approved. In the same meeting they asked for two changes: that the cleaning checklist resets every shift, to know what was done in each, and that the barbecue area takes at most two bookings a day.",
        "That same day both changes were written into the specification, the glossary and a design decision. Court bookings stay in the system the club already used: they were left out on purpose.",
      ],
      runs: "The result",
      runsCaption: "What was written down after the demo.",
      decision: {
        title: "That day's decision",
        caption: "The project's first written decision, summarised.",
        decision: "Cleaning is recorded per shift.",
        context: "Every task done leaves a record: which shift, by whom and at what time. That way each shift's history comes for free, and nothing depends on someone opening the system at the right moment.",
        optionsTitle: "Options set aside",
        options: ["A tick that clears when the shift changes: it loses the history.", "Copying the whole checklist into every shift: it duplicates the tasks."],
        consequence: "A closed shift can't be edited afterwards: what was done, stays.",
        status: "Accepted on 17/09/2026",
      },
    },
  },
};
