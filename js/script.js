const API_KEY = "30356d2e-9eca-4aaf-a741-07e843ef95c3";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.1/films/";


getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    });

    const respData = await resp.json();

    let movies = [];
    if (respData.items) {
        movies = respData.items; // популярные
    } else if (respData.films) {
        movies = respData.films; // поиск
    }

    showMovies(movies);
}

function getClassByRate(vote) {
    if (vote >= 7) {
        return 'green';
    } else if (vote > 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

function showMovies(movies) {
    const moviesEl = document.querySelector('.movies');
    moviesEl.innerHTML = '';

    if (Array.isArray(movies)) {
        movies.forEach((movie) => {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie');
            movieEl.innerHTML = `
                <div class="movie__cover-inner">
                    <img src="${movie.posterUrlPreview}" 
                         alt="${movie.nameRu}" class="movie__cover">
                    <div class="movie__cover-darkened"></div>
                </div>
                <div class="movie__info">
                    <h3 class="movie__title">${movie.nameRu}</h3>
                    <div class="movie__category">
                        ${movie.genres.map(genre => genre.genre).join(', ')}
                    </div>
                    <div class="movie__average movie__average-${getClassByRate(movie.ratingKinopoisk || movie.ratingImdb || movie.rating)}">
                        ${(movie.ratingKinopoisk || movie.ratingImdb || movie.rating) || ''}
                    </div>
                </div>
            `;
            movieEl.addEventListener('click', () => modalTrigger(movie.kinopoiskId)); 
            moviesEl.appendChild(movieEl);
        });
    } else {
        console.error('Ожидался массив, но пришло:', movies);
    }
}

const form = document.querySelector('form');
const search = document.querySelector('.header__search');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;

    if (search.value) {
        getMovies(apiSearchUrl);
        search.value = '';
    }
});

//Modal

const modalEl = document.querySelector('.modal');



async function modalTrigger(id) {
    openModal();

    const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    });

    const respData = await resp.json();

    modalEl.innerHTML = `
     <div class="modal__window">
            <div class="modal__content">
                <span class="modal__close">&times;</span>
                <img src="${respData.data.posterUrlPreview}"
                    alt="${respData.data.nameRu}" class="modal__cover">
                <h2 class="modal__title">${respData.data.nameRu}</h2>
                <ul class="modal__info">
                    <li class="modal__ganre">Жанр: ${respData.data.genres.map(index => index.genre).join(', ')}</li>
                    <li class="modal__website">Сайт: <a href="${respData.data.webUrl}">${respData.data.webUrl}</a></li>
                    <li class="modal__overview">Обзор: ${respData.data.description}</li>
                </ul>
            </div>
        </div>
    `;

    // Hide Modal

    const modalClose = document.querySelector('.modal__close');

    modalClose.addEventListener('click', () => {
        hideModal();
    })

    modalEl.addEventListener('click', (event) => {
        if (event.target === modalEl) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modalEl.style.display === 'block') {
            hideModal();
        }
    });
}

function openModal() {
    modalEl.style.display = 'block'; 
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modalEl.style.display = 'none'; 
    document.body.style.overflow = '';
}