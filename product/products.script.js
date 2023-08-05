let products;
const productImageContainer = document.getElementById("image-container");
async function getProduct() {
  products = await fetch("https://fakestoreapi.com/products")
    .then((data) => {
      return data.json();
    })
    .catch((err) => {
      console.log({ error: err });
    });

  const queryParam = window.location.search;
  const urlParams = new URLSearchParams(queryParam);
  let productId = urlParams.get("id") || 1;
  if (productId <= 0) productId = 1;

  const clickedProduct = products.find((pro) => pro.id == productId);
  return clickedProduct;
}
function initProductImg(product) {
  const prodImgDivContainer = document.createElement("div");
  prodImgDivContainer.className =
    "border rounded-4 mb-3 d-flex justify-content-center";
  const prodImg = document.createElement("img");
  prodImg.className = "rounded-4 fit";
  prodImg.style = "max-width: 100%; max-height: 80vh; margin: auto";
  prodImg.src = product.image;
  const imageAnchr = document.createElement("a");
  imageAnchr.href = product.image;
  imageAnchr.class = "rounded-4";
  imageAnchr.target = "_blank";
  prodImgDivContainer.appendChild(imageAnchr);
  imageAnchr.appendChild(prodImg);
  productImageContainer.appendChild(prodImgDivContainer);
}
function initSmallProductImgs(product) {
  const smallProductsImgsDivContainer = document.createElement("div");
  smallProductsImgsDivContainer.className =
    "d-flex justify-content-center mb-3";
  for (let index = 0; index < 5; index++) {
    const smallImageAnchr = document.createElement("a");
    smallImageAnchr.className = "border mx-1 rounded-2 item-thumb";
    smallImageAnchr.target = "_blank";
    smallImageAnchr.href = product.image;
    const smallProdImg = document.createElement("img");
    smallProdImg.className = "rounded-2";
    smallProdImg.style = "width 60px; height: 60px";
    smallProdImg.src = product.image;
    smallImageAnchr.append(smallProdImg);
    smallProductsImgsDivContainer.appendChild(smallImageAnchr);
    productImageContainer.appendChild(smallProductsImgsDivContainer);
  }
}
function initProductInfo(product) {
  const productTitle = document.getElementById("product-title");
  productTitle.innerHTML = product.title;
}
function initProductRating(product) {
  const productRatingData = document.getElementById("rating-div");
  const rate = document.getElementById("rate");
  const ratedBy = document.getElementById("ratedBy");
  const price = document.getElementById("price");
  const productDescription = document.getElementById("product-Description");
  const category = document.getElementById("category");
  let rating = product.rating.rate;
  let stars = document.createElement("span");
  for (i = 0; i < 5; i++) {
    if (i < rating) {
      stars.innerHTML += `<i class="fa fa-star text-warning"></i>`;
    } else {
      stars.innerHTML += `<i class="fa fa-star"></i>`;
    }
  }
  productRatingData.append(stars);
  rate.innerHTML = product.rating.rate;
  ratedBy.innerHTML = product.rating.count;
  price.innerHTML = product.price + " $";
  productDescription.innerHTML = product.description;
  category.innerHTML = product.category;
}
async function createProduct() {
  const clickedProduct = await getProduct();
  console.log(products);

  initProductImg(clickedProduct);
  initSmallProductImgs(clickedProduct);
  initProductInfo(clickedProduct);
  initProductRating(clickedProduct);
  initAddToCartBtn(clickedProduct);
}
createProduct();

function initPopupAlert(content) {
  const alertBox = document.getElementById("added-product");
  alertBox.className += "border";
  const alertContent = document.createTextNode(content);
  alertBox.setAttribute("id", "alertBox");
  alertBox.appendChild(alertContent);
}
function initAddToCartBtn(product) {
  const cartBtn = document.getElementById("cart-btn");
  cartBtn.addEventListener("click", addToLocalStorage);
  function addToLocalStorage() {
    const cratIds = localStorage.getItem("cartIds");
    if (!cratIds) {
      localStorage.setItem("cartIds", JSON.stringify(product.id));
    } else {
      localStorage.setItem("cartIds", `${cratIds},${product.id}`);
    }
    initPopupAlert(`Item ${product.title} added successfully to cart`);
    setTimeout(() => {
      document.getElementById("alertBox").remove();
    }, 2000);
  }
}
function openCartPage() {
  window.open("../cart/cart.html", "_self");
}
