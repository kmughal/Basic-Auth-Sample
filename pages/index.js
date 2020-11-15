import React from "react"
import { session, signIn, signOut, useSession } from "next-auth/client"

import SignedInPage from "./components/SignedInPage"
import SignIn from "./components/SignIn"

export default function Page() {
  const [session, loading] = useSession()
  console.log(session,"session")
  return (
    <>
      {!session && <SignIn />}
      {session && <SignedInPage session={session}/>}
    </>
  )
}
