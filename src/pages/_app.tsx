import { UserProvider } from '@auth0/nextjs-auth0';
import ErrorBoundary from 'components/ErrorBoundary';
import { Layout } from 'components/Layout';
import { Modal } from 'components/Modal';
import { BooksProvider } from 'context';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <BooksProvider>
        <Modal />
        <Layout>
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </BooksProvider>
    </UserProvider>
  );
}

export default MyApp;
