"use strict";

import { getPro } from "./products.js";
const productElSec = document.getElementById("shopPro");

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
          </div>`;
  }
};

getPro((products) => {
  console.log(products);
  loadProducts(products);
});
