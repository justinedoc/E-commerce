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
const cartEl = document.getElementById("cart");

for (let i = 0; i < openCartBtn.length; i++) {
  openCartBtn[i].addEventListener("click", () => {
    cartEl.classList.add("clicked");
  });
}

closeCartBtn.addEventListener("click", () => {
  cartEl.classList.remove("clicked");
});

// adding featured products
const addPro = () => {
  const featureProductsEl = document.getElementById("featuredPro");
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      for (let i = 0; i < data.featuredProducts.length; i++) {
        featureProductsEl.innerHTML += `
        <div class="product">
            <img class="img" src="${data.featuredProducts[i].img}" alt="" />
            <div class="description">
              <span>${data.featuredProducts[i].brand}</span>
              <h5 class="name">${data.featuredProducts[i].name}</h5>
              <div class="star">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </div>
              <div class="psec">
                <h4>$</h4>
                <h4 class="price">${data.featuredProducts[i].price}</h4>
              </div>
            </div>
            <a class="add-to-cart-btn" href="#"
              ><ion-icon
                name="cart-outline"
                aria-hidden="true"
                class="cart"
              ></ion-icon
            ></a>
          </div>`;

        const products = document.querySelectorAll(".img");
        displayPro(products, data);
        const mainCartEl = document.querySelector(".wish-items");
        const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
        for (let b = 0; b < addToCartBtn.length; b++) {
          addToCartBtn[b].addEventListener("click", (event) => {
            event.preventDefault();
            console.log("clicked");
            mainCartEl.innerHTML += `
            <div class="item">
            <i class="fa fa-times-circle remove-item"></i>
            <img src="${data.featuredProducts[b].img}" alt="" />
            <div class="des">
              <h4 class="item-name">${data.featuredProducts[b].name}</h4>
              <h6 class="price">$${data.featuredProducts[b].price}</h6>
            </div>
          </div>`;
            const removeItem = document.querySelectorAll(".remove-item");
            wishNo();
            removeItemsFromWish(removeItem);
          });
        }
      }
    });
};
addPro();

const displayPro = (products, data) => {
  for (let a = 0; a < products.length; a++) {
    products[a].addEventListener("click", () => {
      window.location.href = "shop.html";
    });
  }
};

const wishNo = () => {
  const numberOfItems = document.querySelector(".number-items");
  const items = document.querySelectorAll(".item");
  console.log(items.length);
  numberOfItems.textContent = items.length;
};

const removeItemsFromWish = (ItemBtn) => {
  for (let q = 0; q < ItemBtn.length; q++) {
    ItemBtn[q].addEventListener("click", (event) => {
      event.preventDefault();
      const item = ItemBtn[q].parentElement;
      item.remove();
      wishNo();
    });
  }
};


