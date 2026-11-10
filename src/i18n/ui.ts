export const languages = { es: "Español", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "es";

export const ui = {
  es: {
    "site.title": "Lautaro Guebel — Sistemas web y automatización",
    "site.description": "Lautaro Guebel, estudiante de Ingeniería en Sistemas (UTN FRT). Ordeno tu negocio con sistemas web y automatizaciones a medida.",
    "nav.home": "Inicio",
    "nav.work": "Casos",
    "nav.contact": "Contacto",
    "nav.switch": "English",
    "hero.line": "Estudiante de Ingeniería en Sistemas (UTN FRT) que hace sistemas web para clientes reales.",
    "contact.email": "Escribime por email",
    "footer.text": "© Lautaro Guebel",
  },
  en: {
    "site.title": "Lautaro Guebel — Web systems and automation",
    "site.description": "Lautaro Guebel, Systems Engineering student (UTN FRT). I put your business in order with custom web systems and automations.",
    "nav.home": "Home",
    "nav.work": "Work",
    "nav.contact": "Contact",
    "nav.switch": "Español",
    "hero.line": "Systems Engineering student (UTN FRT) who builds web systems for real clients.",
    "contact.email": "Email me",
    "footer.text": "© Lautaro Guebel",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type UiKey = keyof (typeof ui)[typeof defaultLang];

export function t(lang: Lang, key: UiKey): string {
  return ui[lang][key];
}

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  return segment && segment in ui ? (segment as Lang) : defaultLang;
}
