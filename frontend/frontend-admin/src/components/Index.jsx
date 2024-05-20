import React from 'react'
import Note from './Note'

const Index = ({ data }) => {
  return (
    <>
      {data && data.length > 0 ? (
        data.map((note) => (
          <div className="note" key={note._id}>
            <Note note={note} />
          </div>
        ))
      ) : (
        <p>No note found.</p>
      )}
    </>
  )
}

export default Index