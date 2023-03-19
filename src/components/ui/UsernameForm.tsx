import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { DatabaseReference, ref, onValue } from 'firebase/database'
import { db } from '../../firebase'

type UsernameFormProps = {
  hidden?: boolean;
}

type UsernameForm = {
  username: string;
}

export default function UsernameForm( {hidden = false}: UsernameFormProps ) {
  const [errorMessage, setErrorMessage] = useState("");
  const {register, handleSubmit} = useForm<UsernameForm>();
  const navigate = useNavigate();

  const onFinished: SubmitHandler<UsernameForm> = form => {
    const usernamesRef = ref(db, `/usernames/${form.username}`);
    return onValue(usernamesRef, (snapshot) => {
      if (snapshot.exists()) {
        navigate(`/ask/${form.username}`);
      } else {
        setErrorMessage("Username doesn't exist.");
      }
    }, {onlyOnce: true});
  }

  return (
    <div hidden={hidden}>
      <form onSubmit={handleSubmit(onFinished)} >
        <label className="block mb-4 text-md">
          Username
          <input {...register("username")} className="block w-full bg-transparent border-2 border-white rounded" />
        </label>

        <p className="text-red-600 mb-2" >{errorMessage}</p>
      </form>
    </div>
  );
}