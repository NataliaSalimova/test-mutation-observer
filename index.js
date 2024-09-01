document.addEventListener('DOMContentLoaded', ()=> {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');
    const totalPriceElement = document.getElementById('total');
    const form = document.querySelectorAll('.pizza-set');
    let totalPrice = 0;

    function init() {
        initEvents();

        hideTotalPrice();
        addTotalPriceContent();

        getOrderPrice();
    }

    function initEvents() {
        checkboxes.forEach((item) => {
            item.addEventListener('change', (event)=> onCheckboxChange(event, item));
        });
    }

    function hideTotalPrice() {
        totalPriceElement.setAttribute('hidden', 'true');
    }

    function addTotalPriceContent () {
        totalPriceElement.innerHTML = `<dt>Стоимость заказанных позиций:</dt> <dd></dd>`;
    }

    function showTotalPrice() {
        if (totalPriceElement.hasAttribute('hidden')) totalPriceElement.removeAttribute('hidden');
    }
    function getOrderPrice() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function (mutation) {
                const selectedInput = mutation.target.children[0];
                const productPrice = getPriceProduct(selectedInput);

                selectedInput.checked ? totalPrice += productPrice : totalPrice -= productPrice;

                updateTotalPrice(totalPrice);
                showTotalPrice();
            });
        })

        const observerConfig = { attributes: true, childList: true, subtree: true };

        observer.observe(form[0], observerConfig);
    }

    function onCheckboxChange(event, item) {
        item.parentElement.style.backgroundColor = item.checked ? 'green' : 'white';
    }

    function getPriceProduct(item) {
        return Number(item.dataset.price);
    }

    function updateTotalPrice (price) {
        const lastTotalPriceElement = total.lastElementChild;

        lastTotalPriceElement.textContent = `${price} руб.`;
    }

    init();
});