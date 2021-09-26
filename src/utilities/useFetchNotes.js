import { useEffect, useState } from "react";
import localforage from "localforage";

const useFetchNotes = () => {
  const [notesFetchStatus, setNotesFetchStatus] = useState("fetching");
  const [notesFetchError, setNotesFetchError] = useState(false);
  const [notesList, setNotesList] = useState(null);
  const [refetchObject, setRefetchObject] = useState({});

  async function fetchNotes() {
    try {
      setNotesFetchStatus("fetching");
      let notesList = await localforage.getItem("notesList"); // get curent notes list

      if (notesList === null) {
        // if there is no notes list on the machine
        notesList = await localforage.setItem("notesList", []); // initialize the notesList
      }

      setNotesList(notesList); // change notesList state
      setNotesFetchStatus("success"); // change notesList fetch state
    } catch (error) {
      setNotesFetchError(new Error(`Error while fetching notes: ${error}`));
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [refetchObject]);

  function refetchNotes() {
    setRefetchObject({});
  }

  return { notesFetchStatus, notesFetchError, notesList, refetchNotes };
};

export default useFetchNotes;
