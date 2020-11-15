import React from "react"
import { csrfToken } from "next-auth/client"

export default function Login({ csrfToken }) {
  return (
    <section className="login-container">
      <form method="post" action="/api/auth/callback/credentials">
        <section>
          <h1>Sign-in</h1>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input
            name="username"
            type="text"
            placeholder="khurram@server.com"
          />{" "}
          <input name="password" type="password" placeholder="12345678" />
          <button type="submit">Sign in</button>
          <br />
          <p className="align-center">
            In to register a new account <a href="/register">click here.</a>
          </p>
        </section>
      </form>
    </section>
  )
}

Login.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  }
}
