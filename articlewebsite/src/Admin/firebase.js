import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Add this line

const firebaseConfig = {
    // your firebase config
    apiKey: "AIzaSyD_c8nl3NinxlZDLgjGkDBBUzYuAAfVVLw",
    authDomain: "myarticle-233ad.firebaseapp.com",
    projectId: "myarticle-233ad",
    storageBucket: "myarticle-233ad.firebasestorage.app",
    messagingSenderId: "973801075937",
    appId: "1:973801075937:web:68b753390d0b7863ceb3a0",
    measurementId: "G-WR4VREVMVX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // ✅ Add this line

export { db, auth }; // ✅ Make sure 'auth' is exported
