import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { database as db, auth } from '../firebase';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

interface ISignUpForm {
  username: string;
  email: string;  
  password: string;
}

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ISignUpForm>();
  const onSubmit: SubmitHandler<ISignUpForm> = data => {
    let usernamesRef = ref(db, `/usernames/${data.username}`);
    get(usernamesRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setErrorMessage("Username already exists");
        } else {
          createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((credentials) => {
              let usersRef = ref(db, `/users/${credentials.user.uid}`);
              set(usersRef, {username: data.username});
    
              let usernamesRef = ref(db, `/usernames/${data.username}`);
              set(usernamesRef, {uid: credentials.user.uid});
    
              navigate("/home");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        }
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
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
        <button type="submit" className="bg-vin-rouge-300 text-white rounded p-1 px-4">Sign Up</button>
      </form>
    </>
  );
}