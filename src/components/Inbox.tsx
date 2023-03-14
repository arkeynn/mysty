import { useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { database as db } from '../firebase'

import Letter from './Letter';

type InboxProps = {
  userUid: string;
};

export type Message = {
  title: string;
  content: string;
  hint: string;
  timestamp: number;
};

export default function Inbox( { userUid }: InboxProps ) {
  const [messages, setMessages] = useState<Message[]>([]);

  const renderedMessages = messages.map(message => <Letter message={message} />);

  function onRefresh() {
    const inboxRef = ref(db, `/inbox/${userUid}`);
    onValue(inboxRef, (snapshot) => {
      let collection: Message[] = [];
      snapshot.forEach((childSnapshot) => {
        const child = childSnapshot.val();
        const message: Message = {
          title: child.title,
          content: child.message,
          hint: child.hint,
          timestamp: child.timestamp,
        };

        collection.push(message);
      });

      setMessages(collection);
    }, {onlyOnce: true});
  }

  return (
    <div className="Inbox flex flex-col">
      <button onClick={onRefresh}>Refresh</button>
      {renderedMessages}
    </div>
  );
}