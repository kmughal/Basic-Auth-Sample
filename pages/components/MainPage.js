import React from "react"
import SideBar from "./SideBar"
import MainBody from "./MainBody"

export default function MainPage({username}) {
  const [selectedChannel, setSelectedChannel] = React.useState(null)
  const [messages, setMessages] = React.useState(null)
  function getMessagesByChannel() {
    fetch("/api/messages?channelId=" + selectedChannel)
      .then((r) => r.json())
      .then(setMessages)
      .catch(console.error)
  }

  return (
    <section className="main-page">
      <SideBar setSelectedChannel={setSelectedChannel} getMessagesByChannel={getMessagesByChannel}/>
      <MainBody selectedChannel={selectedChannel} messages={messages} getMessagesByChannel={getMessagesByChannel} username={username}></MainBody>
    </section>
  )
}
