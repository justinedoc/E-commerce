"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7HkC5_FQzJVKkb3fZx2LfrJuaF-W7cBU",
  authDomain: "fashion-site-1945b.firebaseapp.com",
  databaseURL: "https://fashion-site-1945b-default-rtdb.firebaseio.com",
  projectId: "fashion-site-1945b",
  storageBucket: "fashion-site-1945b.appspot.com",
  messagingSenderId: "166837503068",
  appId: "1:166837503068:web:7c5cbd27faf639f8209299",
  measurementId: "G-567LHTD4EH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const colRef = ref(db, "products");

export const getPro = (callback) => {
  onValue(colRef, (snapshot) => {
    const products = [];
    snapshot.forEach((child) => {
      const chlidData = child.val();
      products.push(chlidData);
    });
    callback(products);
  });
};
