const apiKey = '68ca96131fdc4402941afcd94a0bf899'; // Reemplaza con tu clave de NewsAPI
const newsContainer = document.getElementById('news-container');

// Función para obtener noticias
async function fetchNews() {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=autos&language=es&apiKey=${apiKey}`);
        const data = await response.json();

        // Verificar si la petición fue exitosa
        if (data.status === 'ok') {
            renderNews(data.articles);
        } else {
            console.error("Error al obtener noticias: ", data.message);
        }
    } catch (error) {
        console.error("Error en la petición: ", error);
    }
}

// Función para renderizar las noticias
function renderNews(articles) {
    newsContainer.innerHTML = ''; // Limpiar el contenedor
    articles.forEach(article => {
        const { title, description, url, urlToImage } = article;

        // Crear la card de Bootstrap
        const newsCard = `
            <div class="col-md-4">
                <div class="card h-100">
                    <img src="${urlToImage || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="Noticia">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text flex-grow-1">${description || 'No hay descripción disponible.'}</p>
                        <a href="${url}" target="_blank" class="btn btn-primary mt-auto">Leer más</a>
                    </div>
                </div>
            </div>
        `;
        newsContainer.insertAdjacentHTML('beforeend', newsCard);
    });
}

// Llamar a la función para cargar las noticias
fetchNews();
