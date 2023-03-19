import { useState, useEffect } from 'react'

import { DataSnapshot, ref, onValue } from 'firebase/database'
import { db } from '../../firebase'

import ClosedLetter from './ClosedLetter'

type InboxProps = {
  userUID: string
}

type Letter = {
  id?: string | null // uuid - React list index
  title: string;
  content: string;
  hint: string;
  timestamp: number;
  read: boolean;
}

function saveLetter(snapshot: DataSnapshot): Letter {
  const info = snapshot.val();
  const letter: Letter = {
    id: snapshot.key,
    title: info.title,
    content: info.content,
    hint: info.hint,
    timestamp: info.timestamp,
    read: info.read
  };

  return letter;
}

export default function Inbox( { userUID }: InboxProps ) {
  const [letters, setLetters] = useState<Letter[]>([]);

  const inboxRef = ref(db, `/inbox/${userUID}`);

  // Sends a single request to check for inbox content.
  const onCheck = () => {
    return onValue(inboxRef, (snapshot) => {
      let savedLetters: Letter[] = [];
      snapshot.forEach((child) => {
        const letter = saveLetter(child);

        savedLetters.push(letter);
      });
      
      setLetters(savedLetters);
    }, {onlyOnce: true});
  };

  // Automatically update when messages arrive in inbox.
  useEffect(() => {
    return onValue(inboxRef, (snapshot) => {
      let savedLetters: Letter[] = [];
      snapshot.forEach((child) => {
        const letter = saveLetter(child);

        savedLetters.push(letter);
      });
        
      setLetters(savedLetters);
    });
  }, []);


  return (
    <div className="">
      <button className="bg-transparent border-2 border-white rounded p-1 px-4 mt-2 mb-8" onClick={onCheck}>Check</button>
      {
        letters.map((letter) => <ClosedLetter userUID={userUID} letter={letter} />)
      }
    </div>
  );
}