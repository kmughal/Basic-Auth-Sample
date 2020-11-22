import React from "react";

export default function () {
  const userInput = React.useRef(null);
  const passwordInput = React.useRef(null);
  const [error, setError] = React.useState(null);

  const handleFormSubmit = async (e) => {
    if (
      userInput.current.value.length === 0 ||
      passwordInput.current.value.length === 0
    ) {
      setError("some fields are empty.");
      return;
    }
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: userInput.current.value,
        password: passwordInput.current.value,
      }),
      headers: { "CONTENT-TYPE": "application/json" },
    }).then((response) => {
      if (response.ok) {
        window.location.replace("/login");
      } else {
        setError(response.statusText);
      }
    });

    e.preventDefault();
  };

  return (
    <section className="register-container">
      <section>
        <h1>Create a new account</h1>
        <input
          type="text"
          id="username"
          name="username"
          ref={userInput}
          placeholder="khurram@server.com"
        />{" "}
        <input
          type="password"
          id="password"
          name="password"
          ref={passwordInput}
          placeholder="123456789"
        />
        <button
          className="register-container_action-button"
          onClick={handleFormSubmit}
        >
          Register
        </button>
        <br />
        {error && <p className="error">{error}</p>}
        <p className="align-center">
          In to login to your new account <a href="/login">click here.</a>
        </p>
      </section>
    </section>
  );
}
