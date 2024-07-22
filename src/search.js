"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import { getPro } from "./products.js";

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

const productDetails = document.querySelectorAll(".details-p");
const viewBtn = document.querySelectorAll(".normal");
const loadingIcon = document.querySelector(".loader");
const searchedProductsEl = document.querySelector(".searched-products");
const productElSec = document.getElementById("shopPro");

const mediaQuery = () => {
  if (window.screen.availWidth < 450) {
    for (let i = 0; i < viewBtn.length; i++) {
      viewBtn[i].classList.add("mobile");
    }
    for (let i = 0; i < productDetails.length; i++) {
      const curItem = productDetails[i];
      curItem.classList.remove("active");
    }
  }
};

mediaQuery();

const search = (button, input) => {
  const searchBtn = document.getElementById(button),
    searchInput = document.getElementById(input);
  let searchInputVal;
  searchInput.addEventListener("keydown", (event) => {
    searchInputVal = searchInput.value;
    if (event.key === "Enter") {
      document.title = searchInputVal;
      isLoading(searchInput);
    }
  });

  searchBtn.addEventListener("click", () => {
    searchInputVal = searchInput.value;
    document.title = searchInputVal;
    isLoading(searchInput);
  });
};

search("searchBtn", "searchInput");

const loadProducts = (data, input) => {
  const product = data;
  let pName;
  let pTag;
  let searchedProducts = [];
  for (let i = 0; i < product.length; i++) {
    pName = product[i].productName;
    pTag = product[i].productTag;
    if (
      pName.toLowerCase().includes(input.value.toLowerCase()) ||
      pTag.toLowerCase().includes(input.value.toLowerCase())
    ) {
      searchedProducts.push(product[i]);
      console.log(searchedProducts);
    }
  }
  handleSearchError(searchedProducts, input);
};

async function isLoading(input) {
  const products = [];
  const loadEl = document.querySelector(".loader");
  loadEl.style.setProperty("display", "block");
  try {
    await onValue(colRef, (snapshot) => {
      snapshot.forEach((child) => {
        const chlidData = child.val();
        products.push(chlidData);
      });
    });
    loadProducts(products, input);
    loadEl.style.setProperty("display", "none");
  } catch (error) {
    console.log(`error ${error} was encountered while fetching the data`);
  }
}

const handleSearchError = function (arr, input) {
  if (arr.length !== 0) {
    displayProduct(arr);
  } else {
    productElSec.innerHTML = ``;
    const div = document.createElement("div");
    div.classList.add("not-found");
    const span = document.createElement("span");
    div.appendChild(span);
    productElSec.appendChild(div);

    document.querySelector(
      ".not-found"
    ).textContent = `No items found for "${input.value}"`;
  }
};

const displayProduct = (products) => {
  productElSec.innerHTML = ``;
  const pContainer = document.querySelector(".product-container");
  if (window.screen.availWidth > 480) {
    pContainer.style.setProperty("justify-content", "center");
    pContainer.style.setProperty("gap", "30px");
  }
  products.forEach((item) => {
    productElSec.innerHTML += `
    <div class="product">
           <div class="wrapper">
        <div class="wishlist-item-btn">
          <button class="addToCartBtn">wishlist</button>
        </div>
          <img class="img" src="${products[i].productImg}" alt="" />
      </div>
            <div class="description">
              <span>${item.productBrand}</span>
              <h5 class="name">${item.productName}</h5>
              <div class="star">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </div>
              <div class="psec">
                <h4>$</h4>
                <h4 class="price">${item.productPrice}</h4>
              </div>
            </div>
          </div>`;
  });
};

const loadProductsInSearch = (products) => {
  // console.log("working", products);
  productElSec.innerHTML = ``;
  for (let i = 0; i < products.length; i++) {
    productElSec.innerHTML += `
    <div class="product">
            <div class="wrapper">
        <div class="wishlist-item-btn">
          <button class="addToCartBtn">wishlist</button>
        </div>
          <img class="img" src="${products[i].productImg}" alt="" />
      </div>
            <div class="description">
              <span>${products[i].productBrand}</span>
              <h5 class="name">${products[i].productName}</h5>
              <div class="star">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </div>
              <div class="psec">
                <h4>$</h4>
                <h4 class="price">${products[i].productPrice}</h4>
              </div>
            </div>
          </div>`;
  }
};

getPro((products) => {
  // console.log(products);
  loadProductsInSearch(products);
});
