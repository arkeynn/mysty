import { useState } from 'react'
import { Message } from './Inbox'

type LetterProps = {
  message: Message;
};

export default function Letter({ message }: LetterProps) {
  const [hidden, setHidden] = useState(true);

  const onClick = () => {
    if (hidden)
      setHidden(false);
    else
      setHidden(true);
  };

  return (
    <>
      <p onClick={onClick} >{message.title} - {message.timestamp}</p>
      <p hidden={hidden}>
        {message.content}
        -
        {message.hint}
      </p>
    </>
  );
}