import { signIn } from "next-auth/client"

export default function SignIn() {
  return (
    <section className="signin-container">
      <p>
        Not signed in <button onClick={signIn}>Click here to signin</button>
        Or if you don't have an account then <a href="/register">click here</a> to register
      </p>
    </section>
  )
}
