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

const Poll = () => {
  const { selectedClub } = useContext(BooksContext);
  const [polls, setPolls] = useState<number[]>([1]);
  const { push, query } = useRouter();
  const [formValue, setFormValue] = useState<any>({
    name: '',
    author: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prevState: any) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };

  const addFormFields = () => {
    setPolls([...polls, polls.length + 1]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPoll: Book[] = polls.map((_, i) => ({
      _id: '',
      name: formValue[`name${i}`],
      author: formValue[`author${i}`]
    }));

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
