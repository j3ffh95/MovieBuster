let API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";

// const ApiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api-key}&page=1";
const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
const imagePath = "https://image.tmdb.org/t/p/w1280";
const searchApiPath = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

// Get elements from the doc
const mainSection = document.querySelector("#main"),
  formElement = document.querySelector("#form"),
  seachElement = document.querySelector("#search");

// Get movies from API
getMovies(apiUrl);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${imagePath + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;
    mainSection.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(searchApiPath + searchTerm);

    searchApiPath.value = "";
  } else {
    window.location.reload();
  }
});
