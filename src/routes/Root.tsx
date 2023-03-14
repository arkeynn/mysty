import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'

interface IAccessButtons {
  isSignedIn: boolean
}

export default function Root() {
  const navigate = useNavigate();

  // Render Sign Up + Log In buttons if user is signed out
  // Render Open button if user is signed in
  function AccessButtons() {
    if (null == null) {
      return (
        <>
          <button onClick={() => navigate("/login")} className="bg-white rounded p-1 px-4 m-2">LOG IN</button>
          <button onClick={() => navigate("/signup")} className="bg-white rounded p-1 px-4 m-2">SIGN UP</button>
        </>
      );
    }

    return (
      <>
        <button onClick={() => navigate("/home")} className="bg-white rounded p-1 px-8 m-2">OPEN</button>
      </>
    );
  }

  return (
    <div className="Root flex flex-col justify-center items-center h-[100svh] bg-honey-flower-800">
      <h1 className="text-2xl font-bold text-white">Welcome to Mysty.</h1>
      <p className="text-xl text-white text-center mb-4">Send and receive lovely messages from anonymous followers!</p>
      <div className="flex">
        <AccessButtons />
      </div>
    </div>
  );
}