import localforage from "localforage";

const updateNote = async (id, note) => {
  try {
    let notesList = await localforage.getItem("notesList"); // get curent notes list

    notesList[notesList.findIndex((note) => note.id === id)].value = note; // find and replace the note
    notesList[notesList.findIndex((note) => note.id === id)].updateTime =
      new Date(); // add an update time

    notesList = await localforage.setItem("notesList", notesList); // update the notesList
    return notesList;
  } catch (error) {
    throw new Error(` Error while updating note: ${error}`);
  }
};

export default updateNote;
