export default function DeleteMessageButton({ messageId }) {
    const deleteMessageHandler = async (e) => {
      const response = await fetch("/api/messages", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ messageId }),
      });
      if (response.ok) {
        console.log("message with id:", messageId, " is deletd");
      }
    };
  
    return <li onClick={deleteMessageHandler}>Delete</li>;
  }
  