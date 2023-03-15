import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set, onValue } from 'firebase/database'
import { db, auth } from '../firebase'

type SignupForm = {
  username: string,
  email: string,
  password: string,
};

function addUserToDatabase(uid: string, username: string) {
  const usersRef = ref(db, `/users/${uid}`);
  const usernamesRef = ref(db, `/usernames/${username}`);

  set(usersRef, { username: username });
  set(usernamesRef, { uid: uid });
}

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<SignupForm>();
  const onSubmit: SubmitHandler<SignupForm> = data => {
    const usernamesRef = ref(db, `/usernames/${data.username}`);
    return onValue(usernamesRef, (snapshot) => {
      if (snapshot.exists()) {
        setErrorMessage("Username already exists.");
      } else {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((credentials) => {
            addUserToDatabase(credentials.user.uid, data.username);
            navigate("/home");
          })
          .catch((error) => { setErrorMessage(error.message) });
      }
    }, {onlyOnce: true});
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center items-center">
        <label className="block mb-1 text-md">
          Username
          <input {...register("username")} type="text" className="block border-b-[1px] border-bastille-900" required/>
        </label>

        <label className="block mb-1 text-md">
          E-mail
          <input {...register("email")} type="email" className="block border-b-[1px] border-bastille-900" required />
        </label>

        <label className="block mb-4 text-md">
          Password
          <input {...register("password")} type="password" className="block border-b-[1px] border-bastille-900" required />
        </label>

        <p className="text-red-600 mb-2" >{errorMessage}</p>
        <button type="submit" className="bg-neutral-400 text-white rounded p-1 px-4">Sign Up</button>
      </form>
    </>
  );
}