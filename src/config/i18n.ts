import i18n from "i18n";

i18n.configure({
  locales: ["en", "ru"],
  directory: __dirname + "/../locales",
  defaultLocale: "en",
  queryParameter: "lang",
  autoReload: true,
  updateFiles: true,
  syncFiles: true,
  cookie: "lang",
});

export default i18n;
