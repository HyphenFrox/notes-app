import React, { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";

// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
//

//
import deleteNote from "../utilities/deleteNote";
import updateNote from "../utilities/updateNote";
//

const Note = (props) => {
  const { note, refetchNotes } = props;

  const [displayMode, setDisplayMode] = useState("view");
  const [noteInputValue, setNoteInputValue] = useState(note.value);

  // edit note
  const handleEditNote = () => {
    setDisplayMode("edit");
  };
  //

  // cancel edited changes
  const handleCancelChanges = () => setDisplayMode("view");
  //

  // save edited changed
  const handleSaveChanges = async () => {
    try {
      await updateNote(note.id, noteInputValue);
      setNoteInputValue("");
      refetchNotes();
    } catch (error) {
      console.log(error);
    }
  };
  //

  // handle note input
  const handleNoteInputValueChange = (event) =>
    setNoteInputValue(event.target.value);
  //

  // delete note
  const handleDeleteNote = async () => {
    try {
      await deleteNote(note.id);
      refetchNotes();
    } catch (erorr) {
      console.log(erorr);
    }
  };
  //

  if (displayMode === "view") {
    return (
      <Paper
        sx={{
          padding: "1em",
          fontFamily: "'Shadows Into Light', cursive",
          fontSize: "1rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'Shadows Into Light', cursive",
            fontSize: "2rem",
          }}
        >
          {note.value}
        </Typography>
        <Box
          sx={{
            marginTop: "1em",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1em",
          }}
        >
          <Button
            color="primary"
            startIcon={<EditIcon></EditIcon>}
            onClick={handleEditNote}
          >
            EDIT
          </Button>
          <Button
            startIcon={<DeleteIcon></DeleteIcon>}
            sx={{ color: (theme) => theme.palette.warning.main }}
            onClick={handleDeleteNote}
          >
            DELETE
          </Button>
        </Box>
      </Paper>
    );
  }

  if (displayMode === "edit") {
    return (
      <Paper
        sx={{
          padding: "1em",
          fontFamily: "'Shadows Into Light', cursive",
          fontSize: "1rem",
        }}
      >
        <TextField
          id="note-text-edit-field"
          label="Edit Note"
          multiline
          fullWidth
          rows={2}
          value={noteInputValue}
          onChange={handleNoteInputValueChange}
          sx={{
            marginTop: "1em",
          }}
          InputProps={{
            sx: {
              fontFamily: "'Shadows Into Light', cursive",
              fontSize: "1.5rem",
            },
          }}
        />
        <Box
          sx={{
            marginTop: "1em",
            display: "flex",
            justifyContent: "flex-end",
            padding: "1em",
            gap: "1em",
          }}
        >
          <Button
            variant="outlined"
            startIcon={<CancelIcon></CancelIcon>}
            onClick={handleCancelChanges}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<DoneIcon></DoneIcon>}
            onClick={handleSaveChanges}
          >
            Save
          </Button>
        </Box>
      </Paper>
    );
  }
};

export default Note;
