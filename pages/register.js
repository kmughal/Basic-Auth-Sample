import React from "react";

export default function () {
  const userInput = React.useRef(null);
  const passwordInput = React.useRef(null);

  const handleFormSubmit = async (e) => {
    
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: userInput.current.value,
        password: passwordInput.current.value,
      }),
      headers: { "CONTENT-TYPE": "application/json" },
    }).then((response) => response.json());
    console.log(response);
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" ref={userInput} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordInput}
        />
      </div>
      <div>
        <button onClick={handleFormSubmit}>Register</button>
      </div>
    </div>
  );
}
