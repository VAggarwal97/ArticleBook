import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
export const db = getFirestore(app);
