export default function EditorToolBar({ editorToolBar }) {
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

  const editMessageHandler = (event) => {
    const body = JSON.stringify({
      messageId: editorToolBar.current._id,
      message: document.getElementById("edit_message").value,
    });

    fetch("/api/messages", {
      method: "PUT",
      body,
      headers: { "content-type": "application/json" },
    })
      .then(r => {
        if (r.ok) {
          // remove the text editor
        }
      })
      .catch(console.error);
    event.preventDefault();
  };

  const editMessageHandler = (e) => {
    const parentEl = editorToolBar.current.parentElement;
    const message = parentEl.querySelector(".message-container__text")
      .innerHTML;
    parentEl.innerHTML = `
    <form>
      <input id='edit_message' type='text' value="${message}"/>
      <button onClick=${editMessageHandler}>Save</button>
      <button>Cancel</button>
    </form>
    `;
  };

  return (
    <section className="editor-toolbar" ref={editorToolBar}>
      <ul>
        {editorToolBar.current?.data?.isOwn && (
          <li
            className="editor-toolbar_action-edit"
            onClick={editMessageHandler}
          >
            Edit
          </li>
        )}
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
