import { useState, useEffect } from 'react'

import { ref, update } from 'firebase/database'
import { ref as storageRef, getBlob } from 'firebase/storage'
import { storage, db } from '../../firebase'

import { Letter } from '../../types'

import PopUpMedia from './PopUpMedia'

type ClosedLetterProps = {
  userUID: string;
  letter: Letter;
}

export default function ClosedLetter({ userUID, letter }: ClosedLetterProps) {
  const [media, setMedia] = useState<Blob>(new Blob());
  const [opened, setOpened] = useState(false);
  const [color, setColor] = useState(letter.read ? "bg-neutral-600" : "bg-red-600");

  useEffect(() => {
    if (letter.hasMedia) {
      const mediaRef = storageRef(storage, `inbox/${userUID}/${letter.id}`);

      getBlob(mediaRef)
        .then((blob) => {
          setMedia(blob);
        });
    }
  }, []);

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
          letter.hint != null && letter.hint.length > 0 ? <p>HINT: {letter.hint}</p> : <></>
        }
        {
          letter.hasMedia ? <PopUpMedia src={URL.createObjectURL(media)} /> : <></>
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