import {
  BookPoll,
  Button,
  Content,
  FormWrapper,
  Wrapper
} from 'components/styled';
import { useState } from 'react';
import { Book } from 'types';

const Poll = () => {
  const [polls, setPolls] = useState<number[]>([1]);

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
  //WIP
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

    // you have to take the current bookClub and add the new poll to the array
    // use your selectedBookClub object (from context)
    // something like
    // const updatedBookClub = {
    //   ...selectedBookClub,
    //   poll: newPoll
    // }
    // then you just call the updateClub function from context (exists)
    //
    console.log(newPoll);
  };
  const { name, author } = formValue;

  return (
    <Wrapper>
      <h1> What do you want to read next?</h1>
      <Content>
        <FormWrapper>
          <h2>Please suggest a minimum of three books.</h2>
          <h2>You can add more books by pressing on 'add'</h2>
          <h2></h2>
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
              <Button type="submit">Submit</Button>
            </fieldset>
          </form>
        </FormWrapper>
      </Content>
    </Wrapper>
  );
};

export default Poll;
