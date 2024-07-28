
  
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js"
  
  const firebaseConfig = {
    apiKey: "AIzaSyDVTnDsY2zmoGaGMJzoTOAKg5v39kB_LvQ",
    authDomain: "social-app-100ee.firebaseapp.com",
    projectId: "social-app-100ee",
    storageBucket: "social-app-100ee.appspot.com",
    messagingSenderId: "59379255007",
    appId: "1:59379255007:web:f0329b4ecc5ddd974e0b6a",
    measurementId: "G-DB4ZSNDMZG"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)

