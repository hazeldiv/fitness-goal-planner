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
          backgroundColor: "#F5F7F6",
          borderRadius: 5,
          "--tw-drop-shadow":
            "drop-shadow(0 4px 3px rgb(0 0 0 / 0.2)) drop-shadow(0 0 24px rgb(0 0 0 / 0.2))",
          filter: "var(--tw-drop-shadow)",
          boxShadow: "none",
        },
      },
    },
  },
  palette: {
    //   mode: "dark",
    //   primary: {
    //     main: "#4FC3F7", // soft cyan-blue accent
    //   },
    //   background: {
    //     default: "#0E0F13", // dark space background
    //     paper: "#161A22", // card surface
    //   },
    text: {
      primary: "#026345",
      // secondary: "#A1A1AA",
    },
    // },
    // shape: {
    //   borderRadius: 10,
  },
});

export default theme;
