import React from "react";

export default function Messages({ messages, username }) {
  const editorToolBar = React.useRef(null);

  const showEditorToolBar = (m, { target }) => {
    editorToolBar.current.visibility = "hidden";
    target.appendChild(editorToolBar.current);
    editorToolBar.current.data = m;
    editorToolBar.current.data.isOwn = !target.classList.contains(
      "message-container__not-author"
    );
    editorToolBar.current.visibility = "visible";
  };

  React.useEffect(() => {
    editorToolBar.current.visibility = "hidden";
  }, []);

  return (
    <section>
      <EditorToolBar editorToolBar={editorToolBar} />
      <ul className="message-container">
        {messages.map((m) => (
          <li
            className={
              username === m.user.username
                ? "message-container__author"
                : "message-container__not-author"
            }
            key={m._id}
            onMouseOver={(e) => showEditorToolBar(m, e)}
          >
            {m.user.username} say :{m.message}
          </li>
        ))}
      </ul>
    </section>
  );
}

function EditorToolBar({ editorToolBar }) {
  const deleteMessageHandler = (_) => {
    const body = JSON.stringify({ messageId: editorToolBar.current.data._id });
    fetch("/api/messages", {
      method: "delete",
      headers: {
        "content-type": "application/json",
      },
      body,
    })
      .then(console.log)
      .catch(console.trace);
  };

  return (
    <section className="editor-toolbar" ref={editorToolBar}>
      <ul>
        <li>Edit</li>
        {editorToolBar.current?.data?.isOwn && (
          <li
            className="editor-toolbar_action-delete"
            onClick={deleteMessageHandler}
          >
            Delete
          </li>
        )}
      </ul>
    </section>
  );
}
