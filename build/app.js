  
   
    import { getAuth, signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider , GithubAuthProvider} from 
    "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {auth} from "./config.js"





const form = document.querySelector("#form")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const forget_password = document.querySelector("#forget-password")
 const div = document.querySelector("#div")
const btn = document.querySelector("#btn")
const googleBtn = document.querySelector("#googleBtn")
const github = document.querySelector("#github-btn")

form.addEventListener("submit" , (event)=>{
    event.preventDefault()
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)

      window.location = "home.html"
      email.value = " "
      password.value = " "
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);

      div.innerHTML+=errorMessage
    });
 
  });
  
  
 //google authentication
 const provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", () => {
  console.log("google login");

  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      window.location = "home.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
});

const githubprovider = new GithubAuthProvider();
github.addEventListener( "click" , ()=>{
console.log("github");
signInWithPopup(auth, githubprovider)
  .then((result) => {
    
    const user = result.user;
    
    console.log(user);
    
  }).catch((error) => {
    

    const errorMessage = error.message;
    console.log(errorMessage);
    
  });
})
