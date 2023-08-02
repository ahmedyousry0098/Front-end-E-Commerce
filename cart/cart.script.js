let totalPrice = 0
let tax = 0;
const mainContainer = document.getElementById('mainContainer')
const cartIds = localStorage.getItem('cartIds')
const cartIdsList = cartIds?.split(',')
const uniqueItems = cartIdsList?.filter((value, index, array) => {
    return array.indexOf(value) === index
})

async function getAllProducts() {
    let allProducts = await fetch('https://fakestoreapi.com/products')
        .then(data => data.json())
        .catch(err => console.log(err))
    return allProducts
}

async function getCartProducts() {
    const allProducts = await getAllProducts()
    const cartProducts = allProducts.filter(prod => {
        return uniqueItems?.includes(String(prod.id))
    })
    return cartProducts
}

function getProductQuantity(productId) {
    const repeatedProduct = cartIdsList.filter(id => {
        return productId == id
    })
    return repeatedProduct.length
}

function removeItemFromCart(productId) {
    let filteredArray = cartIdsList.filter(id => productId != id)
    localStorage.setItem("cartIds", (filteredArray.concat(",")))
    location.reload()
}

function initEmptyCart() {
    const div = document.createElement('div')
    const txt = document.createTextNode('Cart Is Empty..')
    div.appendChild(txt)
    div.setAttribute("id", 'emptyContainer')
    mainContainer.appendChild(div)
}

function initLayout(cartProducts) {
    for (let product of cartProducts) {
        
        // Container
        const containerDiv = document.createElement('div')
        containerDiv.setAttribute('id', 'itemContainer')
    
        // Image
        const productImg = document.createElement('img')
        productImg.classList.add('productImg')
        productImg.src = product.image
    
        // Title
        const productTitle = document.createElement('p')
        productTitle.classList.add('title')
        productTitle.innerHTML = product.title
    
        //Price
        const productQuantity = getProductQuantity(product.id)
        totalPrice += product.price * productQuantity

        const price = document.createElement('p')
        price.classList.add('price')
        price.innerHTML = `${product.price * productQuantity}$`
        price.style.color = "green"
        price.style.fontWeight = "bold"
    
        // Quantity
        const quantity = document.createElement('input')
        quantity.setAttribute('type', 'number')
        quantity.setAttribute('value', productQuantity)
        quantity.setAttribute('type', 'number')
        let currentValue = quantity.value
        quantity.addEventListener('change', function (e) {
            if (e.target.value>currentValue){
                cartIdsList.push(product.id)
            } else if (e.target.value < currentValue) {
                cartIdsList.splice(cartIdsList.indexOf(product.id), 1)
            }
            localStorage.setItem('cartIds', cartIdsList)
            window.location.reload()
        })
    
        // Remove Button
        const removeBtn = document.createElement('button')
        const btnTxt = document.createTextNode('Remove From Cart')
        removeBtn.classList.add('removeBtn')
        removeBtn.appendChild(btnTxt)
        removeBtn.addEventListener('click', () => {
            removeItemFromCart(product.id)
        })

        // console.log(totalPrice);
        containerDiv.appendChild(productImg)
        containerDiv.appendChild(productTitle)
        containerDiv.appendChild(price)
        containerDiv.appendChild(quantity)
        containerDiv.appendChild(removeBtn)
        mainContainer.appendChild(containerDiv)
    }
}

function initCalcTable() {
    const div = document.createElement('div')
    div.setAttribute('id', 'calcTable')
    div.innerHTML = `
        <div class="subtotal">
            <p style="font-weight:bold;"> Subtotal: </p>
            <p> ${totalPrice}$ </p>
        </div>
        <div class="tax">
            <p style="font-weight:bold;"> Tax: </p>
            <p> ${tax}$ </p>
        </div>
        <div class="checkout">
            <p style="font-weight:bold;"> Checkout: </p>
            <p> ${totalPrice+tax}$ </p>
        </div>
    `
    mainContainer.appendChild(div)
}

async function createCartPage() {
    const cartProducts = await getCartProducts()
    if (!cartProducts?.length) {
        initEmptyCart()
    }
    else {
        initLayout(cartProducts)
        initCalcTable()
    }
}

createCartPage()