import React from "react";
import SideBar from "./SideBar";
import MainBody from "./MainBody";

export default function MainPage({ username }) {
  const [selectedChannel, setSelectedChannel] = React.useState(null);
  const [messages, setMessages] = React.useState(null);
  function getMessagesByChannel(id) {
    if (!(id ?? selectedChannel)) return;
    fetch("/api/messages?channelId=" + (id ?? selectedChannel))
      .then((r) => r.json())
      .then(setMessages)
      .catch(console.error);
  }

  // Long polling this needs to change.
  // setTimeout(() => {
  //   getMessagesByChannel();
  // }, 3000);

  return (
    <section className="main-page">
      <SideBar
        setSelectedChannel={setSelectedChannel}
        getMessagesByChannel={getMessagesByChannel}
      />
      <MainBody
        selectedChannel={selectedChannel}
        messages={messages}
        getMessagesByChannel={getMessagesByChannel}
        username={username}
      ></MainBody>
    </section>
  );
}
