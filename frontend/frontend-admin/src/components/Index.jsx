import React from 'react'
import Note from './Note';

function Index({notes,editFunc,deleteFunc}) {
  return (
    <>
      {notes.map((note) => {
        return (
          <div key={note._id}>
            <Note content={note} editFunc={editFunc} deleteFunc={deleteFunc}  />
          </div>
        );
      })}
    </>
  )
}

export default Index