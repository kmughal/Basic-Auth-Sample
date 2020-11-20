import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import SignedInPage from "../../components/SignedInPage";
import SignIn from "../../components/SignIn";

export default function Channel() {
  const router = useRouter();
  const { channelId } = router.query;

  const [session, loading] = useSession();

  return (
    <>
      {!session && <SignIn />}
      {session && (
        <SignedInPage selectedChannelId={channelId} session={session} />
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  console.log("context:", context);
  return {
    props: {}, // will be passed to the page component as props
  };
}
