import React, { useEffect, useState, useRef } from "react";
import { Typography, TextField, Paper, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import anime from "animejs";

//
import addNote from "../utilities/addNote";
//

const PaperBox = styled(Paper)(({ theme }) => ({
  marginTop: "2em",
  padding: "1em",
  marginRight: "auto",
  marginLeft: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "50%",
  },
}));

const NotesTextInputBox = (props) => {
  const { refetchNotes } = props;
  // input state
  const [noteInputValue, setNoteInputValue] = useState("");
  const handleNoteInputChange = (event) =>
    setNoteInputValue(event.target.value);
  //

  // message state
  const [message, setMessage] = useState({ value: null });
  const messageRef = useRef(null);
  //

  // adding note
  const handleAddNote = async () => {
    if (noteInputValue) {
      try {
        await addNote(noteInputValue);
        setNoteInputValue("");
        setMessage({ type: "success", value: "Note added." });
        refetchNotes();
      } catch (error) {
        setMessage({
          type: "error",
          value: `Error while adding note: ${error}`,
        });
      }
    } else {
      setMessage({ type: "erorr", value: "Empty note cannot be added." });
    }
  };
  //

  // message cleanup function
  useEffect(() => {
    const messageCleanupFunction = setInterval(async () => {
      if (message.value !== null) {
        const messageHideAnimation = anime({
          targets: messageRef.current,
          opacity: 0,
          duration: 3000,
          easing: "linear",
        });
        try {
          await messageHideAnimation.finished;
          setMessage({ value: null });
        } catch (error) {
          console.log(error);
        }
      }
    }, 4000);
    return () => clearInterval(messageCleanupFunction);
  });
  //

  return (
    <PaperBox>
      <Typography variant="h4" sx={{ fontSize: "1rem" }}>
        Add your Note:
      </Typography>
      <TextField
        id="note-text-field"
        label="Note"
        multiline
        fullWidth
        rows={2}
        value={noteInputValue}
        onChange={handleNoteInputChange}
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
        sx={{ marginTop: "1em", display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ marginLeft: "auto" }}
          onClick={handleAddNote}
        >
          Add
        </Button>
      </Box>
      {message.value ? (
        <Typography
          ref={messageRef}
          variant="subtitle"
          sx={{
            marginTop: "1em",
            fontWeight: 500,
            color: (theme) =>
              message.type === "info"
                ? theme.palette.info.main
                : message.type === "error"
                ? theme.palette.error.main
                : message.type === "success"
                ? theme.palette.success.main
                : theme.palette.error.main,
          }}
        >
          {message.value}
        </Typography>
      ) : null}
    </PaperBox>
  );
};

export default NotesTextInputBox;
