async function getProducts() {
	let products = await fetch('https://fakestoreapi.com/products')
		.then(res=>res.json())
		.catch(err=>console.log(err))

	return products
}
let searchedProducts = []
function filterProducts(products) {
	const searchBy = localStorage.getItem('categroyName')
	if (!searchBy) return products
	const pattern = new RegExp(`${searchBy}`)
	searchedProducts = products.filter(prod => pattern.test(prod.category))
}

function submitSearchQuery() {
	var val = document.getElementById("serchQuery").value
	console.log({val})
	window.localStorage.setItem("search",val)
}

async function searchs(nameKey){ // function serach query name in api products title

	let productsArr = await getProducts()

	filterProducts(productsArr)
	console.log(searchedProducts);
	for (let product of searchedProducts) {
		var productDiv = document.getElementById("container")
		productDiv.innerHTML +=`<div class="col-md-12">
									<div><img src="${product.image}"></div>
									<div><h2>${product.title}</h2></div>
									<p>${product.description}</p>
								</div>`;
	}
}
 

searchs()  // use function
	


