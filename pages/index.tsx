import Loading from "@/components/loading";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";

export default function Home({ }) {
  const session = useSession();
  const route = useRouter();
  useEffect(() => {
    if (session.status == 'unauthenticated') {
      route.push('/auth/signin')
    }
  }, [session.status]);

  return (
    <Loading />
  )
}