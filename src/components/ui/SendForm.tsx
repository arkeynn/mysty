import { useParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { DatabaseReference, ref, set, onValue } from 'firebase/database'
import { db } from '../../firebase'

import { v4 as uuidv4 } from 'uuid'

import Section from '../../components/ui/Section'

type LetterForm = {
  title: string
  content: string;
  hint: string;
}

type Letter = {
  title: string;
  content: string;
  hint: string;
  timestamp: number;
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

// Redirects if the username doesn't exist.
function blockIfUserIsInvalid(usernamesRef: DatabaseReference, navigate: Function) {
  return onValue(usernamesRef, (snapshot) => {
    if (!snapshot.exists()) {
      navigate("/notfound");
    }
  }, {onlyOnce: true});
}

export default function SendForm() {
  const {register, handleSubmit} = useForm<LetterForm>();
  const {username} = useParams();
  const navigate = useNavigate();

  const usernamesRef = ref(db, `/usernames/${username}`);

  blockIfUserIsInvalid(usernamesRef, navigate);

  const onSubmit: SubmitHandler<LetterForm> = form => {
    const letterUUID = uuidv4();
    const letterTimestamp = Date.now();

    sendToInbox(usernamesRef, letterUUID, letterTimestamp, form);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col font-eyecatcher bg-pink-500 text-center items-center">
      <label className="block mb-4 text-md">
        Title
        <input {...register("title")} type="text" className="block w-full bg-transparent border-2 border-white rounded" />
      </label>

      <label className="block mb-4 text-md">
        Your message
        <textarea {...register("content")} className="block w-full bg-transparent border-2 border-white rounded" required />
      </label>

      <label className="block mb-4 text-md">
        Hint :)
        <input {...register("hint")} className="block w-full bg-transparent border-2 border-white rounded" />
      </label>

      <button type="submit" className="bg-transparent border-2 border-white rounded p-1 px-4">Send!</button>
    </form>
  );
}