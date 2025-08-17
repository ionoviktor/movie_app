const API_KEY = "30356d2e-9eca-4aaf-a741-07e843ef95c3";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

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