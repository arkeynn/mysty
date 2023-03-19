import { useState } from 'react'

type ClosedLetterProps = {
  letter: Letter;
}

type Letter = {
  title: string;
  content: string;
  hint: string;
  timestamp: number;
}

export default function ClosedLetter({ letter }: ClosedLetterProps) {
  const [opened, setOpened] = useState(false);

  const openLetter = () => setOpened(true);
  const closeLetter = () => setOpened(false);

  if (opened) {
    return (
      <div onClick={closeLetter} className="flex flex-col items-center gap-4 p-2 border-b-black border-b-[1px] bg-violet-600 overflow-hidden">
        <div className="flex flex-row gap-4">
          <p>▲</p> 
          <p>{letter.title}</p>
        </div>
        <p>{letter.content}</p>
        {
          letter.hint.length > 0 ? <p>HINT: {letter.hint}</p> : <p></p>
        }
        <p>{new Date(letter.timestamp).toDateString()}</p>
      </div>
    );
  } else {
    return (
      <div onClick={openLetter} className="flex flex-row text-center justify-center gap-4 p-2 border-b-black border-b-[1px] bg-red-600 overflow-hidden">
        <p>▼</p>
        <p>{letter.title}</p>
      </div>
    );
  }
}