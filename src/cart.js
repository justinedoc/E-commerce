"use strict";

const cartEl = document.querySelector(".list-item");
const addToCartBtn = document.querySelectorAll(".normal");

const addToCart = (event) => {
  console.log(event);
};

for (let i = 0; i < addToCartBtn.length; i++) {
  addToCartBtn[i].addEventListener("click", addToCart);
}

