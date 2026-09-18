
const tabs = document.querySelectorAll('.catalog-tab');
const cards = document.querySelectorAll('.catalog-card');
const learnMoreBtn = document.getElementById('learn-more-btn');
const hiddenCards = document.querySelectorAll('.hidden-card');

const updateCards = (filter) => {
    cards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.style.display = matches ? 'flex' : 'none';
    });
};

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        tabs.forEach((item) => item.classList.toggle('active', item === tab));
        updateCards(tab.dataset.filter);
    });
});

if (learnMoreBtn && hiddenCards.length) {
    let expanded = false;

    learnMoreBtn.addEventListener('click', () => {
        expanded = !expanded;

        hiddenCards.forEach((card) => {
            card.classList.toggle('show', expanded);
            card.style.display = expanded ? 'flex' : 'none';
        });

        learnMoreBtn.textContent = expanded ? 'Show Less' : 'Learn More';
    });
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartButtons = document.querySelectorAll(".collections-btn");

cartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const card = button.closest(".Product-card");

        const name = card.querySelector("h3").textContent;
        const price = card.querySelector(".price").textContent;
        const image = card.querySelector("img").src;

        const product = {
            name: name,
            price: price,
            image: image,
            quantity: 1
        };

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        button.innerHTML = `<i class="fa-solid fa-check"></i>`;

        const cartCount = document.getElementById("cart-count");
        cartCount.textContent = cart.length;

        console.log(product);
    });
});