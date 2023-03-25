import { useState, useEffect } from 'react'

import { auth, db } from '../../../firebase'
import { ref as dbRef, onValue } from 'firebase/database'

import ReceivedLetter from './ReceivedLetter'
import { Letter } from '../../../types'

export default function Inbox() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const {currentUser} = auth;

  // Automatically update when messages arrive in inbox.
  useEffect(() => {
    const inboxRef = dbRef(db, `/inbox/${currentUser?.uid}`);

    return onValue(inboxRef, (snapshot) => {
      let savedLetters: Letter[] = [];

      snapshot.forEach((child) => {
        const info = child.val();
        const letter: Letter = {
          id: child.key,
        
          title: info.title,
          content: info.content,
          hint: info.hint,
      
          hasMedia: info.hasMedia,
      
          timestamp: info.timestamp,
          read: info.read
        };

        savedLetters.push(letter);
      });

      setLetters(savedLetters);
    });
  }, []);

  return (
    <div className="">
      {
        letters.map((letter) => <ReceivedLetter key={letter.id} letter={letter} />)
      }
    </div>
  );
}