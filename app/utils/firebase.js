import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJhhql6jXOBaL0m7Jr8dHcWA0RSmCGXHA",
  authDomain: "cinephile-ec0d9.firebaseapp.com",
  databaseURL: "https://cinephile-ec0d9.firebaseio.com",
  projectId: "cinephile-ec0d9",
  storageBucket: "cinephile-ec0d9.appspot.com",
  messagingSenderId: "273588048291",
  appId: "1:273588048291:web:ee6290688ac8f63aab4a16",
  measurementId: "G-SCNL1T7MCY"
      };
      
export const firebaseApp = firebase.initializeApp(firebaseConfig);
