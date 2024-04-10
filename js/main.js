let productThumbnailView = document.querySelector('.product__thumbnail-view');

let thumbnailNavImage = Array.from(document.getElementsByClassName('main--nav-image'));

const lightBox = document.querySelector('.product__light_box');
const lightboxCloseBtn = document.querySelector('.lightbox--close-btn');


productThumbnailView.addEventListener('click', () => {
    const productImageIndex = productThumbnailView.getAttribute('id').split('').slice(6).join('');

    lightBox.style.display = 'flex'

    thumbnailNavImage = Array.from(document.getElementsByClassName('lightbox--nav-image'));
    productThumbnailView = document.querySelector('.productlb__thumbnail-view');

    productThumbnailView.firstElementChild.setAttribute('src', `assets/images/image-product-${productImageIndex}.jpg`)
    productThumbnailView.setAttribute('id', `image-${productImageIndex}`)

    navImageEventRegister();
    thumbnailClassRemover();
    thumbnailNavImage[productImageIndex - 1].lastElementChild.classList.add('thumbnail--active')

})

lightboxCloseBtn.addEventListener('click', () => {
    lightBox.style.display = 'none'
    thumbnailNavImage = Array.from(document.getElementsByClassName('main--nav-image'));
    productThumbnailView = document.querySelector('.product__thumbnail-view');
})

// PRODUCT IMAGE CHANGE

const thumbnailClassRemover = () => {
    thumbnailNavImage.forEach(thumbnail => {
        thumbnail.lastElementChild.classList.remove('thumbnail--active')
    })
}
const navImageEventRegister = () => {
    thumbnailNavImage.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            thumbnailClassRemover();
            thumbnail.lastElementChild.classList.add('thumbnail--active');

            productThumbnailView.firstElementChild.setAttribute('src', `assets/images/image-product-${index + 1}.jpg`)
            productThumbnailView.setAttribute('id', `image-${index + 1}`)

        })
    })
}

navImageEventRegister();

// LIGHTBOX IMAGE CHANGE
const lightboxPrevious = document.querySelector('.lightbox--previous')
const lightboxNext = document.querySelector('.lightbox--next')

lightboxPrevious.addEventListener('click', () => {
    const productImageIndex = Number(productThumbnailView.getAttribute('id').split('').slice(6).join(''))

    if (productImageIndex > 1) {
        productThumbnailView.setAttribute('id', `image-${productImageIndex - 1}`)
        productThumbnailView.firstElementChild.setAttribute('src', `assets/images/image-product-${productImageIndex - 1}.jpg`)
        console.log(productImageIndex);
        console.log(productImageIndex-1);
        thumbnailClassRemover();
        thumbnailNavImage[productImageIndex - 2].lastElementChild.classList.add('thumbnail--active')
    }
})

lightboxNext.addEventListener('click', () => {
    const productImageIndex = Number(productThumbnailView.getAttribute('id').split('').slice(6).join(''))

    if (productImageIndex < 4) {
        productThumbnailView.setAttribute('id', `image-${productImageIndex + 1}`)
        productThumbnailView.firstElementChild.setAttribute('src', `assets/images/image-product-${productImageIndex + 1}.jpg`)
        console.log(productImageIndex);
        thumbnailClassRemover();
        thumbnailNavImage[productImageIndex].lastElementChild.classList.add('thumbnail--active')
    }
})

// PRODUCT ADD TO CART
const addCartMinus = document.querySelector('.add--cart-minus');
const addCartPlus = document.querySelector('.add--cart-plus');
const addCartNumber = document.querySelector('.add--cart-number');

addCartMinus.addEventListener('click', () => {
    if (+addCartNumber.textContent == 0) {
        return
    }
    addCartNumber.textContent = +addCartNumber.textContent - 1
})
addCartPlus.addEventListener('click', () => {
    if (+addCartNumber.textContent == 30) {
        return
    }
    addCartNumber.textContent = +addCartNumber.textContent + 1
})

// CART

const cart = document.querySelector('.cart');
const cartIcon = document.querySelector('.cart__icon');
const cartItemsNumber = document.querySelector('.cart__items_number');
const addToCart = document.querySelector('.add--to-cart');
const cartContent = document.querySelector('.cart__content');

cart.addEventListener('mouseleave', () => {
    setTimeout(() => {
        cart.style.display = ' none'
    }, 1000)
})

cartIcon.addEventListener('click', () => {
    cart.style.display = 'block'
})

addToCart.addEventListener('click', () => {
    if (Number(addCartNumber.innerHTML)) {
        cartItemsNumber.style.display = 'block';
        cart.style.display = 'block'

        cartItemsNumber.firstElementChild.textContent = addCartNumber.textContent
        cartContent.innerHTML = `
                <div class="cart__product">
                                        <figure class="cart--product-image">
                                            <img src="assets/images/image-product-1.jpg" alt="">
                                        </figure>
                                        <div class="cart--product-details">
                                            <p>Fall Limited Edition Sneakers</p>
                                            <p>
                                                <span>$125.00 x </span>
                                                <span>${addCartNumber.textContent}</span>&nbsp
                                                <span class="cart__item_total">$${125 * +addCartNumber.textContent}</span>
                                            </p>
                                        </div>
                                        <div class="cart--product-delete">
                                            <img src="assets/images/icon-delete.svg" alt="">
                                        </div>
                                    </div>
                                    <div class="cart__checkout">
                                        <p>Checkout</p>
                                    </div>
                `
        addCartNumber.textContent = 0
    }

    // DELETING CART ITEM
    const cartProductDeleteBtn = document.querySelector('.cart--product-delete');

    cartProductDeleteBtn.addEventListener('click', () => {
        cartItemsNumber.style.display = 'none';
        cartContent.innerHTML = '<p>Your cart is empty.</p>'
    });
})

