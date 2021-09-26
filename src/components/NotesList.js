import { Typography, Paper } from "@mui/material";
import { Box, styled } from "@mui/system";
import React from "react";

//
import Note from "./Note";
//

const NotesListMessagePaper = styled(Paper)(({ theme }) => ({
  marginTop: "1em",
  minHeight: 200,
  padding: "1em",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const NotesListSuccessBox = styled(Box)(({ theme }) => ({
  marginTop: "1em",
  padding: "1em",
  display: "flex",
  flexDirection: "column",
  gap: "1em",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "60%",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const NotesList = (props) => {
  let { notesFetchStatus, notesFetchError, notesList, refetchNotes } = props;

  if (notesFetchStatus === "success") {
    return (
      <NotesListSuccessBox>
        {notesList.map((note) => (
          <Note note={note} refetchNotes={refetchNotes} key={note.id}></Note>
        ))}
      </NotesListSuccessBox>
    );
  }

  if (notesFetchStatus === "error") {
    return (
      <NotesListMessagePaper>
        <Typography variant="h4" sx={{ fontSize: "1.5rem" }}>
          {notesFetchError}
        </Typography>
      </NotesListMessagePaper>
    );
  }

  return null;
};

export default NotesList;
