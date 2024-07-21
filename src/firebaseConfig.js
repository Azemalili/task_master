import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBkTsn0dkLoatFOIT5diyYhR6SJ8Q7FEXg",
  authDomain: "task-master-a5bf6.firebaseapp.com",
  databaseURL: "https://task-master-a5bf6-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "task-master-a5bf6",
  storageBucket: "task-master-a5bf6.appspot.com",
  messagingSenderId: "838147793471",
  appId: "1:838147793471:web:96d529c017351d6a68ce8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app