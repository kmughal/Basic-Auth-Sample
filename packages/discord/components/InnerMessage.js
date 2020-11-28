import "emoji-mart/css/emoji-mart.css";
import { Emoji } from "emoji-mart";
import MessageTypes from "./types/message-types";

export default function InnerMessage({ message, messageType }) {
  const isImage =
    messageType === MessageTypes["image/gif"] ||
    messageType === MessageTypes["image/png"];
  const isEmoji = messageType === MessageTypes.emoji;
  return (
    <>
      {messageType === "String" && <>{message}</>}
      {isImage && <img src={message} height={200} width={200} />}
      {isEmoji && <Emoji emoji={message} size={20} />}
    </>
  );
}
