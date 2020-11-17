import React from "react";
import SideBar from "./SideBar";
import MainBody from "./MainBody";
import useSSE from "../hooks/useSSE";

export default function MainPage({ username }) {
  const [selectedChannel, setSelectedChannel] = React.useState(null);
  const [messages, setMessages] = React.useState(null);
  useSSE(selectedChannel, setMessages);

  return (
    <section className="main-page">
      <SideBar setSelectedChannel={setSelectedChannel} />
      <MainBody
        selectedChannel={selectedChannel}
        messages={messages}
        username={username}
      ></MainBody>
    </section>
  );
}
