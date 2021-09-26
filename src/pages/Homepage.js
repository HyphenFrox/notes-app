import React from "react";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";

//
import NotesTextInputBox from "../components/NotesTextInputBox";
import NotesList from "../components/NotesList";
import useFetchNotes from "../utilities/useFetchNotes";
//

const App = styled("div")(({ theme }) => ({
  minHeight: "100%",
  padding: "0.5em",
  [theme.breakpoints.up("sm")]: {
    padding: "1em",
  },
}));

function Homepage() {
  const { notesFetchStatus, notesFetchError, notesList, refetchNotes } =
    useFetchNotes();

  return (
    <App>
      <Typography variant="h1" align="center" sx={{ fontSize: "2rem" }}>
        Notes App
      </Typography>
      <NotesTextInputBox refetchNotes={refetchNotes}></NotesTextInputBox>
      <NotesList
        notesFetchStatus={notesFetchStatus}
        notesFetchError={notesFetchError}
        notesList={notesList}
        refetchNotes={refetchNotes}
      ></NotesList>
    </App>
  );
}

export default Homepage;
