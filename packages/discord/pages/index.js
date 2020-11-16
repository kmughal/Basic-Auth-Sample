import React from "react";
import { useSession } from "next-auth/client";

import SignedInPage from "./components/SignedInPage";
import SignIn from "./components/SignIn";

export default function Page() {
  const [session, loading] = useSession();

  React.useEffect(() => {

    const url = "http://localhost:5000/messages";
    const eventSource = new EventSource(url);

    eventSource.onmessage = (data) => {
      console.log(data);
    };

    eventSource.addEventListener("ping", (data) => {
      console.log(data);
    });
  },[])

  return (
    <>
      {!session && <SignIn />}
      {session && <SignedInPage session={session} />}
    </>
  );
}
