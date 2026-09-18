const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".Product-card");

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("Something going wrong");
    });
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        console.log(tab.textContent);

        cards.forEach(card => {

            if (tab.textContent === "All products") {
                card.style.display = "flex";

            } else if (card.dataset.category === tab.textContent.toLowerCase()) {
                card.style.display = "flex";

            } else {
                card.style.display = "none";
            }

        });

    });
});

cards.forEach(card => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "link");

    const openProductPage = () => {
        window.location.href = "product.html";
    };

    card.addEventListener("click", (event) => {
        if (!event.target.closest(".collections-btn")) {
            openProductPage();
        }
    });

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProductPage();
        }
    });
});