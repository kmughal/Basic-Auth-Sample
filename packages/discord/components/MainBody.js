import React from "react";
import Messages from "./Messages";

export default function MainBody({
  selectedChannel,
  messages,
  username,
}) {
  const textRef = React.useRef(null);

  const fileUploadHandler = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const firstFile = files[0];
    const fileType = firstFile.type;
    const isImage = fileType === "image/png" || fileType === "image/gif";

    if (isImage) {
      const fr = new FileReader();
      fr.onload = (e) => {
        const body = JSON.stringify({
          message: fr.result,
          channelId: selectedChannel,
          messageType: fileType,
        });

        fetch("/api/messages", {
          body,
          method: "POST",
          headers: { "content-type": "application/json" },
          credentials: "same-origin",
        }).catch(console.error);
        console.log(fr.result);
      };

      fr.readAsDataURL(firstFile);
    }
  };

  const openFileDialog = (e) => {
    const parent = e.target.parentElement.parentElement.parentElement;
    parent.querySelector("input[type='file']").click();
  };

  const sendChatHandler = (_) => {
    const body = JSON.stringify({
      message: textRef.current.value,
      channelId: selectedChannel,
      messageType: "String",
    });

    fetch("/api/messages", {
      body,
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
    }).catch(console.error);
  };

  const textKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      sendChatHandler(e);
      e.target.value = "";
    }
  };

  return (
    <section className="main-page__main-body">
      <p>&#128512;</p>
      <section className="main-page__channel-history">
        {messages && messages.length === 0 && <p>Start a conversion!</p>}
        {messages && messages.length > 0 && (
          <Messages
            messages={messages}
            username={username}
            channelId={selectedChannel}
          />
        )}
      </section>
      <section className="main-page__input-text">
        <div>
          <button onClick={openFileDialog}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"
              ></path>
            </svg>
          </button>
          <input
            type="text"
            id="text"
            name="text"
            ref={textRef}
            onKeyDown={textKeyDownHandler}
            placeholder="type here...."
          />
          <input
            type="file"
            className="hide-block"
            onChange={fileUploadHandler}
          />
        </div>
      </section>
    </section>
  );
}
