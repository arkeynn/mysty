import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { db } from '../firebase'
import { ref as dbRef, onValue } from 'firebase/database'


export default function AnswerQuestion() {
  const [question, setQuestion] = useState("...");
  const {username, questionId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const usernameRef = dbRef(db, `/usernames/${username}`);

    // Check if username exists
    return onValue(usernameRef, (snapshot) => {
      if (!snapshot.exists()) 
        return navigate("/notfound");

      const userUID = snapshot.val().uid;
      const questionRef = dbRef(db, `/questions/${userUID}/${questionId}`);

      // Check if question exists
      onValue(questionRef, (snapshot) => {
        if (!snapshot.exists())
          return navigate("/notfound");
        
        setQuestion(snapshot.val().question);

      }, {onlyOnce: true});
    }, {onlyOnce: true});
  }, []);

  return (
    <div>
      {question}
    </div>
  );
}