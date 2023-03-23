import { useState, ComponentPropsWithoutRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form'

import { db, auth } from '../../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref as dbRef, set, onValue } from 'firebase/database'

interface Form {
  username: string;
  email: string;
  password: string;
}

export default function SignUp({...props}: ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState("");
  const {register, handleSubmit} = useForm<Form>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Form> = form => {
    const usernamesRef = dbRef(db, `/usernames/${form.username}`);

    return onValue(usernamesRef, (snapshot) => {
      if (!snapshot.exists()) return setError("Username already exists.");

      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then((credentials) => {
          const usersRef = dbRef(db, `/users/${auth.currentUser?.uid}`);
          
          // Add user to database, and their username.
          set(usersRef, {username: form.username});
          set(usernamesRef, {uid: auth.currentUser?.uid});

          navigate("/home");
        })
        .catch((error) => {
          setError(error.message);
        });
    }, {onlyOnce: true});
  };
  
  return (
    <div {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center text-center">
        <label className="block mb-4 text-md">
          Username
          <input {...register("username")} type="text" className="block bg-transparent border-2 border-white rounded" required/>
        </label>

        <label className="block mb-4 text-md">
          E-mail
          <input {...register("email")} type="email" className="block bg-transparent border-2 border-white rounded" required />
        </label>

        <label className="block mb-4 text-md">
          Password
          <input {...register("password")} type="password" className="block bg-transparent border-2 border-white rounded" required />
        </label>

        <p className="mb-2 text-red-600" >{error}</p>
        <button type="submit" className="p-1 px-4 bg-transparent border-2 border-white rounded">Sign Up</button>
      </form>
    </div> 
  );
}