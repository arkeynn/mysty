import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { auth } from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

import Button from '../components/ui/layout/Button'
import ClickToReveal from '../components/ui/layout/ClickToReveal'

import Username from '../components/ui/forms/Username'
import LogIn from '../components/ui/forms/Login'
import SignUp from '../components/ui/forms/SignUp'

export default function Root() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in their account.
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user)
        setLoggedIn(true);
      else 
        setLoggedIn(false);
    });
  }, []);

  return (
    <>
      <section className="text-center font-eyecatcher">
        <h1 className="mb-2 text-4xl" >mysty ;)</h1>
        <p className="text-lg" >Send anonymous letters..</p>
        <p className="mb-4 text-lg" >Receive anonymous letters..</p>

        <Button onClick={ () => navigate("/home") } text="Open" hidden={!loggedIn} />
        <ClickToReveal text="Log In" hiddenComponent={<LogIn />} hidden={loggedIn} /> 
      </section>

      <section className="text-center bg-violet-600 font-eyecatcher">
        <h1 className="mb-2 text-4xl" >Want to receive?</h1>
        <p className="text-lg" >You'll need to create an account.</p>
        <p className="mb-4 text-lg" >You can share invite links for your fans to send letters.</p>

        <ClickToReveal text="Sign Up" hiddenComponent={<SignUp />} />
      </section>
      
      <section className="text-center bg-pink-500 font-eyecatcher">
        <h1 className="mb-2 text-4xl" >Want to send?</h1>
        <p className="text-lg" >You don't need an account to send letters.</p>
        <p className="mb-4 text-lg" >You will need their username, or an invite link.</p>

        <ClickToReveal text="Send a Letter!" hiddenComponent={<Username className="flex flex-col items-center justify-center" />} />
      </section>

      <section className="text-center bg-amber-400 font-eyecatcher">
        <h1 className="mb-2 text-4xl" >CAUTION</h1>
        <p className="text-lg" >Do NOT share sensitive information.</p>
        <p className="text-lg" >Follow common sense, and practice internet safety!</p>
      </section>
    </>
  )
}