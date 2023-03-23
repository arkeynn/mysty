import { useState, ComponentPropsWithoutRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { db } from '../../../firebase'
import { ref as dbRef, onValue } from 'firebase/database'

interface Form {
  username: string;
}

export default function Username({...props}: ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const {register, handleSubmit} = useForm<Form>();
  const navigate = useNavigate();

  const onFinished: SubmitHandler<Form> = form => {
    const usernamesRef = dbRef(db, `/usernames/${form.username}`);
    return onValue(usernamesRef, (snapshot) => {
      if (snapshot.exists()) {
        navigate(`/ask/${form.username}`);
      } else {
        setError("Username doesn't exist.");
      }
    }, {onlyOnce: true});
  };

  return (
    <div {...props}>
      <form onSubmit={handleSubmit(onFinished)} >
        <label className="block mb-4 text-md">
          Username
          <input {...register("username")} className="block w-full bg-transparent border-2 border-white rounded" />
        </label>

        <p className="text-red-600 mb-2" >{error}</p>
      </form>
    </div>
  );
}