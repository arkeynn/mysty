import { useState, useEffect, ComponentPropsWithoutRef } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { storage, db } from '../../../firebase'
import { DatabaseReference, ref as dbRef, set, onValue } from 'firebase/database'
import { ref as storageRef, uploadBytesResumable } from 'firebase/storage'

import { v4 as uuidv4 } from 'uuid'
import { Letter, LetterForm } from '../../../types'

interface Props extends ComponentPropsWithoutRef<"div"> {
  onSend(): void;
}

export default function Sender({onSend, ...props}: Props) {
  const {register, handleSubmit} = useForm<LetterForm>();
  const {username} = useParams();

  const onSubmit: SubmitHandler<LetterForm> = form => {
    const letterUUID = uuidv4();
    const letterTimestamp = Date.now();

    const usernamesRef = dbRef(db, `/usernames/${username}`);

    return onValue(usernamesRef, (snapshot) => {
      if (!snapshot.exists()) return;

      const userUID = snapshot.val().uid;
      const inboxRef = dbRef(db, `/inbox/${userUID}/${letterUUID}`);

      const letter: Letter = {
        title: form.title,
        content: form.content,
        hint: form.hint,

        hasMedia: form.file?.length != 0 ? true : false,

        timestamp: letterTimestamp,
        read: false,
      };

      if (form.file != undefined) {
        if (form.file?.length != 0) {
          const photoRef = storageRef(storage, `/inbox/${userUID}/${letterUUID}`);

          uploadBytesResumable(photoRef, form.file[0]);
        }
      }
      
      set(inboxRef, letter);
      onSend();
    }, {onlyOnce: true});
  };

    return (
      <div {...props}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center text-center bg-pink-500 font-eyecatcher">
          <label className="block mb-4 text-md">
            Title
            <input {...register("title")} type="text" className="block w-full bg-transparent border-2 border-white rounded" required/>
          </label>

          <label className="block mb-4 text-md">
            Your message
            <textarea {...register("content")} cols={40} rows={6} className="block bg-transparent border-2 border-white rounded scrollbar-hide" required />
          </label>

          <label className="block mb-4 text-md">
            Hint
            <input {...register("hint")} className="block w-full bg-transparent border-2 border-white rounded" />
          </label>

          <div className="flex flex-col items-center justify-center gap-2 mb-4">
            <label className="p-1 px-4 border-2 border-white rounded text-md">
              Add a Photo
              <input {...register("file")} type="file" accept="image/png, image/jpeg" hidden />
            </label>
          </div>

          <button type="submit" className="p-1 px-4 bg-transparent border-2 border-white rounded">Send!</button>
        </form>
      </div> 
    );
}