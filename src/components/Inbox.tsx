import { useState } from 'react'

import { DataSnapshot, ref, onValue } from 'firebase/database'
import { db } from '../firebase'

import ClosedLetter from './ClosedLetter';

type InboxProps = {
  userUID: string
};

type Letter = {
  id?: string | null // uuid - React list index
  title: string,
  content: string,
  hint: string,
  timestamp: number
};

function saveLetter(snapshot: DataSnapshot): Letter {
  const info = snapshot.val();
  const letter: Letter = {
    id: snapshot.key,
    title: info.title,
    content: info.content,
    hint: info.hint,
    timestamp: info.timestamp
  };

  return letter;
}

export default function Inbox( { userUID }: InboxProps ) {
  const [letters, setLetters] = useState<Letter[]>([]);

  const onClick = () => {
    const inboxRef = ref(db, `/inbox/${userUID}`);

    return onValue(inboxRef, (snapshot) => {
      let savedLetters: Letter[] = [];
      snapshot.forEach((child) => {
        const letter = saveLetter(child);

        savedLetters.push(letter);
      });
      
      setLetters(savedLetters);
    }, {onlyOnce: true});
  };

  return (
    <div className="Inbox flex flex-col">
      <button onClick={onClick}>Refresh</button>
      {
        letters.map((letter) => <ClosedLetter letter={letter} />)
      }
    </div>
  );
}