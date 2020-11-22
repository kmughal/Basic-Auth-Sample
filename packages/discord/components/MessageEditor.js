import React from "react";
import DeleteMessageButton from "./DeleteMessageButton";

function MessageEditor({ message, messageId, channelId }) {
  const [messageEditor, showMessageEditor] = React.useState(false);
  const [messageValue, setMessage] = React.useState(message);

  let editor = null;
  let messageView = null;

  const updateMessageHandler = () => {
    const body = JSON.stringify({
      messageId,
      message: messageValue,
    });

    function doChangesAfterMessageUpdate(response) {
      if (response.ok) {
        const editor = event.target.parentElement;
        const messageContainer =
          editor.parentElement.parentElement.parentElement;
        messageContainer
          .querySelector(".message-view")
          .classList.remove("hide-block");
        messageContainer
          .querySelector(".editor-container")
          .classList.add("hide-block");
        messageContainer.querySelector(
          ".message-view .user-message"
        ).innerHTML = messageValue;
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
              updateMessageHandler();
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
              let editorMenu = editorContainer.querySelector(".editor-menu");

              editor.classList.remove("hide-block");
              editorMenu.classList.add("hide-block");

              messageView = editorContainer.parentElement.querySelector(
                ".user-message"
              );
              messageView.classList.add("hide-block");
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
