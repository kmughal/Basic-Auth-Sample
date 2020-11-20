import React from "react";

function MessageEditor({ message, messageId }) {
  const [messageEditor, showMessageEditor] = React.useState(false);
  const [messageValue, setMessage] = React.useState(message);

  const updateMessageHandler = (event) => {
    const body = JSON.stringify({
      messageId,
      message: messageValue,
    });

    fetch("/api/messages", {
      method: "PUT",
      body,
      headers: { "content-type": "application/json" },
    })
      .then((r) => {
        if (r.ok) {
          // remove the text editor
        }
      })
      .catch(console.error);
    event.preventDefault();
  };
  const cancelHandler = (e) => showMessageEditor(false);

  return (
    <>
      {messageEditor && (
        <section>
          <input
            type="text"
            id="message-editor"
            value={messageValue}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button onClick={updateMessageHandler}>Save</button>
          <button onClick={cancelHandler}>Cancel</button>
        </section>
      )}
      <section className="message-editor">
        <ul>
          <li
            className="message-editor__open-button"
            onClick={(e) => showMessageEditor(!messageEditor)}
          >
            Edit
          </li>
          <li>Delete</li>
        </ul>
      </section>
    </>
  );
}

export default MessageEditor;
