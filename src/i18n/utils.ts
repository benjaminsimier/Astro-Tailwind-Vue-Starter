import { ui, defaultLang } from "./ui";

const config = {
  defaultLang: import.meta.env.PUBLIC_DEFAULT_LANG,
};

export function getLangFromUrl(url: URL) {
  let lang = defaultLang;
  
  const parts = url.pathname.split("/").filter(Boolean); // Filter out empty strings
  
  if (parts.length > 0) {
    const potentialLang = parts[0];
    if (potentialLang in ui) {
      lang = potentialLang;
    }
  }

  return lang as keyof typeof ui;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof lang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getRoute(lang: keyof typeof ui, link: string) {
  let defaultLang = config.defaultLang;

  let route = "/" + lang + "/" + link;
  if (lang === defaultLang) {
    route = "/" + link;
  }
  return route;
}
