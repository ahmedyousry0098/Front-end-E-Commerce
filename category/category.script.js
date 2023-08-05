
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
        
        // itemContainer.setAttribute('class', 'col container-md')
        itemContainer.setAttribute('id', 'itemContainer')
        itemContainer.innerHTML = `
        <div class="">
            <p id="title" class="pt-1"> ${product.title} </p>
            <div class="">
                <img src=${product.image} id="productImg" class="">
            </div>
            <div class="">
                <!-- <p id="description" class=""> ${product.description} </p> -->
                <p id="price" class="t"> ${product.price}$ </p>
            </div>
        </div>
        `
        mainContainer.appendChild(itemContainer)
        itemContainer.addEventListener('click', function() {
            window.open(`../product/product.html?id=${product.id}`, "_self")
        })
    }
    
}

async function initCategoryPage() {
    const allProducts = await getAllProducts()
    const products = filteredProducts(allProducts)
    initPageLayout(products)
}

initCategoryPage()