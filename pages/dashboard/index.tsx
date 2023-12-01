import Layout from "@/components/layouts/mainLayout";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactElement, useEffect, useState } from "react";

export default function Home({}) {
  const se = useSession();
  console.log(se)
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    console.log(se.status)
    if(se.status == 'loading'){
      console.log("hahahah")
    }else if(se.status == 'authenticated'){
      setLogged(true);
    }
  },[se.status]);
  if(se.status == 'loading'){
    return <p>loading</p>
  }
  return (
   <div>
    test
    {logged? (
 <button onClick={() => signOut()}>Sign out</button>
    ): (<button onClick={() => signIn("credentials", {
      redirect: false,
      email: 'superadmin@sudofolks.com',
      password: 'test',
      callbackUrl:'/',
    })}>Sign In</button>)}
   </div>
  )
}