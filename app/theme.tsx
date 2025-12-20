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
          backgroundColor: "background.paper",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          borderRadius: 3,
        },
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#4FC3F7", // soft cyan-blue accent
    },
    background: {
      default: "#0E0F13", // dark space background
      paper: "#161A22", // card surface
    },
    text: {
      primary: "#EAEAF0",
      secondary: "#A1A1AA",
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
