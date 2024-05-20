import React from 'react'

const Notes = ({ note }) => {
  return (
    <>
      <div className='a_note'>
        <h1>{note.title}</h1>
        <p>{note.body}</p>
      </div>
    </>
  )
}

export default Notes