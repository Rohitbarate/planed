const baseUrl = process.env.REACT_APP_BASEURL || 'https://todoapp-api-16rf.onrender.com/data/v1';

const getNotes = async (token) => {
  try {
    const res = await fetch(`${baseUrl}/note/getnotes`, {
      method: "GET",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("frontend error : ", error);
  }
};

const addNotes = async (token, note) => {
  // const {title,description,label,deadLine} = note
  try {
    const res = await fetch(`${baseUrl}/note/create`, {
      method: "PUT",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("frontend error : ", error);
  }
};

const deleteNote = async (token, noteId) => {
  const res = await fetch(`${baseUrl}/note/delete/${noteId}`, {
    method: "PUT",
    headers: {
      "auth-token": token,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

const editNote = async (token, noteId, updatedNote) => {
  const res = await fetch(`${baseUrl}/note/update/${noteId}`, {
    method: "PUT",
    headers: {
      "auth-token": token,
      "Content-Type": "application/json",
    },
    body:JSON.stringify(updatedNote)
  });
  const data = await res.json();
  return data;
};

export { getNotes, addNotes, deleteNote, editNote };
