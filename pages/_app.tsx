import type { AppProps } from "next/app";
import "../src/globals.css";
import Layout from "../src/components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
