type Props = {
  name: string;
  userInput: string;
  id: string;
  onClickEvent: (name: string) => void;
};

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
