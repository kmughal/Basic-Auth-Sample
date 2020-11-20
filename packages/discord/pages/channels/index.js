import React from "react";
import { useSession } from "next-auth/client";

import SignedInPage from "../../components/SignedInPage";
import SignIn from "../../components/SignIn";

export default function Page({ channels }) {
  console.log(channels);
  const [session, loading] = useSession();

  return (
    <>
      {!session && <SignIn />}
      {session && <SignedInPage channels={channels} session={session} />}
    </>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch("http://localhost:5000/channels", {
    credentials: "same-origin",
    method: "get",
    headers: { "content-type": "application/json" },
  });

  const channels = await response.json();
  return {
    props: { channels }, // will be passed to the page component as props
  };
}
