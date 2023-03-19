import { useState, useEffect } from 'react'

import { DataSnapshot, ref, update } from 'firebase/database'
import { db } from '../../firebase'

type ClosedLetterProps = {
  userUID: string;
  letter: Letter;
}

type Letter = {
  id?: string | null // uuid - React list index
  title: string;
  content: string;
  hint: string;
  timestamp: number;
  read: boolean;
}

export default function ClosedLetter({ userUID, letter }: ClosedLetterProps) {
  const [opened, setOpened] = useState(false);
  const [color, setColor] = useState(letter.read ? "bg-neutral-600" : "bg-red-600");

  const openLetter = () => {
    setOpened(true);
  
    if (!letter.read) {
      const readRef = ref(db, `/inbox/${userUID}/${letter.id}`);

      letter.read = true;
      update(readRef, {read: "true"});
      setColor("bg-neutral-600");
    }
  };
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
          letter.hint != null && letter.hint.length > 0 ? <p>HINT: {letter.hint}</p> : <p></p>
        }
        <p>{new Date(letter.timestamp).toDateString()}</p>
      </div>
    );
  } else {
    return (
      <div onClick={openLetter} className={`flex flex-row text-center justify-center gap-4 p-2 border-b-black border-b-[1px] ${color} overflow-hidden`}>
        <p>▼</p>
        <p>{letter.title}</p>
      </div>
    );
  }
}