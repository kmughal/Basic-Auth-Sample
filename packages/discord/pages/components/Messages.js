export default function Messages({ messages, username }) {
  return (
    <ul className="message-container">
      {messages.map((m) => (
        <li
          className={
            username === m.user.username
              ? "message-container__author"
              : "message-container__not-author"
          }
          key={m._id}
        >
          {m.user.username} say :{m.message}
        </li>
      ))}
    </ul>
  )
}
