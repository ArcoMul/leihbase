export default defineI18nConfig(() => ({
  legacy: false,
  locale: "de",
  messages: {
    en: {
      opening_hours: {
        monday: "Monday",
        tuesday: "Tuesday",
        wednesday: "Wednesday",
        thursday: "Thursday",
        friday: "Friday",
        saturday: "Saturday",
        sunday: "Sunday",
        hour: "",
      },
    },
    de: {
      opening_hours: {
        monday: "Montags",
        tuesday: "Dienstags",
        wednesday: "Mittwochs",
        thursday: "Donnerstags",
        friday: "Freitags",
        saturday: "Samstags",
        sunday: "Sonntags",
        hour: "Uhr",
      },
    },
  },
}));
