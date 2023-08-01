let products;
const mainContainer = document.getElementById('mainContainer')

async function getProduct () {
    products = await fetch('https://fakestoreapi.com/products')
    .then(data => {
        return data.json()   
    })
    .catch(err => {
        console.log({error: err})
    })

    const queryParam = window.location.search
    const urlParams = new URLSearchParams(queryParam);
    let productId = urlParams.get('id') || 1
    if (productId <= 0) productId = 1

    const clickedProduct = products.find(pro => pro.id == productId) 
    return clickedProduct
}

function initProductImg(product) {
    const prodImg = document.createElement('img')
    prodImg.src = product.image
    prodImg.classList.add('prodImg')
    mainContainer.appendChild(prodImg)
}

function initProductInfo(product) {
    // div
    const prodInfoDiv = document.createElement('div')
    prodInfoDiv.classList.add('infoContainer')

    // title 
    const titlePar = document.createElement('p')
    titlePar.classList.add('txt', 'bigTxt')
    titlePar.innerHTML = `${product.title}`

    // description
    const descPar = document.createElement('p')
    descPar.classList.add('txt')
    descPar.innerHTML = `Description: ${product.description}`

    // category
    const categorPar = document.createElement('p')
    categorPar.classList.add('txt')
    categorPar.innerHTML = `Category: ${product.category}`
    
    // category
    const pricePar = document.createElement('p')
    pricePar.classList.add('txt')
    pricePar.innerHTML = `Price: ${product.price}$`

    // Rating
    const ratingDivContainer = document.createElement('div')

    const ratingPar = document.createElement('p')
    ratingPar.innerHTML = `${product.rating.rate}`
    ratingPar.style.fontWeight = '700'
    ratingPar.style.marginLeft = "5px"
    
    const star = document.createElement('span')
    star.innerHTML = `&bigstar;`
    star.style.color = 'rgb(255,216,20)'
    star.style.fontSize = "20px"
    
    ratingPar.prepend(star)

    const absoluteRatingBar = document.createElement('div')
    const actualRatingBar = document.createElement('div')

    absoluteRatingBar.classList.add('absoluteRatingBar')
    actualRatingBar.classList.add('actualRatingBar')
    actualRatingBar.style.width = `${(product.rating.rate*20)}%`

    absoluteRatingBar.appendChild(actualRatingBar)

    ratingDivContainer.classList.add('ratingContainer')
    ratingDivContainer.appendChild(ratingPar)
    ratingDivContainer.appendChild(absoluteRatingBar)


    // append Elements Into Info div
    prodInfoDiv.appendChild(titlePar)
    prodInfoDiv.appendChild(descPar)
    prodInfoDiv.appendChild(categorPar)
    prodInfoDiv.appendChild(pricePar)
    prodInfoDiv.appendChild(ratingDivContainer)
    mainContainer.appendChild(prodInfoDiv)
}

function initAddToCartBtn (product) {
    const btn = document.createElement('button')
    btn.classList.add('addCartBtn')
    const btnTitle = document.createTextNode('Add To Cart')

    const pricePar = document.createElement('p')
    const priceTxt = document.createTextNode(`${product.price}$`)
    pricePar.classList.add('priceOnBtn')
    pricePar.appendChild(priceTxt)

    btn.appendChild(btnTitle)
    btn.appendChild(pricePar)

    btn.addEventListener('click', () => {
        const cratIds = localStorage.getItem("cartIds")
        if (!cratIds) {
            localStorage.setItem('cartIds', JSON.stringify(product.id))
        } else {
            localStorage.setItem('cartIds', `${cratIds},${product.id}`)            
        }        
        initPopupAlert(`Item ${product.title} added successfully to cart`)
        setTimeout(() => {
            document.getElementById('alertBox').remove()
        }, 2000)
    })

    mainContainer.appendChild(btn)
}

function initPopupAlert(content) {
    const alertBox = document.createElement('div')
    const alertContent = document.createTextNode(content)
    alertBox.setAttribute('id', 'alertBox')
    alertBox.appendChild(alertContent)
    document.body.append(alertBox)
}

async function createProduct() {
    const clickedProduct = await getProduct()
    
    initProductImg(clickedProduct)
    initProductInfo(clickedProduct)
    initAddToCartBtn(clickedProduct)
}

createProduct()

//Test Link Between Two Pages
function openCartPage() {
    window.open('../cart/cart.html', '_blank')
}

document.getElementById('btnn').onclick = openCartPage
