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
const productElSec = document.getElementById("shopPro"),
  addToCartClass = "addToCartBtn";
let addToCartBtn = [];
const cart = [];

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
  // const products = [];
  const loadEl = document.querySelector(".loader");
  loadEl.style.setProperty("display", "block");
  try {
    await onValue(colRef, (snapshot) => {
      const products = [];
      snapshot.forEach((child) => {
        const chlidData = child.val();
        products.push(chlidData);
      });
      loadProducts(products, input);
      loadEl.style.setProperty("display", "none");
    });
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
          <button class="affiliate-link" onclick="window.location.href='${item.productAffiliateLink}'">check</button>
        </div>
          <img class="img" src="${item.productImg}" alt="" />
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
  productElSec.innerHTML = ``;
  for (let i = 0; i < products.length; i++) {
    productElSec.innerHTML += `
    <div class="product">
      <div class="wrapper">
        <div class="wishlist-item-btn">
          <button class="${addToCartClass}">wishlist</button>
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
           <a href="${products[i].productAffiliateLink}" class="affiliate-link" style="display: none;"></a>
        </div>
      </div>
    </div>`;
  }
  addToCartBtn.push(...document.querySelectorAll(".addToCartBtn"));
};

const addProToCart = (product) => {
  const proName = product.querySelector(".name").textContent,
    proPrice = product.querySelector(".price").textContent,
    proImg = product.querySelector(".img").src,
    affiliate_link = product.querySelector(".affiliate-link").href;
  const productObj = {
    name: proName,
    price: proPrice,
    img: proImg,
    link: affiliate_link,
  };
  let cartInnerHtml = document.querySelector(".list-item");
  const numOfItemsInCart = document.querySelectorAll(".number-items");
  if (!cart.includes(productObj.name)) {
    cart.push(productObj.name);
    for (let el of numOfItemsInCart) {
      el.textContent = cart.length;
    }
    cartInnerHtml.innerHTML += `
       <div class="items">
            <div class="product-img">
              <img src="${productObj.img}" alt="" />
            </div>

            <div class="info-wrapper">
              <div class="product-name el"><span>Name: </span>${
                productObj.name
              }</div>
              <div class="product-price el" style="${
                window.screen.availWidth < 500 ? "display: none;" : ""
              }"><span>Price: </span>$${productObj.price}</div>
            </div>
            <div class="btn-wrapper">
              <button class="product-link el"  onclick="window.location.href='${
                productObj.link
              }'">Check</button>
            </div>
        <div/>`;
  }
};

getPro((products) => {
  loadProductsInSearch(products);
  addToCartBtn = document.querySelectorAll(`.${addToCartClass}`);
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      let parentEl = event.target.closest(".product");
      if (parentEl) {
        let parentElClone = parentEl.cloneNode(true);
        addProToCart(parentElClone);
      }
    });
  });
});
