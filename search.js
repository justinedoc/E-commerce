"use strict";
const productDetails = document.querySelectorAll(".details-p");
const viewBtn = document.querySelectorAll(".normal");
const products = document.querySelectorAll(".searched-product");
const pname = document.querySelectorAll(".productname");
const loadingIcon = document.querySelector(".loader");

if (window.screen.availWidth < 450) {
  for (let i = 0; i < viewBtn.length; i++) {
    viewBtn[i].classList.add("mobile");
  }
  for (let i = 0; i < productDetails.length; i++) {
    const curItem = productDetails[i];
    curItem.classList.remove("active");
  }
}

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

const isLoading = (input) => {
  let counter = 0;
  const int = setInterval(() => {
    counter++;
    loadingIcon.style.display = "flex";
    if (counter === 4) {
      loadingIcon.style.display = "none";
      searchForProducts(input);
      input.value = "";
      clearInterval(int);
    }
  }, 1000);
};

const searchForProducts = (input) => {
  for (let i = 0; i < pname.length; i++) {
    const productName = pname[i].textContent || pname[i].innerHTML;
    if (productName.toLowerCase().indexOf(input.value.toLowerCase()) > -1) {
      products[i].style.display = "flex";
    } else {
      products[i].style.display = "none";
    }
  }
};
