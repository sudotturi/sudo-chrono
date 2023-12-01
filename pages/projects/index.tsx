import Layout from "@/components/layouts/mainLayout";
import { UnderConstruction } from "@/components/layouts/underConstruction";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";

export default function Home({ }) {
  const se = useSession();
  console.log(se)
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    console.log(se.status)
    if (se.status == 'loading') {
      console.log("hahahah")
    } else if (se.status == 'authenticated') {
      setLogged(true);
    }
  }, [se.status]);
  if (se.status == 'loading') {
    return <p>loading</p>
  }
  return (
    <div>
      {UnderConstruction()}
    </div>
  )
}