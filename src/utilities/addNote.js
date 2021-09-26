import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";

const addNote = async (note) => {
  try {
    const newNoteObject = {
      id: uuidv4(),
      value: note,
      creationTime: new Date(),
    };
    let notesList = await localforage.getItem("notesList"); // get curent notes list

    if (notesList === null) {
      // if there is no notes list on the machine
      notesList = await localforage.setItem("notesList", []); // initialize the notesList
    }

    notesList.unshift(newNoteObject); // add the new note

    notesList = await localforage.setItem("notesList", notesList); // update the notesList
    return notesList;
  } catch (error) {
    throw new Error(` Error while adding note: ${error}`);
  }
};

export default addNote;
