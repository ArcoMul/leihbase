export default defineI18nConfig(() => ({
  legacy: false,
  locale: "de",
  messages: {
    en: {
      welcome: "Welcome",
      signup: {
        pageTitle: "Sign up",
        title: "Sign up",
        name: "Name",
        email: "E-Mail",
        password: "Password",
        submit: "Sign up",
        errors: {
          passwordLength: "Password should be at least 8 characters long.",
          invalidEmail: "E-mail address is invalid or already in use.",
          general: "An error occured during sign up, please try again.",
        },
      },
    },
    de: {
      welcome: "Wilkommen",
      signup: {
        pageTitle: "Registrieren",
        title: "Registrieren",
        name: "Name",
        email: "E-Mail",
        password: "Kennwort",
        submit: "Registrieren",
        errors: {
          passwordLength:
            "Dein Passwort sollte mindestens 8 Zeichen lang sein.",
          invalidEmail: "Die E-Mail ist ungültig oder wird bereits verwendet.",
          general:
            "Beim Erstellen deiner Account ist ein Fehler aufgetreten, bitte versuche es erneut.",
        },
      },
    },
  },
}));
