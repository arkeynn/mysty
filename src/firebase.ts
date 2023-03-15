import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBZU8cxw2DLuKMmYBEGxCE289AfiiUnzM4",
  authDomain: "mysty-af680.firebaseapp.com",
  projectId: "mysty-af680",
  databaseURL: "https://mysty-af680-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "mysty-af680.appspot.com",
  messagingSenderId: "565923312888",
  appId: "1:565923312888:web:6083cf73fbebdbbb55770d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);