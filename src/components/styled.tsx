import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 4rem;
  background-color: #a7cbd9;
  color: #1b4552;
  padding: 3vw;
  border-radius: 10px;
  display: grid;
  grid: 1fr 1fr;
`;
export const Header = styled.div`
  background-color: #68a0a6;
  border: 2px solid #183e4b;
  border-radius: 6px;
  margin: 1rem;
  padding: 1rem;
`;
export const Currently = styled.div`
  border-radius: 6px;
  max-width: 30vw;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: row;
`;

export const DropdownWrapper = styled.div`
  max-height: 200px;
  overflow-y: scroll;
`;

export const PinkWrapper = styled.div`
  border: 2px solid #784f4f;
  border-radius: 6px;
  background-color: #d9a7b0;
  padding: 2vw;
  min-width: 40vw;
  margin: 2vw 2vh;
`;
export const Vote = styled.ul`
  margin: 1rem;
`;
export const BlueWrapper = styled.div`
  border: 2px solid #784f4f;
  border-radius: 6px;
  background-color: #f2e0d5;
  padding: 2vw;
  min-width: 40vw;
  margin: 2vw 2vh;
`;

export const FormWrapper = styled.div`
  border: 2px solid #183e4b;
  border-radius: 6px;
  background-color: #68a0a6;
  padding: 2vw;
  min-width: 60vw;
  margin: 2vw 2vh;
  color: #183e4b;
`;
export const ClubWrapper = styled.div`
  border: 2px solid #183e4b;
  border-radius: 6px;
  margin: 1rem;
  padding: 1rem;
  background-color: #68a0a6;
  grid: 1fr 1fr;
`;

export const List = styled.li`
  list-style: none;
`;
export const Button = styled.button`
  padding: 1vh;
  margin: 1rem;
  justify-content: space-between;
  border-radius: 6px;
  align-content: center;
  color: #f2e0d5;
`;
export const Members = styled.div`
  color: #784f4f;
`;
export const Leave = styled.button`
  padding: none;
  color: #d74a49;
  padding: 0rem 10vw;
`;
export const Edit = styled.button`
  color: #1b4552;
  padding: 0rem 17vw;
`;
export const Join = styled.button`
  color: #fb6095;
  padding: 0rem 17vw;
`;
export const Banner = styled.div`
  color: #183e4b;
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.span`
  font-style: italic;
  font-weight: 700;
`;
export const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #f2e0d5;
  background-color: #784f4f;
  .pages {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }
`;
export const Home = styled.a`
  font-size: 1.5rem;
`;
export const AllClubs = styled.div`
  display: grid;
`;
export const RatingsWrapper = styled.div``;

export const Ratings = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const BookPoll = styled.div`
  display: flex;
`;
export const ModalWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 999;
  position: fixed;
  filter: opacity(0.9);
  background-color: #68a0a6;
  top: 0;
  left: 0;
`;

export const ModalContent = styled.div`
  min-height: 50vh;
  width: 50vw;
  text-align: center;
  margin: auto;
  margin-top: 2rem;
  border: 2px solid #183e4b;
  border-radius: 6px;
  background-color: #183e4b;
  color: white;
  padding: 1rem;
`;
export const Features = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  color: #d9a7b0;
`;
export const Account = styled.div`
  color: #d9a7b0;
`;
