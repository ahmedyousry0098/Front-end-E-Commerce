
async function getCategories() {
    const categories = await fetch('https://fakestoreapi.com/products/categories')
        .then(data => data.json())
        .catch(err => console.log({error: err}))

    return categories
}

async function getAllProducts() {
    const allProducts = await fetch('https://fakestoreapi.com/products')
        .then(data => data.json())
        .catch(err => console.log({error: err}))
    return allProducts
}

function filteredProducts(products) {
    const filter = localStorage.getItem('filter')
    console.log(filter);
    if (!filter) {
        return products
    }
    const filteredProds = products.filter(prod => prod.category == filter)
    return filteredProds
}

function initPageLayout(products) {
    let mainContainer = document.getElementById('mainContainer')
    for (let product of products) {
        const itemContainer = document.createElement('div')
        itemContainer.addEventListener('click', function() {
            window.open(`../product/product.html?id=${product.id}`)
        })
        itemContainer.setAttribute('id', 'itemContainer')
        itemContainer.innerHTML = `
            <img src=${product.image} id="productImg">
            <p id="title"> ${product.title} </p>
            <p id="description"> ${product.description} </p>
            <p id="price"> ${product.price}$ </p>
        `
        mainContainer.appendChild(itemContainer)
    }

}

async function initCategoryPage() {
    const allProducts = await getAllProducts()
    const products = filteredProducts(allProducts)
    initPageLayout(products)
}

initCategoryPage()