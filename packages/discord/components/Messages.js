import React from "react";
import MessageEditor from "./MessageEditor";

import InnerMessageWrapper from "./InnerMessageWrapper";

export default function Messages({
  messages,
  username,
  channelId,
}) {
  const [selectedMessage, setSelectedMessage] = React.useState(-1);

  return (
    <section
      onMouseLeave={(e) => {
        setSelectedMessage(-1);
      }}
    >
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
              {(selectedMessage !== m._id || username !== m.user.username) && (
                <InnerMessageWrapper
                  username={m.user.username}
                  messageType={m.messageType}
                  message={m.message}
                  createdAt={m.created_at}
                />
              )}
              {selectedMessage === m._id && username === m.user.username && (
                <>
                  <div className="message-view">
                    <InnerMessageWrapper
                      username={m.user.username}
                      messageType={m.messageType}
                      message={m.message}
                      createdAt={m.created_at}
                    />
                  </div>
                  <MessageEditor
                    message={m.message}
                    messageId={m._id}
                    channelId={channelId}
                  />
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
