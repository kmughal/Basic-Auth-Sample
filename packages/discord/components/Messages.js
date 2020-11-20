import React from "react";
import MessageEditor from "./MessageEditor";

export default function Messages({ messages, username }) {
  const [selectedMessage, setSelectedMessage] = React.useState(-1);

  return (
    <section>
      <ul
        className="message-container"
        // onMouseOut={resetShowEditorArr}
      >
        {messages.map((m) => {
          return (
            <li
              className={
                username === m.user.username
                  ? "message-container__author"
                  : "message-container__not-author"
              }
              key={m._id}
              data-key={m._id}
              onMouseOver={(e) => {
                setSelectedMessage(m._id);
              }}
            >
              {selectedMessage !== m._id && (
                <>
                  <span className="username">{m.user.username} say :</span>
                  <span className="user-message">{m.message}</span>
                </>
              )}
              {selectedMessage === m._id && username === m.user.username && (
                <MessageEditor message={m.message} messageId={m._id} />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
