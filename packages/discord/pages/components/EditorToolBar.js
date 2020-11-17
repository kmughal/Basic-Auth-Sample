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
  