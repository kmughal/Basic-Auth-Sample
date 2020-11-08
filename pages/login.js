import React from "react";
export default function () {
  const userInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const handleFormSubmit = (e) => {
    window
      .fetch("http://localhost:3000/api/auth", {
        method: "post",
        credentials: "same-origin",
        body: JSON.stringify({
          username: userInput.current.value,
          password: passwordInput.current.value,
        }),
        headers: [{ "contnet-type": "application/json" }],
      })
      .then((response) => response.json())
      .then(console.log)
      .catch(console.trace);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" ref={userInput} />
      </div>
      <div>
        <label htmlFor="password">Username:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordInput}
        />
      </div>
      <div>
        <button>Sign in</button>
      </div>
    </form>
  );
}
