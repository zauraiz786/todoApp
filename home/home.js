import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "../config.js";

//Check User is login or not
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    renderTodo(uid)
    console.log('user id:' + uid);
  } else {
    window.location = '../login/login.html'
  }
});

//Dom Elements
const button = document.querySelector('#button');
const add = document.querySelector('.add');
const input = document.getElementById('myInput');
const form = document.getElementById('form');
const ul = document.getElementById('ul');

//Sign-out function
button.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location = "../login/login.html"
  }).catch((error) => {

  })
})

//Add Todo function
add.addEventListener('click', () => {
  let li = document.createElement('li');
  li.classList.add('font');
  li.innerHTML += input.value + '<div class="inline"><button class="edit">Edit</button><button class="delete">Delete</button></div>';
  if (input.value === '') alert('Please enter text')
  else ul.prepend(li);
})

//send data
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (!(input.value == '')) {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: input.value,
        user_Id: auth.currentUser.uid,
      });
  
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
})

// render data for different users
let arr = [];
async function renderTodo(uid) {
  const q = query(collection(db, "todos"), where("user_Id", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  console.log(arr);
  arr.map((item) => {
    let li = document.createElement('li');
    li.classList.add('font');
    li.innerHTML += item.title + '<div class="inline"><button class="edit">Edit</button><button class="delete">Delete</button></div>';
    ul.prepend(li);
  })
}