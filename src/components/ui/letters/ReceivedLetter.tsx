import { useState, useEffect } from 'react'

import { auth, storage, db } from '../../../firebase'
import { ref, update } from 'firebase/database'
import { ref as storageRef, getBlob } from 'firebase/storage'

import { Letter } from '../../../types'
import PopUpMedia from './PopUpMedia'

interface Props {
  letter: Letter;
}

export default function ReceivedLetter({ letter }: Props) {
  const [media, setMedia] = useState<Blob>(new Blob());
  const [opened, setOpened] = useState(false);
  const [color, setColor] = useState(letter.read ? "bg-neutral-600" : "bg-red-600");
  const {currentUser} = auth;

  useEffect(() => {
    if (!letter.hasMedia) return;

    const mediaRef = storageRef(storage, `inbox/${currentUser?.uid}/${letter.id}`);
    getBlob(mediaRef)
      .then((blob) => {
        setMedia(blob);
      });
  }, []);

  const openLetter = () => {
    setOpened(true);
  
    if (!letter.read) {
      const readRef = ref(db, `/inbox/${currentUser?.uid}/${letter.id}`);

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