"use strict";

import { getPro } from "./products.js";

// Nav closing and opeing functionality on mobile
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
const productElSec = document.getElementById("shopPro");

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}

const openCartBtn = document.querySelectorAll(".cartBtn");
const closeCartBtn = document.querySelector(".closeWishBtn");
const cartEl = document.querySelector(".cart-main-body");

for (let i = 0; i < openCartBtn.length; i++) {
  openCartBtn[i].addEventListener("click", (event) => {
    event.preventDefault();
    cartEl.classList.add("clicked");
  });
}

closeCartBtn.addEventListener("click", () => {
  cartEl.classList.remove("clicked");
});

document.getElementById("searchInput").addEventListener("click", () => {
  console.log("c");
  location.href = "/search.html";
});

const loadProducts = (products) => {
  productElSec.innerHTML = ``;
  for (let i = 0; i < products.length; i++) {
    productElSec.innerHTML += `
    <div class="product">
            <img class="img" src="${products[i].productImg}" alt="" />
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
          </div>`
  }
};

getPro((products) => {
  console.log(products);
  loadProducts(products);
});
