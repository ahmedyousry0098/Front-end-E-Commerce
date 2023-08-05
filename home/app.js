//fetching products
const headerCards = document.getElementById("header-cards"); //container for the 8 categories cards
let ProductsUrl = "https://fakestoreapi.com/products";
const fetchProductsData = async function () {
  let response = await fetch(ProductsUrl);
  let data = await response.json();
  return data;
};

// // initiating products in categories cards
async function renderProductsData() {
  let productsData = await fetchProductsData();

  for (let product of productsData.slice(0,8)) {
    headerCards.innerHTML += `<div  id="${product.id}" onClick="openingProductPage(${product.id})" class=" col container-md ">
        <div class="card shadow-sm container-md height-380">
          <h4 class="pt-1">${product.title}</h4>
                <div
                  class="img-card-height-fixed align-content-center align-self-center"
                >
                  <img
                    class="bd-placeholder-img card-img-top"
                    src=${product.image}
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  />
                        </div>
                          <div class="card-body">
                            <p class="card-text">
                              <a class="text-decoration-none seeMoreBtn">See more details</a>
                            </p>
                          </div>
                      </div>
                </div>  
          </div>  
        </div>  
    `;
  }
  
  initiateFirstSlider(productsData);
  initiateSecondSlider(productsData);
  initiateSecondCardsCategories(productsData);
  initiateThirdCardsCategories(productsData);
}
renderProductsData();


// handling oppening poduct detailed page
function openingProductPage(id) {
  open(`../product/product.html?id=${id}`, "_self");
}
// initiating first sliders
function initiateFirstSlider(productsData) {
  const firstSliderContainer = document.getElementById(
    "carouselExampleIndicators2"
  );
  //innerContainer
  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  firstSliderContainer.appendChild(carouselInner);

  for (let index = 0; index < 3; index++) {
    const carouselItem1 = document.createElement("div");
    carouselItem1.className = `carousel-item ${index === 0 ? "active" : ""}`;
    const row1 = document.createElement("div");
    row1.className = "row";
    carouselInner.appendChild(carouselItem1);
    carouselItem1.appendChild(row1);
    // row1 container
    for (let x = 0; x < 3; x++) {
      const column = document.createElement("div");
      column.className = "col-md-4 mb-3";
      row1.appendChild(column);
      const h = x + index * 3;
      column.innerHTML = `
            <div  id="${productsData[h].id}" onClick="openingProductPage(${productsData[h].id})" class="card card-height-fixed">

            <div
            class="img-card-height-fixed align-content-center align-self-center"
            >
            <img
            class="img-fluid align-self-center img-adjustment"
            alt="100%x280"
            src="${productsData[h].image}"
            />
            </div>
            <div class="card-body">
            <p class="card-title">${productsData[h].title}</p>
            <span class="card-text bg-danger text-white px-2">
            Up to 50% off
            </span>
            </div>
            </div>`;
    }
  }
}
// initatin second slider
function initiateSecondSlider(productsData) {
  const secondSliderContainer = document.getElementById(
    "carouselExampleIndicators3"
  );
  //innerContainer
  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";
  secondSliderContainer.appendChild(carouselInner);

  for (let index = 0; index < 3; index++) {
    const carouselItem1 = document.createElement("div");
    carouselItem1.className = `carousel-item ${index === 0 ? "active" : ""}`;
    const row1 = document.createElement("div");
    row1.className = "row";
    carouselInner.appendChild(carouselItem1);
    carouselItem1.appendChild(row1);
    // row1 container
    for (let x = 9; x < 12; x++) {
      const column = document.createElement("div");
      column.className = "col-md-4 mb-3";
      row1.appendChild(column);
      const h = x + index * 3;

      column.innerHTML = `
            <div  id="${productsData[h].id}" onClick="openingProductPage(${productsData[h].id})" class="card small-card-fixed-height border-0">

              <div
              class="img-card-height-fixed align-content-center align-self-center"
              >
              <img
              class="img-fluid align-self-center img-adjustment"
              alt="100%x280"
              src="${productsData[h].image}"
              />
              </div>
              <div class="card-body">
              <p class="card-title">${productsData[h].title}</p>
              <span class="card-text bg-danger text-white px-2">
              Up to 50% off
              </span>
              </div>
            </div>`;
    }
  }
}

//second cards category
function initiateSecondCardsCategories(productsData) {
  const cardsContainer = document.getElementById("third-category-component");
  
  for (let product of productsData.sort((a,b) => b.price-a.price).slice(0,4)) {
    cardsContainer.innerHTML += `<div  id="${product.id}" onClick="openingProductPage(${product.id})" class=" col container-md ">
        <div class="card shadow-sm container-md height-400">
          <h4 class="pt-2">${product.title}</h4>
                <div
                  class="img-card-height-fixed align-content-center align-self-center"
                >
                  <img
                    class="bd-placeholder-img card-img-top"
                    src=${product.image}
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  />
                        </div>
                                  <div class="card-body">
                                    <p class="card-text">
                                      <a class="text-decoration-none seeMoreBtn">See more details</a>
                                    </p>
                                  </div>
                      </div>
                </div>  
          </div>  
        </div>  
    `;
  }
}
//third cards category
function initiateThirdCardsCategories(productsData) {
  const cardsContainer = document.getElementById("second-category-component");
  for (let product of productsData.sort((a,b) => b.rating.rate-a.rating.rate).slice(0,4)) {
    cardsContainer.innerHTML += `<div  id="${product.id}" onClick="openingProductPage(${product.id})" class=" col container-md ">
        <div class="card shadow-sm container-md height-380">
          <h4 class="pt-1">${product.title}</h4>
                <div
                  class="img-card-height-fixed align-content-center align-self-center"
                >
                  <img
                    class="bd-placeholder-img card-img-top"
                    src=${product.image}
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  />
                        </div>
                                  <div class="card-body">
                                    <p class="card-text">
                                      <a class="text-decoration-none seeMoreBtn">See more details</a>
                                    </p>
                                  </div>
                      </div>
            </div>  
          </div>  
        </div>  
    `;
  }
}
