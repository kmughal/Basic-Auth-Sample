export default function InnerMessage({ message, messageType }) {
  const isImage = messageType === "image/png" || messageType === "image/gif";

  return (
    <>
      {messageType === "String" && <>{message}</>}
      {isImage && <img src={message} height={200} width={200} />}
    </>
  );
}
