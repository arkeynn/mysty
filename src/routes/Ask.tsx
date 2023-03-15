import { useParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { DatabaseReference, ref, set, onValue } from 'firebase/database'
import { db } from '../firebase'

import { v4 as uuidv4 } from 'uuid'

type LetterForm = {
  title: string
  content: string;
  hint: string;
};

type Letter = {
  title: string,
  content: string,
  hint: string,
  timestamp: number
};

function blockIfUserIsInvalid(usernamesRef: DatabaseReference, navigate: Function) {
  return onValue(usernamesRef, (snapshot) => {
    if (!snapshot.exists()) {
      navigate("/notfound");
    }
  }, {onlyOnce: true});
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
        timestamp: letterTimestamp
      };

      set(inboxRef, letter);
    }
  }, {onlyOnce: true});
}

export default function Ask() {
  const navigate = useNavigate();
  const { username } = useParams();

  const usernamesRef = ref(db, `/usernames/${username}`);
  blockIfUserIsInvalid(usernamesRef, navigate);
  
  const { register, handleSubmit } = useForm<LetterForm>();
  const onSubmit: SubmitHandler<LetterForm> = form => {
    const letterUUID = uuidv4();
    const letterTimestamp = Date.now();

    sendToInbox(usernamesRef, letterUUID, letterTimestamp, form);
  };

  return (
    <div className="Ask flex">
      <h1>Send a letter to: {username}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center items-center">
        <label className="block mb-1 text-md">
          Need a title?
          <input {...register("title")} type="text" className="block border-b-[1px] border-bastille-900" />
        </label>

        <label className="block mb-4 text-md">
          Write whatever you want.
          <textarea {...register("content")} className="block w-full border-[1px] rounded border-bastille-900" required />
        </label>

        <label className="block mb-4 text-md">
          Feeling risky? Give them a hint.
          <input {...register("hint")} className="block border-b-[1px] border-bastille-900" />
        </label>

        <button type="submit" className="bg-vin-rouge-300 text-white rounded p-1 px-4">SEND!</button>
      </form>
    </div>
  );
}