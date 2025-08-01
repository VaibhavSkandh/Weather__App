import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBR9T7s1mRpf8LkAGp_yW2EINtf0W9nRCw",
  authDomain: "myreactapp-1ecda.firebaseapp.com",
  projectId: "myreactapp-1ecda",
  storageBucket: "myreactapp-1ecda.firebasestorage.app",
  messagingSenderId: "682077242254",
  appId: "1:682077242254:web:d6da872d485f0ef8f99adf"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export {};