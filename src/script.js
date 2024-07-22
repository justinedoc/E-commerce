"use strict";

import { getPro } from "./products.js";

const productElSec = document.getElementById("featuredPro"),
  arrivalPro = document.getElementById("newArrivals"),
  addToCartClass = "addToCartBtn";
let addToCartBtn = [];

const loadProOnFeatured = (products) => {
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
        </div>
      </div>
    </div>`;
  }
  addToCartBtn.push(...document.querySelectorAll(".addToCartBtn"));
};
const loadProOnArrival = (products) => {
  arrivalPro.innerHTML = ``;
  for (let i = 0; i < products.length; i++) {
    arrivalPro.innerHTML += `
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
              </div>
            </div>
          </div>`;
  }
  addToCartBtn.push(...document.querySelectorAll(".addToCartBtn"));
};

const addProToCart = (product) => {
  const proName = product.querySelector(".name").textContent,
    proPrice = product.querySelector(".price").textContent,
    proImg = product.querySelector(".img").src;

  const productObj = {
    name: proName,
    price: proPrice,
    img: proImg,
  };

};

export { addProToCart };

getPro((products) => {
  loadProOnArrival(products);
  loadProOnFeatured(products);

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
