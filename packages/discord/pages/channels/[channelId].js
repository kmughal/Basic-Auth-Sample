import { useRouter } from "next/router";

export default function Channel() {
  const router = useRouter();
  const {channelId} = router.query;

  // const [session, loading] = useSession();

  // return (
  //   <>
  //     {!session && <SignIn />}
  //     {session && <SignedInPage channels={channels} selectedChannelId={selectedChannelId} session={session} />}
  //   </>
  // );

  return <h1>channel : {channelId}</h1>;
}


export async function getServerSideProps(context) {
    console.log("context:" ,context);
    return {
      props: {}, // will be passed to the page component as props
    }
  }