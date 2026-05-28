const cart = [];

const cartContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');

let lastScroll = 0;

/* =========================
   TOGGLE CART
========================= */

function toggleCart(){

    document.getElementById('cart').classList.toggle('active');

}

/* =========================
   ADD TO CART
========================= */

function addToCart(name, price){

    const existingItem = cart.find(item => item.name === name);

    if(existingItem){

        existingItem.quantity += 1;

    }else{

        cart.push({
            name,
            price,
            quantity:1
        });

    }

    renderCart();

    animateCartButton();

}

/* =========================
   RENDER CART
========================= */

function renderCart(){

    cartContainer.innerHTML = '';

    let total = 0;

    if(cart.length === 0){

        cartContainer.innerHTML = `
            <div class="empty-cart">
                <h3>🛒 Tu carrito está vacío</h3>
                <p>Agregá productos del menú.</p>
            </div>
        `;

    }

    cart.forEach((item,index)=>{

        const subtotal = item.price * item.quantity;

        total += subtotal;

        cartContainer.innerHTML += `
            <div class="cart-item">

                <div class="cart-item-info">

                    <strong>${item.name}</strong>

                    <p>
                        $${item.price.toLocaleString()}
                    </p>

                    <div class="qty-controls">

                        <button onclick="decreaseQty(${index})">
                            -
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button onclick="increaseQty(${index})">
                            +
                        </button>

                    </div>

                </div>

                <div class="cart-item-right">

                    <div class="cart-subtotal">
                        $${subtotal.toLocaleString()}
                    </div>

                    <button class="remove-btn" onclick="removeItem(${index})">
                        ❌
                    </button>

                </div>

            </div>
        `;

    });

    cartTotal.innerText = '$' + total.toLocaleString();

    updateCartCount();

}

/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount(){

    let count = 0;

    cart.forEach(item => {

        count += item.quantity;

    });

    cartCount.innerText = count;

}

/* =========================
   INCREASE QTY
========================= */

function increaseQty(index){

    cart[index].quantity += 1;

    renderCart();

}

/* =========================
   DECREASE QTY
========================= */

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity -= 1;

    }else{

        cart.splice(index,1);

    }

    renderCart();

}

/* =========================
   REMOVE ITEM
========================= */

function removeItem(index){

    cart.splice(index,1);

    renderCart();

}

/* =========================
   CART BUTTON ANIMATION
========================= */

function animateCartButton(){

    const cartBtn = document.querySelector('.cart-btn');

    cartBtn.style.transform = 'scale(1.12)';

    setTimeout(()=>{

        cartBtn.style.transform = 'scale(1)';

    },200);

}

/* =========================
   SCROLL EFFECT
========================= */

window.addEventListener('scroll', () => {

    const cartBtn = document.querySelector('.cart-btn');

    const currentScroll = window.scrollY;

    if(currentScroll > lastScroll){

        cartBtn.style.top = '15px';
        cartBtn.style.transform = 'scale(.92)';

    }else{

        cartBtn.style.top = '30px';
        cartBtn.style.transform = 'scale(1)';

    }

    lastScroll = currentScroll;

});

/* =========================
   CHECKOUT BUTTON
========================= */

document.addEventListener('DOMContentLoaded', ()=>{

    renderCart();

    const checkoutBtn = document.querySelector('.checkout-btn');

    checkoutBtn.addEventListener('click', ()=>{

        if(cart.length === 0){

            alert('Tu carrito está vacío.');

            return;

        }

        let message = '🔥 PEDIDO PUNTO NORTE 🔥%0A%0A';

        let total = 0;

        cart.forEach(item=>{

            const subtotal = item.price * item.quantity;

            total += subtotal;

            message += `• ${item.name} x${item.quantity} - $${subtotal.toLocaleString()}%0A`;

        });

        message += `%0A💰 TOTAL: $${total.toLocaleString()}`;

        window.open(
            `https://wa.me/5491166934099?text=${message}`,
            '_blank'
        );

    });

});