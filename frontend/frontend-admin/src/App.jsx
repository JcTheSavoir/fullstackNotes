import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Index from "./components/Index";

//Frontend connection to Backend  [package.json -> 'proxy:'] ie. Fetch/Axios to sever (http://localhost:3000/)

function App() {
  const [notes, setNotes] = useState([]);

  const [createForm, setCreateForm] = useState({ title: "", body: "" });

  //------------------------------------------[State]-----------------------------------------------------

  //------------------------------------------[CRUD Operations]-------------------------------------------

  //------------------------------------------[Create]------------------------------------------------------

  const createNote = async (e) => {
    e.preventDefault();
    // 1. Make a request to the server
    const response = await axios({
      method: "POST",
      url: "/api/notes",
      data: createForm,
    });
    // 2. Set the state
    setNotes([...notes, response.data.note]);
    setCreateForm({ title: "", body: "" });
    
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

  const updateCreateFormField = (e) => {
    const {value,name}= e.target
    setCreateForm(()=>({
      ...createForm,
      [name]:value
    }))
  }
  //------------------------------------------[Delete]------------------------------------------------------

  //------------------------------------------[useEffect]-----------------------------------------------------
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="App">
      <div className="formAdmin">
        <form>
          <input 
          name="title" value={createForm.title} onChange={updateCreateFormField}/>
          <textarea 
          name="body" value={createForm.body} onChange={updateCreateFormField}/>

          <button onClick={createNote}>Submit</button>
        </form>
      </div>

      <Index data={notes} />
    </div>
  );
}

export default App;