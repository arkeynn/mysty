import { useState, ComponentPropsWithoutRef, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

import { auth, db } from '../../../firebase'
import { ref as dbRef, update, onValue } from 'firebase/database'

import { generate } from 'short-uuid'

interface Props extends ComponentPropsWithoutRef<"div"> {
  username: string;
}

interface Form {
  question: string;
}

export default function Question({username, ...props}: Props) {
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const {register, handleSubmit} = useForm<Form>();
  const {currentUser} = auth;

  const onSubmit: SubmitHandler<Form> = form => {
    let questionUUID = generate();
    const questionRef = dbRef(db, `/questions/${currentUser?.uid}/${questionUUID}`);

    return onValue(questionRef, (snapshot) => {
      if (snapshot.exists()) 
        questionUUID = generate();

      update(questionRef, {question: form.question});
      setLink(`${window.location.origin}/q/${username}/${questionUUID}`);
    }, {onlyOnce: true});
  };
  
  return (
    <div {...props}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center text-center">
        <label className="block mb-1 text-md">
          Question
          <input {...register("question")} required />
        </label>

        <p className="mb-2 text-red-600" >{error}</p>
        <p>{link}</p>
        <button className="p-1 px-4 bg-transparent border-2 border-white rounded" type="submit">Create</button>
      </form>
    </div>
  );
}