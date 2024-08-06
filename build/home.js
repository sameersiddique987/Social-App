
import { getAuth,  onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  collection,
  addDoc,
  getDocs,
  doc, 
  deleteDoc ,
  updateDoc,
  Timestamp,
  query,
   where,
   orderBy,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {auth , db } from "./config.js"


const form = document.querySelector("#form")
const input = document.querySelector("#todo")
const todo_btn = document.querySelector("#todo-btn")
const ul = document.querySelector("#ul")
const select = document.querySelector("#select")
const cities = document.querySelectorAll(".cities-btn")
const resetbtn = document.querySelector(".resetbtn")






onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "index.html";
  }
});



const logout = document.querySelector("#btn")

logout.addEventListener("click" ,() => {
    signOut(auth).then(() => {
      console.log("logout successful."); 
      window.location =  "index.html"
    }).catch((error) => {
      console.log("error");
    });
  })
  
  
  
  
  
  let arr = []






cities.forEach((btn)=>{
  
btn.addEventListener("click" ,async (event)=>{
  arr=[]
  console.log(event.target.innerHTML);
  const citiesRef = collection(db, "todos");
  const q = query(citiesRef, where("city", "==", event.target.innerHTML),orderBy("time", "desc")
);
   

   const querySnapshot = await getDocs(collection(db, "todos"));
   querySnapshot.forEach((doc) => {
     arr.push({...doc.data(), id : doc.id  })
})
console.log(arr);
renderTodo()
});
})

resetbtn.addEventListener("click" , getdata)


 async function getdata() {
  const querySnapshot = await getDocs(collection(db, "todos"));
querySnapshot.forEach((doc) => {
  arr.push({...doc.data(), id : doc.id })
});
console.log(arr);
renderTodo()
}
getdata()









function renderTodo(){
ul.innerHTML= "";
if(arr.length === 0){
  ul.innerHTML = `<span class="fs-5">No deta found</span>`;
  return
}

arr.map((item)=>{
  ul.innerHTML +=`
  <div class="d-flex justify-content-between px-3 flex-wrap">
 ${item.todo}<div >
 <button class="deletebtn btn btn-danger "><i class="fa-solid fa-trash"></i></button>
 <button class="aditbtn btn btn-success "><i class="fa-solid fa-pen-to-square"></i></button></div>
 </div>
 `;
})


const deletebtn = document.querySelectorAll(".deletebtn")
const aditbtn = document.querySelectorAll(".aditbtn")

deletebtn.forEach((btn , index)=>{

    btn.addEventListener( "click" ,async ()=>{
    // console.log( arr[index]);
    
await deleteDoc(doc(db, "todos", arr[index].id));
console.log("data deleted");
arr.splice(index, 1)
renderTodo()
      })
  })
  


aditbtn.forEach((btn , index)=>{
  
    btn.addEventListener( "click" , async ()=>{
    // console.log( arr[index]);
    const updateNewvalue = prompt("Enter New value")
    const washingtonRef = doc(db, "todos", arr[index].id);


await updateDoc(washingtonRef, {
  todo : washingtonRef
});
console.log("updated value");
arr[index].todo = updateNewvalue ;
renderTodo()
      })
  })

}



form.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log(arr);
  renderTodo();

  try {
    const docRef = await addDoc(collection(db, "todos"), {
      todo : todo.value ,
      city : select.value,
      time: Timestamp.fromDate(new Date()),
    });
    console.log("Document written with ID: ", docRef.id);
    arr.push({
      todo : todo.value,
      city : select.value,
      id : docRef.id
    })
    renderTodo()
    todo.value = ""
  } catch (e) {
    console.error("Error adding document: ", e);
  }


});