import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import Layout from "../components/Layout";
import "../public/assets/css/globals.css";
import { ToastProvider } from "@hanseo0507/react-toast";

function main({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const router = useRouter();
  let path = router.asPath;
  if (path == "/") path = "Ana sayfa";
  return (
    <>
      <Head>
        <title>{`${path}`}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="uwuv3 Api" />
      </Head>
      <NextNProgress height={3} color="454FBF" />
      <ToastProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ToastProvider>
    </>
  );
}

export default main;
