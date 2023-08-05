async function getProducts() {
	let products = await fetch('https://fakestoreapi.com/products')
		.then(res=>res.json())
		.catch(err=>console.log(err))

	return products
}
let searchedProducts = []
async function filterProducts() {
	const allProducts = await getProducts()
	const searchBy = localStorage.getItem('search')
	if (!searchBy) return products
	const pattern = new RegExp(`${searchBy}`,"i")
	searchedProducts = allProducts.filter(prod => pattern.test(prod.title))
}

function submitSearchQuery() {
	let searchTerm = document.getElementById("serchQuery").value
	window.localStorage.setItem("search",searchTerm)
}

async function searchs(){ // function serach query name in api products title

	let searchTerm = localStorage.getItem("search")
	let searchH1 = document.getElementById("h1");
	let productDiv = document.getElementById("container")
	searchH1.innerHTML+=searchTerm
	await filterProducts()

	if(searchedProducts.length){
		console.log(searchedProducts);
		for (let product of searchedProducts) {
			productDiv.innerHTML +=`
									<div class="row" onclick="openProductPage(${product.id})">
										<div class="prodImageSerach col-md-6"><img src="${product.image}"></div>
											<div class="prodDataSerach col-md-6"><h2><a href="product.html" class="searchProductLink">${product.title}</a></h2>
											<p>${product.description}</p>
											<h3>${product.price}<span class="dollar">$</span></h3>
											<hr>
											<button type="button" class="btn prodAddToCart" onclick="addToLocalStorage(${product.id})"><i class="fa-solid fa-cart-plus"></i> Add To Cart</button>	
										</div>
									</div>	
										`;
		}
	}
	else {
		productDiv.innerHTML +=`
		<div class="alert alert-danger" role="alert">
		There's No Item Like ' ${window.localStorage.getItem("search")}'  In Our Site
		</div>
		`
		
	}
	
}

function openProductPage(productId) {
	open(`../product/product.html?id=${productId}`, '_self')
}

function addToLocalStorage(id) {
    const cratIds = localStorage.getItem("cartIds");
    if (!cratIds) {
      localStorage.setItem("cartIds", JSON.stringify(id));
    } else {
      localStorage.setItem("cartIds", `${cratIds},${id}`);
    }
    // initPopupAlert(`Item ${title} added successfully to cart`);
    // setTimeout(() => {
    //   document.getElementById("alertBox").remove();
    // }, 2000);
  }

searchs(window.localStorage.getItem("search"))  // use function
	


