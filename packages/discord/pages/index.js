import React from "react";
import { useSession } from "next-auth/client";

import SignedInPage from "../components/SignedInPage";
import SignIn from "../components/SignIn";

export default function Page({ channels, selectedChannelId }) {
  const [session, loading] = useSession();
  return (
    <>
      {!session && <SignIn />}
      {session && (<section className="welcome-page-container">
        <h1>Welcome back {session.user.username}</h1>
        <div>
          In order to log to channels please <a href="/channels">click here!</a>
        </div>
      </section>)}
    </>
  );
}
