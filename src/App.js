import React from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { amber, teal } from "@mui/material/colors";
import localforage from "localforage";

//
import Homepage from "./pages/Homepage";
//

localforage.config({
  name: "Notes App",
});

function App() {
  const appTheme = createTheme({
    palette: {
      primary: {
        main: teal["A400"],
      },
      secondary: {
        main: amber["A700"],
      },
      background: {
        default: teal["A400"],
      },
    },
    typography: {
      fontFamily: '"Glory", sans-serif',
    },
  });
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline></CssBaseline>
      <Homepage></Homepage>
    </ThemeProvider>
  );
}

export default App;
