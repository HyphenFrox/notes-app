import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

//
import NotesTextInputBox from "../components/NotesTextInputBox";
//

const App = styled("div")(({ theme }) => ({
  minHeight: "100%",
  padding: "0.5em",
  [theme.breakpoints.up("sm")]: {
    padding: "1em",
  },
}));

function Homepage() {
  return (
    <App>
      <Typography variant="h1" align="center" sx={{ fontSize: "2rem" }}>
        Notes App
      </Typography>
      <NotesTextInputBox></NotesTextInputBox>
    </App>
  );
}

export default Homepage;
