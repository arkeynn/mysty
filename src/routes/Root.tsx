import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function Root() {
  const navigate = useNavigate();

  function AccessButtons() {
    if (auth.currentUser == null) {
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
      <p className="text-xl text-white text-center">Create a profile to receive anonymous letters!</p>
      <p className="text-md text-white text-center">Registration required.</p>
      <div className="flex m-4">
        <AccessButtons />
      </div>

      <p className="text-xl text-white text-center">Or send them?</p>
      <p className="text-md text-white text-center">Sending doesn't require registration.</p>
      <button onClick={() => navigate("/send")} className="bg-white rounded p-1 px-4 m-4">WRITE A LETTER</button>
    </div>
  );
}