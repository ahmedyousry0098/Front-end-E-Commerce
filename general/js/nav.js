async function getCategories() {
	let categories = await fetch('https://fakestoreapi.com/products/categories')
		.then(res=>res.json())
		.catch(err=>console.log(err))

	return categories
	
}

async function cat(){ // function serach query name in api products title

	let categoriesArr = await getCategories()
	for (let category of categoriesArr) {
		let ulCategories= document.getElementById("categories");
		let liCategory= document.createElement("li");
		let btnCategory=document.createElement("a");
		btnCategory.setAttribute("name",category)
		btnCategory.setAttribute("id",category)
		btnCategory.addEventListener("click",redirectToCatPage)
		btnCategory.textContent=category;
		liCategory.appendChild(btnCategory)
		ulCategories.appendChild(liCategory)
	}
}
cat()

function submitSearchQuery() {
	var val = document.getElementById("serchQuery").value
	window.localStorage.setItem("search",val)
}
function redirectToCatPage(){
	window.localStorage.setItem("filter",this.name)
	open(`../category/category.html`, "_self")
}


// function selectGover(){
// 	var select = document.getElementById("selectGove");
// 	var opt = select.options[select.selectedIndex].text
// 		console.log(opt)

// }
function changopt(){
	var e = document.getElementById("selectGove");
	var text = e.options[e.selectedIndex].text;
	localStorage.setItem("Governorate",text);
	var modelTitle=document.getElementById("btn-modal");
	modelTitle.textContent=localStorage.getItem("Governorate");
}

function logout(){
	localStorage.clear();
	open("../authentication/signup.html", "_self")

}

