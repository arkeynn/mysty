import { useState, ComponentPropsWithoutRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'

import { auth } from '../../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

interface Form {
  email: string;
  password: string;
}

export default function LogIn({...props}: ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const {register, handleSubmit} = useForm<Form>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Form> = form => {
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((credentials) => {
        navigate("/home");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  
  return (
    <div {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center text-center">
        <label className="block mb-1 text-md">
          E-mail
          <input {...register("email")} type="email" required />
        </label>

        <label className="block mb-4 text-md">
          Password
          <input {...register("password")} type="password" required />
        </label>

        <p className="mb-2 text-red-600" >{error}</p>
        <button className="p-1 px-4 bg-transparent border-2 border-white rounded" type="submit">Log In</button>
      </form>
    </div>
  );
}