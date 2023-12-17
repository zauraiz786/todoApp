import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 
import { auth } from "../config.js";
import { db } from "../config.js";

//Check User is login or not
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = '../login/login.html'
  }
});

const button = document.querySelector('#button');
const add = document.querySelector('.add');
const input = document.getElementById('myInput');
const form = document.getElementById('form');

button.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location = "../login/login.html"
  }).catch((error) => {

  })
})

form.addEventListener('submit',async (event)=>{
  event.preventDefault()
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: input.value,
    });
    console.log("Document written with ID: ", docRef.id);

  } catch (e) {
    console.error("Error adding document: ", e);
  }
})

add.addEventListener('click',function(){
  let li = document.createElement('li');
  let t = document.createTextNode(input.value);
  li.prepend(t)
  if (input.value === '') alert('Please enter text')
  else document.getElementById('ul').prepend(li);
  input.value = '';
})