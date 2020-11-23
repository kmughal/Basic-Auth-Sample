import React from "react";
import DeleteMessageButton from "./DeleteMessageButton";

function MessageEditor({ message, messageId, channelId, setSelectedMessage }) {
  const [messageEditor, showMessageEditor] = React.useState(false);
  const [messageValue, setMessage] = React.useState(message);

  let editor = null;

  const updateMessageHandler = (e) => {
    const body = JSON.stringify({
      messageId,
      message: messageValue,
    });

    function doChangesAfterMessageUpdate(response) {
      if (response.ok) {
        const editorContainer =
          e.target.parentElement.parentElement.parentElement;
        editor = editorContainer.querySelector(".editor");
        const messageItem = editor.parentElement.parentElement;

        editor.parentElement.removeChild(editor);
        const userMessageEl = messageItem.querySelector(".user-message");

        userMessageEl.classList.remove("hide-block");
        userMessageEl.innerHTML = messageValue;
        setSelectedMessage(-1);
      }
    }

    fetch("/api/messages", {
      method: "PUT",
      body,
      headers: { "content-type": "application/json" },
    })
      .then(doChangesAfterMessageUpdate)
      .catch(console.error);
  };
  const cancelHandler = (e) => showMessageEditor(false);

  return (
    <div className="editor-container">
      <section className="hide-block editor">
        <input
          type="text"
          id="message-editor"
          value={messageValue}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              updateMessageHandler(e);
              cancelHandler();
            } else if (e.keyCode === 27) {
              cancelHandler();
            }
          }}
        />
      </section>

      <section className="editor-menu">
        <ul>
          <li
            className="message-editor__open-button"
            onClick={(e) => {
              let editorContainer =
                e.target.parentElement.parentElement.parentElement;
              editor = editorContainer.querySelector(".editor");
              editor.classList.remove("hide-block");

              const messageItem = editor.parentElement.parentElement;
              messageItem
                .querySelector(".user-message")
                .classList.add("hide-block");
               const editMenu =  messageItem.querySelector(".editor-menu");
               editMenu.classList.add("hide-block");
              
            }}
          >
            Edit
          </li>
          <DeleteMessageButton messageId={messageId} />
        </ul>
      </section>
    </div>
  );
}

export default MessageEditor;
