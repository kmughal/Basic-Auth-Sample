import React from "react";
import SideBar from "./SideBar";
import MainBody from "./MainBody";

export default function MainPage({ username }) {
  const [selectedChannel, setSelectedChannel] = React.useState(null);
  const [messages, setMessages] = React.useState(null);

  let eventSource = null;
  React.useEffect(() => {
  
    if (!selectedChannel) return;
   
    if (eventSource?.close) {
      console.log("closing");
      eventSource.close();
    }
    const url = "http://localhost:5000/messages?channelId=" + (selectedChannel);
    eventSource = new EventSource(url);

    eventSource.onmessage = (data) => {
      const messages = JSON.parse(data.data);
      setMessages(messages?.messages)
    };

    eventSource.addEventListener("ping", (data) => {
      console.log(data);
    });
  },[selectedChannel])


  return (
    <section className="main-page">
      <SideBar
        setSelectedChannel={setSelectedChannel}
        eventSource={eventSource}
      />
      <MainBody
        selectedChannel={selectedChannel}
        messages={messages}
        username={username}
      ></MainBody>
    </section>
  );
}
