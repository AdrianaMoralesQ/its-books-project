import { useUser } from '@auth0/nextjs-auth0';
import { Button, Wrapper } from 'components/styled';
import { BooksContext, ModalTypes } from 'context';
import Link from 'next/link';
import { useContext } from 'react';

const Signin = () => {
  const { user, error } = useUser();
  const { setIsModalVisible, setModalType } = useContext(BooksContext);
  console.log({ user, error });

  return (
    <Wrapper>
      {user ? (
        <div>
          <div>Hello {user.name}</div>
          <h2>User info</h2>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>
        </div>
      ) : (
        <div>
          <h3>
            You need to be authenticated to unlock all features of It's Books!
            Click here to{' '}
            <a style={{ color: '#ffefd5' }} href="/api/auth/login">
              login.
            </a>
          </h3>
          <h3
            onClick={() => {
              setModalType(ModalTypes.VISIT);
              setIsModalVisible(true);
            }}
          >
            Continue as a visitor{' '}
          </h3>
        </div>
      )}
    </Wrapper>
  );
};

export default Signin;
