const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cart-list");

cart.map((product) => {
    const card = `
        <div class="cart-item" data-index="${cart.indexOf(product)}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>

        <div class="quantity" aria-label="Quantity for ${product.name}">
            <button type="button" class="quantity-btn" data-action="decrease" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus" aria-hidden="true"></i>
            </button>
            <span>${product.quantity}</span>
            <button type="button" class="quantity-btn" data-action="increase" aria-label="Increase quantity">
                <i class="fa-solid fa-plus" aria-hidden="true"></i>
            </button>
        </div>
        <button type="button" class="remove-btn" aria-label="Remove ${product.name} from cart">
            <i class="fa-solid fa-trash-can" aria-hidden="true"></i>
            <span>Remove</span>
        </button>

        
        </div>
        
    `;

    cartList.innerHTML += card;
});

const buttons = document.querySelectorAll(".quantity-btn");
const removeButtons = document.querySelectorAll(".remove-btn");

function updateSubtotal() {
    const subtotal = cart.reduce((total, product) => {
        const price = Number(product.price.replace("$", ""));
        return total + (price * product.quantity);
    }, 0);
    const tax = subtotal * 0.05;
    const shipping = 10;
    const total = subtotal + tax + shipping;
    document.getElementById("cart-subtotal").textContent = `$${subtotal.toFixed(2)}`;

    document.getElementById("cart-shipping").textContent = `$${shipping.toFixed(2)}`;

    document.getElementById("cart-tax").textContent =`$${tax.toFixed(2)}`;

    document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
}

updateSubtotal();

removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
    const cartItem = button.closest(".cart-item");
    const index = Number(cartItem.dataset.index);
    cart.splice(index, 1);
    cartItem.remove();
    updateSubtotal();

    localStorage.setItem("cart", JSON.stringify(cart));
    });
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const quantity = button.parentElement.querySelector("span");
        let count = Number(quantity.textContent);

        const cartItem = button.closest(".cart-item");
        const index = Number(cartItem.dataset.index);


        if (button.dataset.action === "increase") {
            count++;
        }

        if (button.dataset.action === "decrease") {
            count--;
        }
        if (count < 1) {
            count = 1;
        }
        quantity.textContent = count;

        cart[index].quantity = count;

        updateSubtotal();

        localStorage.setItem("cart", JSON.stringify(cart));

    });
});