import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC8wY_-FFPgr3E3Kcqw93XhxolsGeQkUk0",
  authDomain: "todo-app-817fa.firebaseapp.com",
  projectId: "todo-app-817fa",
  storageBucket: "todo-app-817fa.appspot.com",
  messagingSenderId: "884304476980",
  appId: "1:884304476980:web:4c63de08bc4f5ad8dc4361",
  measurementId: "G-499JN76QFR"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);