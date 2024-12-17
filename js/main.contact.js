document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.navbar-burger');
    const menu = document.querySelector('.navbar-menu');

    burger.addEventListener('click', () => {
        // Toggle la clase 'is-active' en el menú y el botón hamburguesa
        burger.classList.toggle('is-active');
        menu.classList.toggle('is-active');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Obtén el formulario
    const form = document.querySelector(".form");
    
    // Agrega un evento al formulario para verificar los campos antes de enviar
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Previene el envío del formulario

        // Obtener los campos del formulario
        const nombre = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        // Verificar si todos los campos están completos
        if (nombre && email && subject && message) {
            console.log("Todos los campos están completos.");
            form.submit();  // Si todos los campos están completos, enviamos el formulario
        } else {
            console.log("Hay campos vacíos. Por favor, completa todos los campos.");
        }
    });
});
