import React from "react";

const useSSE = (selectedChannel, setMessages) => {
  React.useEffect(() => {
    if (!selectedChannel) return;
    if (window.eventSource?.close) {
      window.eventSource.close();
    }
    const url = "http://localhost:5000/messages?channelId=" + selectedChannel;
    window.eventSource = new EventSource(url);

    let _oldMessage = [];
    window.eventSource.onmessage = (data) => {
      const messages = JSON.parse(data.data);
      // const matchFound = _oldMessage.some(x=> messages?.messages.some(z=> z._id === x._id) );

      // if (matchFound) return;
      // console.log({messages , matchFound})
      // _oldMessage = messages?.messages;

      setMessages(messages?.messages);
    };

    window.eventSource.addEventListener("ping", (data) => {
      console.log(data);
    });
  }, [selectedChannel]);
};

export default useSSE;
