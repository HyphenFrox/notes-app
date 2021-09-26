import localforage from "localforage";

const deleteNote = async (id) => {
  try {
    let notesList = await localforage.getItem("notesList"); // fetch the notesList

    // find index of the item to be removed
    const indexOfItemToBeRemoved = notesList.findIndex(
      (note) => note.id === id
    );

    //create a new array without the note
    let newNotesList = [];
    notesList.forEach((...args) => {
      const [note, index] = args;
      if (index !== indexOfItemToBeRemoved) {
        newNotesList.push(note);
      }
    });
    //

    notesList = await localforage.setItem("notesList", newNotesList); // finally push
    return notesList;
  } catch (error) {
    throw new Error(`Error while deleting note: ${error}`);
  }
};

export default deleteNote;
