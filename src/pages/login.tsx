import { useUser } from '@auth0/nextjs-auth0';
import { Wrapper } from 'components/styled';
import Link from 'next/link';

const Signin = () => {
  const { user, error } = useUser();

  console.log({ user, error });

  return (
    <Wrapper>
      {user ? (
        <div>
          <div>
            Hello {user.name}
            <Link href="/api/auth/logout">
              <a>Logout</a>
            </Link>
          </div>
          <h2>User info</h2>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>
        </div>
      ) : (
        <div>
          <h3>
            You need to be authenticated, please{' '}
            <a style={{ color: '#ffefd5' }} href="/api/auth/login">
              login
            </a>
          </h3>
        </div>
      )}
    </Wrapper>
  );
};

export default Signin;
