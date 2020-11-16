import React from "react";
import SideBar from "./SideBar";
import MainBody from "./MainBody";

export default function MainPage({ username }) {
  const [selectedChannel, setSelectedChannel] = React.useState(null);
  const [messages, setMessages] = React.useState(null);

  React.useEffect(() => {
    if (!selectedChannel) return;
    if (window.eventSource?.close) {
      console.log("closing");
      window.eventSource.close();
    }
    const url = "http://localhost:5000/messages?channelId=" + selectedChannel;
    window.eventSource = new EventSource(url);

    window.eventSource.onmessage = (data) => {
      const messages = JSON.parse(data.data);
      setMessages(messages?.messages);
    };

    window.eventSource.addEventListener("ping", (data) => {
      console.log(data);
    });
  }, [selectedChannel]);

  return (
    <section className="main-page">
      <SideBar
        setSelectedChannel={setSelectedChannel}
      />
      <MainBody
        selectedChannel={selectedChannel}
        messages={messages}
        username={username}
      ></MainBody>
    </section>
  );
}
