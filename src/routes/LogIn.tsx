import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

type LoginForm = {
  email: string,
  password: string,
};

export default function LogIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = data => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((credentials) => { navigate("/home") })
      .catch((error) => { setErrorMessage(error.message) });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center items-center">
        <label className="block mb-1 text-md">
          E-mail
          <input {...register("email")} type="email" className="block border-b-[1px] border-bastille-900" required />
        </label>

        <label className="block mb-4 text-md">
          Password
          <input {...register("password")} type="password" className="block border-b-[1px] border-bastille-900" required />
        </label>

        <p className="text-red-600 mb-2" >{errorMessage}</p>
        <button type="submit" className="bg-vin-rouge-300 text-white rounded p-1 px-4">Log In</button>
      </form>
    </>
  );
}