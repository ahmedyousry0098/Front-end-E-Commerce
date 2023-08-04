async function getProducts() {
	let products = await fetch('https://fakestoreapi.com/products')
		.then(res=>res.json())
		.catch(err=>console.log(err))

	return products
}
// let searchedProducts = []
// function filterProducts(products) {
// 	const searchBy = localStorage.getItem('search')
// 	if (!searchBy) return products
// 	const pattern = new RegExp(`${searchBy}`)
// 	searchedProducts = products.filter(prod => pattern.test(prod.title))
// }

// async function initPage() {
// 	const products = await getProducts()
// 	searchedProducts = filterProducts(products)
// }

initPage()

document.getElementById("h1").innerHTML+=window.localStorage.getItem("search") // put query name in h1 
		let searchedProducts=[] ;
		function searchs(nameKey, productsArr){ // function serach query name in api products title
			for (var i=0; i < productsArr.length; i++) {
				if(productsArr[i].title.includes(nameKey)==true){
					searchedProducts.push(productsArr[i])
					console.log("for")
				}
				
			}
			console.log(searchedProducts.length)
		
			// for (var i=0; i < searchedProducts.length; i++) {
			// var productDiv = document.getElementById("container")
		   	// productDiv.innerHTML += searchedProducts[i].title
			// console.log(searchedProducts[i])
				
			// }
			for (product of searchedProducts) {
				var productDiv = document.getElementById("container")
				productDiv.innerHTML +=`<div class="col-md-12">
											<div><img src="${product.image}"></div>
											<div><h2>${product.title}</h2></div>
											<p>${product.description}</p>
										</div>`;
			}
		}
		 
		
		

	
			
		searchs(window.localStorage.getItem("search"), products)// use function
			

	


