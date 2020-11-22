import InnerMessage from "./InnerMessage";


export default function InnerMessageWrapper({ username, message, messageType, createdAt }) {
    const createdAtString = new Intl.DateTimeFormat('en-US').format(new Date(createdAt));
    return (
      <>
        <div className="username">
          <span aria-label={username}>{username}</span>
          {" "}
          <span aria-label={createdAtString}>{createdAtString}</span>
        </div>
  
        <div className="user-message">
          <InnerMessage message={message} messageType={messageType} />
        </div>
      </>
    );
  }
  