import React from "react";
import MessageEditor from "./MessageEditor";

export default function Messages({ messages, username, channelId }) {
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
              {(selectedMessage !== m._id || username !== m.user.username) && (
                <>
                  <span className="username">{m.user.username} say :</span>
                  <span className="user-message">
                    <InnerMessage
                      message={m.message}
                      messageType={m.messageType}
                    />
                  </span>
                </>
              )}
              {selectedMessage === m._id && username === m.user.username && (
                <>
                  <div className="message-view">
                    <span className="username">{m.user.username} say :</span>
                    <span className="user-message">
                      <InnerMessage
                        message={m.message}
                        messageType={m.messageType}
                      />
                    </span>
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

function InnerMessage({ message, messageType }) {
  const isImage = messageType === "image/png" || messageType === "image/gif";

  return (
    <>
      {messageType === "String" && <>{message}</>}
      {isImage && (<img src={message} height={200} width={200} />)}
    </>
  );
}
