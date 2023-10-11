import Header from "./header";
import Footer from "./footer";
import Head from "next/head";
import whitebg from "../public/whitebg.svg"
import bgblack from "../public/bgblack.svg"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Layout = ({ children}) => {
  const [which, setWhich] = useState(false);
  const { theme } = useTheme();
  useEffect(()=>{
     setWhich(theme == "dark");
  },[theme])
  
  return (
    <>
      <Head>
        <title>Sudo Folks To Do</title>
        <meta name="description" content="Sudo Folks To Do is a  online productivity tool. Manage your to-do list and Increases productivity, Provides motivation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="To Do"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <div className="min-h-screen mx-auto  flex flex-col  sudo-bg" style={{
      "--back-img":  which?`url(${bgblack.src})`:`url(${whitebg.src})`,
      width: '100%',
    }}>
        <Header />
        <main className="flex-grow container mx-auto px-4 sm:px-6">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
