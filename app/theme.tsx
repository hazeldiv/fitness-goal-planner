import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  // palette: {
  //   primary: {
  //     main: "#000",
  //   },
  // },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          "--tw-drop-shadow":
            "drop-shadow(0 4px 10px rgb(0 0 0 / 0.12)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.1))",
          filter: "var(--tw-drop-shadow)",
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
