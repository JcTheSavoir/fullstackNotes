import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Index from "./components/Index";

//Frontend connection to Backend  [package.json -> 'proxy:'] ie. Fetch/Axios to sever (http://localhost:3000/)

function App() {
  // state for getting notes
  const [notes, setNotes] = useState([]);

  //state for creating notes
  const [createForm, setCreateForm] = useState({ title: "", body: "" });

  //state for updating a note
    //* Rmemeber: each item we are udpdating has a unique _id.
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: ""
  })
  //------------------------------------------[State]-----------------------------------------------------

  //------------------------------------------[CRUD Operations]-------------------------------------------

  //------------------------------------------[Create]------------------------------------------------------

  const createNote = async (e) => {
    e.preventDefault();
    // 1. Create Note
    const res = await axios.post("/api/notes", createForm);
    console.log(res);
    // Axios Req -> POST (formData => {state})
    setNotes(() => [...notes, res.data.note]);
  };

  const updateCreateFormField = (e) => {
    const {value,name}= e.target
    console.log({ name, value })

    // Clear form
    setCreateForm(()=> ({
      ...createForm,
      [name]: value
    }))
    console.log("form cleared")
  }
  //------------------------------------------[Read]--------------------------------------------------------
  const fetchNotes = async () => {
    // 1. Make a request to the server
    const response = await axios({
      method: "GET",
      url: "/api/notes",
    });
    // app.get(/notes){}

    const info = await response.data;
    console.log(info);
    // 2. Set the state
    setNotes(info.notes);
    console.log(notes);
  };
  //------------------------------------------[Update]------------------------------------------------------
  const updateNote = async (e) => {
    e.preventDefault();
    
    // -----VV---------Get Title and body from the updateForm and Destructure
    const {title, body} = updateForm

    const res = await axios.put(`api/notes/${updateForm._id}`, {title, body});
    console.log(res);
    // Axios Req -> Update (formData => {state})
    setNotes(() => [...notes, res.data.note]);
  };


  // Capture the event target value and set it to state {updateForm} 
  const handleUpdateFieldChange = async (e) => {
    // 1. Destructure event target
    const {value,name}= e.target;
    // 2. Set State
    setUpdateForm(()=> ({
      ...updateForm,
      [name]: value
    }))
  }

  
  //------------------------------------------[Delete]------------------------------------------------------

  //------------------------------------------[useEffect]-----------------------------------------------------
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      {/* FormContainer */}      
      <div className="formContainer">

        {/* createForm */}
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
        <hr/>

        {/* updateForm */}
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
      </div>

      <Index data={notes} />
    </div>
  );
}
export default App;
