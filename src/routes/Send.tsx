import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { ref, onValue } from 'firebase/database'
import { db } from '../firebase'

import Sender from '../components/ui/forms/Sender'

export default function Send() {
  const [letterSent, setletterSent] = useState(false);
  const {username} = useParams();
  const navigate = useNavigate();
  
  const onSend = () => {
    setletterSent(true);
  }

  // Redirect if the username doesn't exist (Invalid URL)
  useEffect(() => {
    const usernamesRef = ref(db, `/usernames/${username}`);

    return onValue(usernamesRef, (snapshot) => {
      if (!snapshot.exists()) {
        navigate("/notfound", {state: {error: "Invalid URL."}});
      }
    }, {onlyOnce: true});
  }, []);

  return (
    <>
      <section className="text-3xl text-center font-eyecatcher">Send a Letter</section>
      <div className="mb-12 text-lg text-center font-poppins">
        <p>Send something to {username}!</p>
        <p>Don't reveal too much!</p>
        <p>Have fun!</p>
      </div>

      <Sender onSend={onSend} hidden={letterSent} />
      <p hidden={!letterSent} className="text-2xl text-center bg-pink-500 font-eyecatcher">Letter sent! :)</p>
    </>
  );
}