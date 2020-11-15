import React from "react"
import Messages from "./Messages"

export default function MainBody({
  selectedChannel,
  messages,
  getMessagesByChannel,
  username
}) {

  const textRef = React.useRef(null)

  const sendChatHandler = (_) => {
    const body = JSON.stringify({
      message: textRef.current.value,
      channelId: selectedChannel,
    })

    fetch("/api/messages", {
      body,
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "same-origin",
    })
      .then((r) => {
        if (r.status === 302) {
          getMessagesByChannel()
        }
      })
      .catch(console.error)
  }

  return (
    <section className="main-page__main-body">
      <section className="main-page__channel-history">
        {messages && messages.length === 0 && <p>Start a conversion!</p>}
        {messages && messages.length > 0 && <Messages messages={messages} username={username}/>}
      </section>
      <section className="main-page__input-text">
        <div>
          <label>Text</label>
          <input type="text" id="text" name="text" ref={textRef} />
          <button onClick={sendChatHandler}>Send</button>
        </div>
      </section>
    </section>
  )
}
