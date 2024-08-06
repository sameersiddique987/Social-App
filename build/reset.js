import { sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {auth} from "./config.js"



const form = document.querySelector("#passwordResetForm")
const email = document.querySelector("#email")
const btn = document.querySelector("#btn")
        
        
  
form.addEventListener("submit" , (event)=>{
event.preventDefault()
console.log(email.value);


sendPasswordResetEmail(auth, email.value)
  .then(() => {
   console.log("Password reset email sent!");  
    
  })
  .catch((error) => {
    
    const errorMessage = error.message;
    console.log(errorMessage);
  });


}) 



















