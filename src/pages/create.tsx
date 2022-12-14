import { Autocomplete } from 'components/Autocomplete';
import { MemberNames } from 'components/Members';
import {
  Button,
  Content,
  DropdownWrapper,
  FormWrapper,
  Header,
  Wrapper
} from 'components/styled';
import { BooksContext } from 'context';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { BookClub } from 'types';
import { getUsersByIDArray } from 'utils';
// empty values to be used in form when creating club
const emptyValues = {
  name: '',
  currentlyReading: '',
  members: '',
  author: ''
};
// Creates new club OR allows for editing existing club.
// this is a form with inputs, updates mongo
const CreateClub = () => {
  const {
    users,
    selectedUser,
    selectedUserObject,
    selectedClub,
    setSelectedClub,
    updateClub,
    addClub
  } = useContext(BooksContext);
  // will display members in club
  const [selectedMembers, setSelectedMembers] = useState(
    selectedClub?.members || []
  );
  // initial form values for existing club or empty "" for new club.
  const [formValue, setFormValue] = useState({
    name: selectedClub?.name || '',
    currentlyReading: selectedClub?.currentlyReading.name || '',
    members: '',
    author: selectedClub?.currentlyReading.author || ''
  });
  // uses query to determine whether the club is being created or being edited.
  const { query, back } = useRouter();

  const isEditing = query.isEditing;
  // if user is not using editing query, aka, is creating club then render:
  useEffect(() => {
    if (!isEditing) {
      setFormValue({
        ...emptyValues
      });
      setSelectedClub(null);
    }
  }, []);
  // in members section, will filter array of members if input matches part of name
  const usersFilteredByInput = users.filter((user) =>
    user.name.toLowerCase().includes(formValue.members.toLowerCase())
  );
  // finds name and pushes it to members
  const handleSelect = (name: string) => {
    if (selectedMembers.includes(name)) return;
    setSelectedMembers([...selectedMembers, name]);
  };
  // updates with changes value
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  };
  // on Submit creates or edits the form.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // IF editing updates exisiting club in db.
    if (isEditing) {
      const updatedClub = {
        ...selectedClub,
        name: formValue.name,
        currentlyReading: {
          ...selectedClub?.currentlyReading,
          name: formValue.currentlyReading,
          author: formValue.author
        },
        members: selectedMembers,
        owner: selectedClub?.owner
      };
      updateClub([updatedClub] as BookClub[]);
      return;
    }
    // if creating it adds it.
    const newClub: BookClub = {
      _id: '',
      name: formValue.name,
      currentlyReading: {
        _id: '',
        name: formValue.currentlyReading,
        author: formValue.author
      },
      poll: null,
      previouslyRead: [],
      members: selectedMembers,
      owner: selectedUser
    };
    addClub(newClub);
  };
  // clicking on member names will remove them from club.
  const handleRemoveMember = (userID: string) => {
    setSelectedMembers(
      selectedMembers.filter((memberID) => {
        if (memberID === userID) {
          return false;
        }
        return true;
      })
    );
  };

  const {
    name: clubName,
    currentlyReading: reading,
    author,
    members
  } = formValue;
  return (
    <Wrapper>
      <Header>
        {/* <h1>Hi, {selectedUserObject?.name}!</h1> */}
        {isEditing && (
          <h3>
            Are you sure you want to edit this Book Club? Please edit the fields
            below as needed.
          </h3>
        )}
        {!isEditing && (
          <h3>
            Are you ready to create a new Book Club? Please fill out the form
            below to get started.
          </h3>
        )}
        <h3>
          {` Remember that you can only add existing It's a Book! users to your
          book club.`}
        </h3>
      </Header>
      <Content>
        <FormWrapper>
          <h2>Your book club:</h2>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <fieldset>
              <label>
                <h3>Name of Book Club:</h3>
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={clubName}
                />
              </label>
              <label>
                <h3>Currently Reading:</h3>
                <input
                  name="currentlyReading"
                  type="text"
                  onChange={handleChange}
                  value={reading}
                />
                <h3>By:</h3>
                <input
                  name="author"
                  type="text"
                  onChange={handleChange}
                  value={author}
                />
              </label>
              <h3>Members:</h3>
              <MemberNames
                members={getUsersByIDArray(users, selectedMembers)}
                handleRemoveMember={handleRemoveMember}
              />
              <label>
                <input
                  name="members"
                  placeholder="Start typing another user's name"
                  type="text"
                  onChange={handleChange}
                  value={members}
                />
                <DropdownWrapper>
                  {usersFilteredByInput.map((user, i) => (
                    <Autocomplete
                      name={user.name}
                      userInput={formValue.members}
                      onClickEvent={handleSelect}
                      id={user._id}
                    />
                  ))}
                </DropdownWrapper>
              </label>
              <Button type="submit">Submit</Button>
            </fieldset>
          </form>
        </FormWrapper>
      </Content>
    </Wrapper>
  );
};
export default CreateClub;
