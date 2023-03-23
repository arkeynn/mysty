import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { auth, db } from '../firebase'
import { DatabaseReference, ref, onValue } from 'firebase/database'

import Section from '../components/ui/Section'
import Inbox from '../components/ui/Inbox'

export default function Home() {
  const [username, setUsername] = useState("");
  const {currentUser} = auth;

  if (currentUser == null) {
    return <Navigate to="/" />
  }

  // Fetch their username and save to state.
  useEffect(() => {
    const usernameRef = ref(db, `/users/${currentUser.uid}/username`);

    return onValue(usernameRef, (snapshot) => {
      setUsername(snapshot.val());
    }, {onlyOnce: true});    
  }, []);

  return (
    <div className="font-poppins text-center">
      <div className="bg-violet-600 text-center p-4">
        <h1 className="font-eyecatcher text-3xl">Hello, {username}!</h1>
      </div> 
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#7c3aed" fill-opacity="1" d="M0,96L15,122.7C30,149,60,203,90,218.7C120,235,150,213,180,197.3C210,181,240,171,270,144C300,117,330,75,360,85.3C390,96,420,160,450,176C480,192,510,160,540,144C570,128,600,128,630,128C660,128,690,128,720,117.3C750,107,780,85,810,74.7C840,64,870,64,900,90.7C930,117,960,171,990,165.3C1020,160,1050,96,1080,96C1110,96,1140,160,1170,197.3C1200,235,1230,245,1260,218.7C1290,192,1320,128,1350,90.7C1380,53,1410,43,1425,37.3L1440,32L1440,0L1425,0C1410,0,1380,0,1350,0C1320,0,1290,0,1260,0C1230,0,1200,0,1170,0C1140,0,1110,0,1080,0C1050,0,1020,0,990,0C960,0,930,0,900,0C870,0,840,0,810,0C780,0,750,0,720,0C690,0,660,0,630,0C600,0,570,0,540,0C510,0,480,0,450,0C420,0,390,0,360,0C330,0,300,0,270,0C240,0,210,0,180,0C150,0,120,0,90,0C60,0,30,0,15,0L0,0Z"></path></svg>
      
      <div className="text-lg mb-12">
        <p>Your invite link: </p>
        <Link className="text-violet-600" to={`/ask/${username}`}>{window.location.origin}/ask/{username}</Link>
        <p>Share it to receive letters!</p>
      </div>

      <p className="text-lg">This is your inbox.</p>
      <p className="text-lg">Letters from your fans appear below.</p>
      <Inbox userUID ={currentUser.uid} />
    </div>
  );
}