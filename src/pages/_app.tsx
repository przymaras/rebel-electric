import type { AppProps } from 'next/app';

import { Layout } from 'src/modules/layout/views/Layout';
import 'src/styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
