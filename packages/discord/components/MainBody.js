import React from "react";
import Messages from "./Messages";

export default function MainBody({ selectedChannel, messages, username }) {
  const textRef = React.useRef(null);

  const fileUploadHandler = e => {
    
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
          messageType : fileType
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
  }

  const sendChatHandler = (_) => {
    const body = JSON.stringify({
      message: textRef.current.value,
      channelId: selectedChannel,
      messageType : "String"
    });
   

    fetch("/api/messages", {
      body,
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
    }).catch(console.error);
  };

  return (
    <section className="main-page__main-body">
      <section className="main-page__channel-history">
        {messages && messages.length === 0 && <p>Start a conversion!</p>}
        {messages && messages.length > 0 && (
          <Messages messages={messages} username={username} channelId={selectedChannel}/>
        )}
      </section>
      <section className="main-page__input-text">
        <div>
          <label>Text</label>
          <input type="text" id="text" name="text" ref={textRef} />
          <button onClick={sendChatHandler}>Send</button>
          <input type="file" onChange={fileUploadHandler}/>
        </div>
      </section>
    </section>
  );
}
