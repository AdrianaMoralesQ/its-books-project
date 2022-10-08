// Autocomplete component - is used in form to autocomplete names of existing members as users type them.

type Props = {
  name: string;
  userInput: string;
  id: string;
  onClickEvent: (name: string) => void;
};
//is exported and used in create. Checks that user input & existing name in database match as lowercase strings.
export const Autocomplete = ({ name, userInput, id, onClickEvent }: Props) => {
  const userNameLowercase = name.toLowerCase();
  const userInputLowercase = userInput.toLowerCase();

  if (userNameLowercase.includes(userInputLowercase)) {
    return (
      <div>
        <strong onClick={() => onClickEvent(id)}>{name}</strong>
      </div>
    );
  }

  return <div>{name}</div>;
};
