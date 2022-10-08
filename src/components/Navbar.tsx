import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import { GiBookshelf, GiCat } from 'react-icons/gi';
import { ImHome3, ImPlus } from 'react-icons/im';
import { Home, NavWrapper } from './styled';

// uses user from Auth0 to determine whether user is logged in or not/toggles between sign-in/log-out.
// contains links to all pages.
export const Navbar = () => {
  const { user } = useUser();
  return (
    <NavWrapper>
      <Link href={'/'}>
        <Home>
          <GiBookshelf />
          {` It's Books! `} <GiBookshelf />
        </Home>
      </Link>
      <div className="pages">
        <Link href={'/dashboard'}>
          <a>
            <ImHome3 />
            {''} Dashboard
          </a>
        </Link>
        <Link href={'/create'}>
          <a>
            <ImPlus /> Create
          </a>
        </Link>

        {user ? (
          <>
            <Link href="/api/auth/logout">
              <a>Sign Out</a>
            </Link>
          </>
        ) : (
          <a href="/api/auth/login">Login</a>
        )}
      </div>
    </NavWrapper>
  );
};
