import { BooksContext } from 'context';
import { useContext } from 'react';
import { Loading } from 'components/Loading';
import styled from 'styled-components';
import { Navbar } from './Navbar';

const Wrapper = styled.div``;

export const Layout = ({ children }: any) => {
  const { isLoading } = useContext(BooksContext);
  return (
    <Wrapper>
      <Navbar />
      {isLoading ? <Loading /> : children}
    </Wrapper>
  );
};
