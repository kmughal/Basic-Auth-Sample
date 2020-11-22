import React from "react";
import SideBar from "./SideBar";
import MainBody from "./MainBody";
import useSSE from "../hooks/useSSE";

export default function MainPage({ username, channels, selectedChannelId }) {
  const [selectedChannel, setSelectedChannel] = React.useState(
    selectedChannelId
  );
  const [messages, setMessages] = React.useState(null);

  useSSE(selectedChannel, setMessages);

  return (
    <section className="main-page">
      <SideBar
        channels={channels}
        setSelectedChannel={setSelectedChannel}
        selectedChannel={selectedChannel}
      />
      <MainBody
        selectedChannel={selectedChannel}
        messages={messages}
        username={username}
      ></MainBody>
    </section>
  );
}
