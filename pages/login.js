import React from "react"
import { csrfToken } from "next-auth/client"

export default function Login({ csrfToken }) {
  return (
    <section className="login-container">
      <form method="post" action="/api/auth/callback/credentials">
        <section>
        <h1>Sign-in</h1>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label htmlFor="username">
            Username
            <input name="username" type="text" placeholder="khurram@fake-server.com"/>
          </label>
          <label htmlFor="password">
            Password
            <input name="password" type="text" placeholder="12345678"/>
          </label>
          <button type="submit">Sign in</button>
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
