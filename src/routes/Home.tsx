import { auth } from '../firebase'
import { Navigate } from 'react-router-dom';

export default function Home() {
  const currentUser = auth.currentUser;

  if (currentUser == null) {
    return <Navigate to="/" />
  }

  return (
    <h1>Hello, {currentUser.email}!</h1>
  );
}