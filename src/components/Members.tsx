import { User } from 'types';
// import { BooksContext } from 'context';
// import { useContext, useState } from 'react';

type Props = {
  members: User[];
  handleRemoveMember?: (userID: string) => void;
};
// maps over member names to provide list of users ins that club aka club members
// that upon clicking removes the clicked name from list.
// used in create.
export const MemberNames = ({ members, handleRemoveMember }: Props) => {
  return (
    <div>
      {members.map((member) => {
        return (
          <div
            onClick={
              handleRemoveMember
                ? () => handleRemoveMember(member._id)
                : undefined
            }
          >
            {member.name}
          </div>
        );
      })}
    </div>
  );
};
