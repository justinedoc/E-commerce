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

const shopPro = document.getElementById("shopPro");
const addShopPro = () => {
  fetch("/products.json")
    .then((res) => res.json())
    .then((data) => {
      for (let z = 0; z < data.shopProducts.length; z++) {
        shopPro.innerHTML += `
            <div class="product">
            <img class="img" src="${data.shopProducts[z].img}" alt="" />
            <div class="description">
              <span>${data.shopProducts[z].brand}</span>
              <h5 class="name">${data.shopProducts[z].name}</h5>
              <div class="star">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </div>
              <div class="psec">
                <h4>$</h4>
                <h4 class="price">${data.shopProducts[z].price}</h4>
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
        const mainCartEl = document.querySelector(".cart-main");
        const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
        for (let b = 0; b < addToCartBtn.length; b++) {
          addToCartBtn[b].addEventListener("click", (event) => {
            event.preventDefault();

            mainCartEl.innerHTML += `
                <tr class="item">
                  <td>
                    <i class="fa fa-times-circle remove-item"></i>
                  </td>
                  <td><img src="${data.shopProducts[b].img}" alt="" /></td>
                  <td>${data.shopProducts[b].name}</td>
                  <td>$${data.shopProducts[b].price}</td>
                </tr>`;
            const removeItem = document.querySelectorAll(".remove-item");
            wishNo();
            removeItemsFromWish(removeItem);
          });
        }
      }

      const search = () => {
        const pName = document.querySelectorAll(".name");
        const inputBox = document.getElementById("searchInput");
        inputBox.addEventListener("input", (event) => {
          const value = event.target.value.toLowerCase();
          for (let i = 0; i < pName.length; i++) {
            if (pName[i].innerHTML.toLowerCase().includes(value)) {
              let des = pName[i].parentElement;
              des.parentElement.style.display = "block";
            } else {
                let des = pName[i].parentElement;
                des.parentElement.style.setProperty('display', 'none');
            }
          }
        });
      };
      search();
    })
    .catch((err) => {
      console.log("error fetch :", err);
    });
};

addShopPro();

const displayPro = (products, data) => {
  for (let a = 0; a < products.length; a++) {
    products[a].addEventListener("click", () => {
      window.location.href = "#";
      const prodetails = document.getElementById("prodetails");
      prodetails.innerHTML = `
        <div class="single-pro-image">
        <img src="${data.shopProducts[a].img}" width="100%" id="mainImg" alt="" />

        <div class="small-img-group">
          <div class="small-img-col">
            <img
              src="img/products/f1.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="img/products/f2.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="img/products/f3.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
          <div class="small-img-col">
            <img
              src="img/products/f4.jpg"
              width="100%"
              class="small-img"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="single-pro-details">
        <h6>Home/ T-shirts</h6>
        <h4>${data.shopProducts[a].name}</h4>
        <h2>$${data.shopProducts[a].price}</h2>

        <select>
          <option>Select size</option>
          <option>XL</option>
          <option>XXL</option>
          <option>Small</option>
          <option>Large</option>
        </select>

        <input type="number" value="1" disabled/>
        <button class="normal wishBtn">Add to Wishlist</button>
        <h4>Product Details</h4>
        <span
          >${data.shopProducts[a].description}</span
        >
      </div>`;
      prodetails.style.setProperty("display", "flex");

      const addToWishBtn = document.querySelector(".wishBtn");
      addToWishBtn.addEventListener("click", () => {
        const mainCartEl = document.querySelector(".cart-main");
        mainCartEl.innerHTML += `
            <tr class="item">
                <td>
                <i class="fa fa-times-circle remove-item"></i>
                </td>
                <td><img src="${data.shopProducts[a].img}" alt="" /></td>
                <td>${data.shopProducts[a].name}</td>
                <td>$${data.shopProducts[a].price}</td>
            </tr>`;
        const removeItem = document.querySelectorAll(".remove-item");
        removeItemsFromWish(removeItem);
        wishNo();
      });
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
    ItemBtn[q].addEventListener("click", () => {
      const td = ItemBtn[q].parentElement;
      td.parentElement.remove();
      wishNo();
    });
  }
};
