// https://docs.astro.build/fr/recipes/i18n/
import fr_FR from "../locales/fr-FR.json";
import en_US from "../locales/en-US.json";

import frFlag from "@assets/images/flagFrSquare.svg";
import enFlag from "@assets/images/flagUsSquare.svg";

const config = {
  defaultLang: import.meta.env.PUBLIC_DEFAULT_LANG,
};

let langList = {};

let lang = config.defaultLang || "en";

langList = {
  fr: { 
    code: "fr", 
    name: "Français",
    flag: frFlag || ''
  },
  en: { 
    code: "en", 
    name: "English",
    flag: enFlag || ''
  },
};

export const defaultLang = lang;

export const languages = langList;

export const ui = {
  fr: fr_FR,
  en: en_US,
} as const;
