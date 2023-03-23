import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { DatabaseReference, ref, onValue } from 'firebase/database'
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

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ec4899" fill-opacity="1" d="M0,224L17.1,197.3C34.3,171,69,117,103,117.3C137.1,117,171,171,206,213.3C240,256,274,288,309,282.7C342.9,277,377,235,411,213.3C445.7,192,480,192,514,208C548.6,224,583,256,617,234.7C651.4,213,686,139,720,117.3C754.3,96,789,128,823,122.7C857.1,117,891,75,926,80C960,85,994,139,1029,160C1062.9,181,1097,171,1131,181.3C1165.7,192,1200,224,1234,240C1268.6,256,1303,256,1337,250.7C1371.4,245,1406,235,1423,229.3L1440,224L1440,320L1422.9,320C1405.7,320,1371,320,1337,320C1302.9,320,1269,320,1234,320C1200,320,1166,320,1131,320C1097.1,320,1063,320,1029,320C994.3,320,960,320,926,320C891.4,320,857,320,823,320C788.6,320,754,320,720,320C685.7,320,651,320,617,320C582.9,320,549,320,514,320C480,320,446,320,411,320C377.1,320,343,320,309,320C274.3,320,240,320,206,320C171.4,320,137,320,103,320C68.6,320,34,320,17,320L0,320Z"></path></svg>
      <Sender onSend={onSend} hidden={letterSent} />
      <p hidden={!letterSent} className="text-2xl text-center bg-pink-500 font-eyecatcher">Letter sent! :)</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ec4899" fill-opacity="1" d="M0,224L17.1,197.3C34.3,171,69,117,103,117.3C137.1,117,171,171,206,213.3C240,256,274,288,309,282.7C342.9,277,377,235,411,213.3C445.7,192,480,192,514,208C548.6,224,583,256,617,234.7C651.4,213,686,139,720,117.3C754.3,96,789,128,823,122.7C857.1,117,891,75,926,80C960,85,994,139,1029,160C1062.9,181,1097,171,1131,181.3C1165.7,192,1200,224,1234,240C1268.6,256,1303,256,1337,250.7C1371.4,245,1406,235,1423,229.3L1440,224L1440,0L1422.9,0C1405.7,0,1371,0,1337,0C1302.9,0,1269,0,1234,0C1200,0,1166,0,1131,0C1097.1,0,1063,0,1029,0C994.3,0,960,0,926,0C891.4,0,857,0,823,0C788.6,0,754,0,720,0C685.7,0,651,0,617,0C582.9,0,549,0,514,0C480,0,446,0,411,0C377.1,0,343,0,309,0C274.3,0,240,0,206,0C171.4,0,137,0,103,0C68.6,0,34,0,17,0L0,0Z"></path></svg>
    </>
  );
}