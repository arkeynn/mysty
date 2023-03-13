import { useForm, SubmitHandler } from "react-hook-form";

interface ISignUpForm {
  username: String;
  email: String;  
  password: String;
}

export default function SignUp() {
  const { register, handleSubmit } = useForm<ISignUpForm>();
  const onSubmit: SubmitHandler<ISignUpForm> = data => {
    alert(`
      Username: ${data.username}
      E-mail: ${data.email}
      Password: ${data.password}

      Sve radi :)
    `);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center items-center border-2 p-4 rounded border-bastille-900">
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

        <button type="submit" className="bg-vin-rouge-300 text-white rounded p-1 px-4">Sign Up</button>
      </form>
    </>
  );
}