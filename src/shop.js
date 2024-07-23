"use strict";

import { getPro } from "./products.js";
const productElSec = document.getElementById("shopPro"),
  addToCartClass = "addToCartBtn";
let addToCartBtn = [];
const cart = [];

document.getElementById("searchInput").addEventListener("click", () => {
  location.href = "/search.html";
});

const loadProducts = (products) => {
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
  loadProducts(products);
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
