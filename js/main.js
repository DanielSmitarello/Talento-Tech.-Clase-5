document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.querySelector('.navbar-menu');

    burger.addEventListener('click', () => {
        // Toggle la clase 'is-active' en el menú y el botón hamburguesa
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
});
