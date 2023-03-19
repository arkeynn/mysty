import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase'

type LoginFormProps = {
  hidden?: boolean;
}

type LoginForm = {
  email: string;
  password: string;
}

export default function LoginForm( { hidden = false }: LoginFormProps ) {
  const [errorMessage, setErrorMessage] = useState("");
  const {register, handleSubmit} = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginForm> = data => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((credentials) => { navigate("/home") })
      .catch((error) => { setErrorMessage(error.message) });
  };

  return (
    <div hidden={hidden}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center items-center">
        <label className="block mb-1 text-md">
          E-mail
          <input {...register("email")} type="email" className="block bg-transparent border-2 border-white rounded " required />
        </label>

        <label className="block mb-4 text-md">
          Password
          <input {...register("password")} type="password" className="block bg-transparent border-2 border-white rounded " required />
        </label>

        <p className="text-red-600 mb-2" >{errorMessage}</p>
        <button type="submit" className="bg-transparent border-2 border-white rounded p-1 px-4">Log In</button>
      </form>
    </div> 
  );
}