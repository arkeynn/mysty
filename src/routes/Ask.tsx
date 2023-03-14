import { useParams, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ref, get, set } from 'firebase/database'
import { database as db } from '../firebase'
import { v4 as uuidv4 } from 'uuid'

interface ILetterForm {
  title: string
  message: string;
  hint: string;
}

export default function Ask() {
  const navigate = useNavigate();
  const { username } = useParams();

  let usernamesRef = ref(db, `/usernames/${username}`);
  get(usernamesRef)
    .then((snapshot) => {
      if (!snapshot.exists())
        navigate("/notfound");
    });

  const { register, handleSubmit } = useForm<ILetterForm>();
  const onSubmit: SubmitHandler<ILetterForm> = data => {
    let timestamp = Date.now();
    let uuid = uuidv4();

    let usernamesRef = ref(db, `/usernames/${username}`);
    get(usernamesRef)
      .then((snapshot) => {
        if (!snapshot.exists()) return;

        let userUid = snapshot.val().uid;

        let inboxRef = ref(db, `/inbox/${userUid}/${uuid}`);
        set(inboxRef, {title: data.title, message: data.message, hint: data.hint, timestamp: timestamp});
      })
      .catch((error) => {
        console.log(error.message);
      });
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
          <textarea {...register("message")} className="block w-full border-[1px] rounded border-bastille-900" required />
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