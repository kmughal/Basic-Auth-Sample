import React from "react";
import { useSession } from "next-auth/client";

import SignedInPage from "./components/SignedInPage";
import SignIn from "./components/SignIn";

export default function Page() {
  const [session, loading] = useSession();
  
  return (
    <>
      {!session && <SignIn />}
      {session && <SignedInPage session={session} />}
    </>
  );
}
