import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "../config.js";

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
const ul = document.getElementById('ul');

button.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location = "../login/login.html"
  }).catch((error) => {

  })
})

add.addEventListener('click', () => {
  let li = document.createElement('li');
  li.classList.add('font');
  let t = document.createTextNode(input.value);
  li.prepend(t)
  if (input.value === '') alert('Please enter text')
  else ul.prepend(li);
})

//send data
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: input.value,
    });

  } catch (e) {
    console.error("Error adding document: ", e);
  }
})

//render data
// let arr = [];
// async function renderTodo() {
//   const querySnapshot = await getDocs(collection(db, "todos"));
//   querySnapshot.forEach((doc) => {
//     arr.push(doc.data());
//   });
//   console.log(arr);
//   arr.map((item) => {
//     let li = document.createElement('li');
//     li.classList.add('font');
//     let t = document.createTextNode(item.title);
//     li.prepend(t)
//     ul.prepend(li);
//   })
// }
// renderTodo()