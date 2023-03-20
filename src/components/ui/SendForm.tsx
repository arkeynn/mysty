import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { DatabaseReference, ref, set, onValue } from 'firebase/database'
import { ref as storageRef, uploadBytesResumable } from 'firebase/storage'
import { storage, db } from '../../firebase'

import { v4 as uuidv4 } from 'uuid'
import { Letter } from '../../types'

type SendFormProps = {
  hidden?: boolean;
  onSend?: Function;
}

type LetterForm = {
  title: string
  content: string;
  hint: string;
  file?: FileList;
}

function sendToInbox(usernamesRef: DatabaseReference, letterUUID: string, letterTimestamp: number, form: LetterForm) {
  return onValue(usernamesRef, (snapshot) => {
    if (snapshot.exists()) {
      const userUID = snapshot.val().uid;
      const inboxRef = ref(db, `/inbox/${userUID}/${letterUUID}`);

      const letter : Letter = {
        title: form.title,
        content: form.content,
        hint: form.hint,

        hasMedia: form.file != null ? true : false,

        timestamp: letterTimestamp,
        read: false,
      };
      
      if (form.file != null) {
        const mediaRef = storageRef(storage, `/inbox/${userUID}/${letterUUID}`);
        
        uploadBytesResumable(mediaRef, form.file[0], {contentType: "image/png"})
          .then((snapshot) => {
            console.log("File upload success!");
        });
      }

      set(inboxRef, letter);
    }
  }, {onlyOnce: true});
}

export default function SendForm({ hidden = false, onSend }: SendFormProps) {
  const [fileInputMessage, setFileInputMessage] = useState("");
  const {register, handleSubmit} = useForm<LetterForm>();
  const {username} = useParams();

  const onSubmit: SubmitHandler<LetterForm> = form => {
    const letterUUID = uuidv4();
    const letterTimestamp = Date.now();

    const usernamesRef = ref(db, `/usernames/${username}`);

    sendToInbox(usernamesRef, letterUUID, letterTimestamp, form);

    if (onSend != null) {
      onSend();
    }
  };

  return (
    <div hidden={hidden}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col font-eyecatcher bg-pink-500 text-center items-center">
        <label className="block mb-4 text-md">
          Title
          <input {...register("title")} type="text" className="block w-full bg-transparent border-2 border-white rounded" required/>
        </label>

        <label className="block mb-4 text-md">
          Your message
          <textarea {...register("content")} cols={40} rows={6} className="block bg-transparent border-2 border-white rounded scrollbar-hide" required />
        </label>

        <label className="block mb-4 text-md">
          Hint :)
          <input {...register("hint")} className="block w-full bg-transparent border-2 border-white rounded" />
        </label>

        <div className="flex flex-row justify-center items-center mb-4 gap-2">
          <b className="text-pink-500" >{fileInputMessage}</b>
          <label className="border-2 border-white rounded p-1 px-4 text-md">
            Add a Photo
            <input {...register("file")} type="file" accept="image/png, image/jpeg" hidden/>
          </label>
          <b>{fileInputMessage}</b>
        </div>

        <button type="submit" className="bg-transparent border-2 border-white rounded p-1 px-4">Send!</button>
      </form>
    </div>
  );
}