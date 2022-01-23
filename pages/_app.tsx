import type { AppProps } from "next/app";
import "../src/globals.scss";
import Layout from "../src/components/layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
