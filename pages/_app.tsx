import '../styles/globals.css'
import '../styles/Pokemon.css'
import type { AppProps } from 'next/app'
import { EmptyLayout } from 'components/layout/empty';
import { AppPropsWithLayout } from 'models/common';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  console.log('re-render app');
  
  const Layout = Component.Layout ?? EmptyLayout;

  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
