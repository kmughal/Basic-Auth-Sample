import MainPage from "./MainPage"
import { signOut } from "next-auth/client"

export default function SignedInPage({ session }) {
  return (
    <>
      <div className="sign-out-container">
        Signed in as {session.user.username}{" "}
        <button onClick={signOut}>Sign out</button>
      </div>
      <MainPage/>
    </>
  )
}
