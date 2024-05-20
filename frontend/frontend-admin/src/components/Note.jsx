import React from "react";

function Note({ content, editFunc, deleteFunc }) {
  return (
    <>
      <div className="a_note">
        <h1>{content.title}</h1>
        <p>Body: {content.body}</p>

        <div className="btnContainer">
          <button
            onClick={() => {
              editFunc(content);
            }}
          >
            {" "}
            Update{" "}
          </button>

          <button
            onClick={() => {
              deleteFunc(content._id);
            }}
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Note;