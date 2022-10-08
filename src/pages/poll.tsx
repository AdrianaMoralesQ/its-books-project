import {
  Content,
  FormWrapper,
  Wrapper,
  BookPoll,
  Button
} from 'components/styled';

import { useContext, useState } from 'react';
import { Book, BookClub } from 'types';
import { BooksContext } from 'context';
import { updateBookClub } from 'context/api';
import { useRouter } from 'next/router';
import { BookClubs } from 'components/BookClubs';
// Poll component, uses selected club
const Poll = () => {
  const { selectedClub } = useContext(BooksContext);
  const [polls, setPolls] = useState<number[]>([1]);
  const { push, query } = useRouter();
  // when creating a new poll, sets input value to empty.
  const [formValue, setFormValue] = useState<any>({
    name: '',
    author: ''
  });
  // on change replaces previous state with newPoll values
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prevState: any) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };
  // adds form inputs for author.
  const addFormFields = () => {
    setPolls([...polls, polls.length + 1]);
  };
  // on submit creates a new poll.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //new poll uses Book[] but only replaces id, name and author.
    const newPoll: Book[] = polls.map((_, i) => ({
      _id: '',
      name: formValue[`name${i}`],
      author: formValue[`author${i}`]
    }));
    // updates BookClub[] in db
    const updatedBookClub = { ...selectedClub, poll: newPoll };
    console.log(newPoll);
    console.log(selectedClub?.poll);
    updateBookClub([updatedBookClub] as BookClub[]);
    return;
  };
  const handleBack = () => {
    push('/club');
  };
  const { name, author } = formValue;

  return (
    <Wrapper>
      <h1> What do you want to read next?</h1>
      <Content>
        <FormWrapper>
          <h2>Please suggest a minimum of three books.</h2>
          <h2>You can add more books by clicking on 'add'</h2>
          <h2>Clicking on 'Submit' will post your poll to the club</h2>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <fieldset>
              {polls.map((_, i) => (
                <BookPoll>
                  <label>
                    <h3>Title:</h3>
                    <input
                      name={`name${i}`}
                      type="text"
                      onChange={handleChange}
                      value={formValue[`${name}${i}`]}
                    />{' '}
                  </label>
                  <label>
                    <h3>By:</h3>
                    <input
                      name={`author${i}`}
                      type="text"
                      onChange={handleChange}
                      value={formValue[`${author}${i}`]}
                    />{' '}
                  </label>
                </BookPoll>
              ))}
              <Button onClick={addFormFields}>Add</Button>
              <Button type="submit" onClick={handleBack}>
                Submit
              </Button>
            </fieldset>
          </form>
        </FormWrapper>
      </Content>
    </Wrapper>
  );
};

export default Poll;
