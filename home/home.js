import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs, query, where, doc, deleteDoc, updateDoc, Timestamp, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "../config.js";

//Check User is login or not
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    renderTodo(uid, doc)
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

//send data and add todo
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  if (input.value === '') alert('Please enter text');
  if (!(input.value == '')) {
    try {
      const docRef = await addDoc(collection(db, "todos"), {
        title: input.value,
        user_Id: auth.currentUser.uid,
        // timestamp: Timestamp.fromDate(new Date()),
      });


      //Create Todo
      let li = document.createElement('li');
      li.classList.add('font');
      li.innerHTML += input.value + '<div class="inline"><button class="edit">Edit</button><button class="delete">Delete</button></div>';

      //Edit Data
      li.querySelector('.edit').addEventListener('click', () => {
        let reWrite = prompt('Edit Todo', input.value);
        li.innerHTML = reWrite + '<div class="inline"><button class="edit">Edit</button><button class="delete">Delete</button></div>'

        console.log(docRef.id);
        const editTodo = doc(db, "todos", docRef.id);

        updateDoc(editTodo, {
          title: reWrite,
        })
      })
      ul.prepend(li)

      //Delete Todo
      li.querySelector('.delete').addEventListener('click', function () {
        deleteDoc(doc(db, "todos", docRef.id))
          .then(() => {
            li.remove();
          }).catch((err) => {
            console.log(err);
          })
      })

      //Add Todo

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
})

// render data for different users
let arr = [];
async function renderTodo(uid, doc) {
  const q = query(collection(db, "todos"), where("user_Id", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    arr.push({ ...doc.data(), docId: doc.id });
  });
  console.log(arr);

  arr.map((item, index) => {
    let li = document.createElement('li');
    li.classList.add('font');
    li.innerHTML += item.title + '<div class="inline"><button class="edit">Edit</button><button class="delete">Delete</button></div>';

    //Edit
    li.querySelector('.edit').addEventListener('click', () => {
      const title = prompt('Edit Todo', item.title);
      const todosRef = doc(db, "todos", arr[index].docId);
      updateDoc(todosRef, {
        "title": title,
      }).then(() => {
        li.innerHTML = title + '<div class="inline"><button class="edit">Edit</button><button class="delete">Delete</button></div>'
      }).catch((err) => {
        console.log(err);
      })
    })

    li.querySelector('.delete').addEventListener('click', function () {
      deleteDoc(doc(db, "todos", arr[index].docId))
        .then(() => {
          li.remove();
        }).catch((err) => {
          console.log(err);
        })
    })


    ul.prepend(li);
  })
}