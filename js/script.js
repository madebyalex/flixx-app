const global = {
  currentPage: window.location.pathname,
};

// Display the most popular movies
async function displayPopularMovies(num = 8) {
  const { results } = await fetchAPIData('movie/popular');

  console.log(results);

  results.slice(0, num).forEach((show) => {
    const div = document.createElement('div');

    div.classList.add('card');
    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `
            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.title}"
            />`
            : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.title}"
            />
            `
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>
    `;

    document.getElementById('popular-movies').appendChild(div);
  });
}

// Display the most popular shows
async function displayPopularShows(num = 8) {
  const { results } = await fetchAPIData('tv/popular');

  console.log(results);

  results.slice(0, num).forEach((show) => {
    const div = document.createElement('div');

    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `
            <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.title}"
            />`
            : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${show.first_air_date}</small>
        </p>
      </div>
    `;

    document.getElementById('popular-shows').appendChild(div);
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // const API_KEY = process.env.TMDB_API_KEY;
  // console.log(API_KEY);
  const API_KEY = '51353c622a80940c3340c7c92e033e93';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll('.main-header .nav-link');

  navLinks.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home');
      displayPopularMovies(12);
      break;

    case '/shows.html':
      console.log('Shows');
      displayPopularShows(12);
      break;

    case '/movie-details.html':
      console.log('Movie Details');
      break;

    case '/tv-details.html':
      console.log('TV Details');
      break;

    case '/search.html':
      console.log('Search Results');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
