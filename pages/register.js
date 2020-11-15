import React from "react"

export default function () {
  const userInput = React.useRef(null)
  const passwordInput = React.useRef(null)

  const handleFormSubmit = async (e) => {
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        username: userInput.current.value,
        password: passwordInput.current.value,
      }),
      headers: { "CONTENT-TYPE": "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          window.location.replace("/login")
        }
      });

    e.preventDefault()
  }

  return (
    <section className="register-container">
      <section>
        <input
          type="text"
          id="username"
          name="username"
          ref={userInput}
          placeholder="test@123.com"
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
      </section>
    </section>
  )
}
