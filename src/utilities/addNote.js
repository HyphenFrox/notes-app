import localforage from "localforage";

const addNote = async (note) => {
  let notesList;

  try {
    notesList = await localforage.getItem("notesList"); // get curent notes list

    if (notesList === null) {
      // if there is no notes list on the machine
      await localforage.setItem("notesList", []);
      notesList = await localforage.getItem("notesList");
    }

    notesList.unshift(note);

    await localforage.setItem("notesList", notesList);
    notesList = await localforage.getItem("notesList");
    return notesList;
  } catch (error) {
    throw new Error(` Error while adding note: ${error}`);
  }
};

export default addNote;
