import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Index from "./components/Index";

// Objectives:
// 1. How do I connect my backend to my frontend?
// A: [package.json]-> 'proxy:'
//ie: Fetch/Axios to server (localhost3000)
// 2.CRUD functionality on Notes

function App() {
  const [notes, setNotes] = useState([]);

  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: "",
  });
  // * Remember: each item we are updating has a unique _id:
  // --------------------------------[State]

  // --------------------------------[Create]
  const createNote = async (e) => {
    e.preventDefault();
    // 1. Create Note
    const res = await axios.post("/api/notes", createForm);
    console.log(res);
    // Axios Req -> POST (formData => {state})
    setNotes(() => [...notes, res.data.note]);
    // This adds the new note to the rest of existing notes in db.
  };
  const updateCreateFormField = (e) => {
    const { value, name } = e.target;
    console.log({ name, value });
    // setState to vals() targeted in form

    // Clear Form
    setCreateForm(() => ({
      ...createForm,
      [name]: value,
      // title:  newValue
      // body: otherNewVal
    }));
    console.log("form cleared.");
  };
  // Allow us to populate inputs and save their data

  // --------------------------------[Read]
  const fetchNotes = async () => {
    // 1. Make a Request to server
    const response = await axios({
      method: "get",
      url: "/api/notes",
    });
    // app.get(/notes){}

    const info = await response.data;
    // console.log(info);

    // 2. Set State
    setNotes(info.notes);
    console.log("-Notes Fetched-");
  };
  // --------------------------------[Update]
  const handleUpdateFieldChange = (e) => {
    // 1. Destructure event target
    const { value, name } = e.target;
    // 2. set State
    setUpdateForm(() => ({
      ...updateForm,
      [name]: value,
    }));
  };
  // Capture the event target value and set it to state (updateForm)

  const updateNote = async (e) => {
    e.preventDefault();
    const { title, body } = updateForm;
    // ----> Get title and body from the updateForm and Destructure
    const res = await axios.put(
      `/api/notes/${updateForm._id}`,
      { title, body }
    );
    console.log(res);

    // Update State
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id;
      // Find note by index and see if they match
    });
    newNotes[noteIndex] = res.data.note;
    setNotes(newNotes);

    // Clear Form
    setUpdateForm(() => ({
      _id: null,
      title: "",
      body: "",
    }));
  };

  const toggleUpdate = (note) => {
    console.log("CurrentNote :", note);
    setUpdateForm({
      _id: note._id,
      title: note.title,
      body: note.body,
    });
  };
  // --------------------------------[Delete]

  const deleteNote = (_id) => {
    // 1.Find Note -> Delete
    const res= axios.delete(`/api/notes/${_id}`);
    // 2. Update
    const newNotes = [...notes].filter((note)=>{
      return note._id !== _id
    })
    setNotes(newNotes)
  };

  useEffect(() => {
    fetchNotes();
  }, []);
  // --------------------------------[useEffect]
  return (
    <div className="App">
      {/* FormContainer */}
      <div className="formContainer">
        <div className="formAdmin">
          <h1>+New Note</h1>
          <form onSubmit={createNote}>
            <input
              name="title"
              value={createForm.title}
              placeholder="Enter Title"
              onChange={updateCreateFormField}
            />
            <textarea
              name="body"
              value={createForm.body}
              placeholder="Enter Body"
              onChange={updateCreateFormField}
            />

            <button type="submit">Submit</button>
          </form>
        </div>
        <hr />
        {updateForm._id && (
          <>
            {/* --------Update Form */}
            <div className="formAdmin">
              <h1>+Update Note</h1>
              <form onSubmit={updateNote}>
                <input
                  name="title"
                  value={updateForm.title}
                  placeholder="Enter Title"
                  onChange={handleUpdateFieldChange}
                />
                <textarea
                  name="body"
                  value={updateForm.body}
                  placeholder="Enter Body"
                  onChange={handleUpdateFieldChange}
                />

                <button type="submit">Submit</button>
              </form>
            </div>
          </>
        )}
      </div>

      <Index notes={notes} editFunc={toggleUpdate} deleteFunc={deleteNote} />
    </div>
  );
}

export default App;