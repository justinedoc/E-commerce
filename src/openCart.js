"use strict";

// Nav closing and opeing functionality on mobile
const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");

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