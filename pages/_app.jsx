import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "../styles/sudofolks.css";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import * as gtag from "../lib/gtag";
import Script from "next/script";
import { SessionProvider, useSession } from "next-auth/react";
import { AppPropsWithLayout } from "@/utils/constants";
import Layout from "@/components/layouts/mainLayout";
import Loading from "@/components/widgets/loading";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const [loading, setLoad] = useState(true);
  const setLoading = useCallback((load) => {
    setLoad(load);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
      setLoading(true);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events, setLoading]);

  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        async
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <SessionProvider session={session}>
        <ThemeProvider attribute="class">
          {getLayout(
            loading ?
              <>  <Loading /> <Component setLoading={setLoading} {...pageProps} /></> :
              <Component setLoading={setLoading} {...pageProps} />
          )}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
