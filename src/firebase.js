import app from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBRqWvJDFYLENdjixiJcYPoeWEesJ3UceU",
  authDomain: "login-react-4c203.firebaseapp.com",
  projectId: "login-react-4c203",
  storageBucket: "login-react-4c203.appspot.com",
  messagingSenderId: "440052380676",
  appId: "1:440052380676:web:b8c56125f872407e3c3151",
};

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export { db, auth };
