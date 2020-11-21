import React from "react";

function MessageEditor({ message, messageId, channelId }) {
  const [messageEditor, showMessageEditor] = React.useState(false);
  const [messageValue, setMessage] = React.useState(message);

  let editor = null;
  let messageView = null;

  const updateMessageHandler = (event) => {
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
    event.preventDefault();
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
        />
        <button onClick={updateMessageHandler}>Save</button>
        <button onClick={cancelHandler}>Cancel</button>
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
                ".message-view"
              );
              messageView.classList.add("hide-block");
            }}
          >
            Edit
          </li>
          <DeleteMessageButton messageId={messageId} />
          <UploadFile />
        </ul>
      </section>
    </div>
  );
}

export default MessageEditor;

function DeleteMessageButton({ messageId }) {
  const deleteMessageHandler = async (e) => {
    const response = await fetch("/api/messages", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({ messageId }),
    });
    if (response.ok) {
      console.log("message with id:", messageId, " is deletd");
    }
  };

  return <li onClick={deleteMessageHandler}>Delete</li>;
}

function UploadFile() {
  const fileChangeHandler = (e) => {
    const li = e.target.parentElement;
    const files = e.target.files;
    if (files && files.length === 0) return;

    const firstFile = files[0];
    const type = firstFile.type;
    const isImage =
      type === "image/gif" || type === "image/png" || type === "image/bmp";
    if (isImage) {
      // convert to base64 and store in mongo
      const fr = new FileReader();
      fr.onload = () => {
        console.log(fr.result);
        const body = JSON.stringify({ message: fs.result, messageType: type });

        fetch("/api/messages", {
          method: "POST",
          body,
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            console.log(response);
          })
          .catch(console.trace);
      };
      fr.readAsDataURL(firstFile);
    }
  };

  const uploadFileHandler = (e) => {
    const li = e.target.parentElement;
    li.querySelector("input[type='file']").click();
  };

  return (
    <li>
      <button onClick={uploadFileHandler}>Upload file</button>
      <input type="file" onChange={fileChangeHandler} />
    </li>
  );
}
