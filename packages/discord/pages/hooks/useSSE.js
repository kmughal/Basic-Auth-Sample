import React from "react";

const useSSE = (selectedChannel, setMessages) => {
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
};

export default useSSE;
