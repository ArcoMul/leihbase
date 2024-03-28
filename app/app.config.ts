import leihbarConfig from "./leihbar.config";

const isLeihbar = process.env.IS_LEIHBAR === "true";

export default defineAppConfig({
  ...{
    name: "Leihapp",
    logoText: "Leihapp",
    theme: {
      colors: {
        bg: {
          primary: "#0d79f2",
          secondary: "#feddc1",
        },
        cta: "#0d79f2",
      },
    },
  },
  ...(isLeihbar ? leihbarConfig : {}),
});
