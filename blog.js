const loadMoreBtn = document.querySelector('.blog-more button');
const hiddenCards = document.querySelectorAll('.blog-card.hidden');

if (loadMoreBtn && hiddenCards.length > 0) {
    let expanded = false;

    loadMoreBtn.addEventListener('click', () => {
        expanded = !expanded;

        if (expanded) {
            const nextCards = Array.from(hiddenCards).slice(0, 3);
            nextCards.forEach((card) => card.classList.remove('hidden'));
            loadMoreBtn.textContent = 'Show less';
        } else {
            Array.from(document.querySelectorAll('.blog-card')).forEach((card, index) => {
                if (index >= 6) {
                    card.classList.add('hidden');
                }
            });
            loadMoreBtn.textContent = 'Load more';
        }
    });
}
