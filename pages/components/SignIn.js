import { signIn } from "next-auth/client"

export default function SignIn() {
  return (
    <section className="signin-container">
      <p>
        Not signed in <button onClick={signIn}>Click here to signin</button>
      </p>
    </section>
  )
}
