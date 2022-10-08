import { UserProvider } from '@auth0/nextjs-auth0';
import ErrorBoundary from 'components/ErrorBoundary';
import { Layout } from 'components/Layout';
import { Modal } from 'components/Modal';
import { BooksProvider } from 'context';
import type { AppProps } from 'next/app';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // wraps app in Auth0 user
    <UserProvider>
      {/* wraps content in Books Provider context data */}
      <BooksProvider>
        {/* adds modal components */}
        <Modal />
        {/* App layout */}
        <Layout>
          {/* provides relevant errors*/}
          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
        </Layout>
      </BooksProvider>
    </UserProvider>
  );
}

export default MyApp;
