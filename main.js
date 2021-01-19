let API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c";

// const ApiUrl = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api-key}&page=1";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const imagePath = "https://image.tmdb.org/t/p/w1280";
const searchApiPath = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query="`;

// Get elements from the doc
const mainSection = document.querySelector("#main"),
  formElement = document.querySelector("#form"),
  searchElement = document.querySelector("#search"),
  movieFilterButtons = Array.from(
    document.querySelectorAll(".movie-filter .btn")
  );

function removeAllSuccessClass(buttonsArray, clickedBtn) {
  buttonsArray.forEach((button) => {
    if (button.classList.contains("active")) button.classList.remove("active");
  });

  clickedBtn.target.classList.add("active");
}

document
  .querySelector('[title="popular"]')
  .addEventListener("click", function (e) {
    mainSection.innerHTML = "";
    // switching between active
    removeAllSuccessClass(movieFilterButtons, e);
    getMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
  });

document
  .querySelector('[title="upcoming"]')
  .addEventListener("click", function (e) {
    mainSection.innerHTML = "";
    // switching between active
    removeAllSuccessClass(movieFilterButtons, e);
    getMovies(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
  });
document
  .querySelector('[title="now-playing"]')
  .addEventListener("click", function (e) {
    mainSection.innerHTML = "";
    // switching between active
    removeAllSuccessClass(movieFilterButtons, e);
    getMovies(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
  });
document
  .querySelector('[title="top-rated"]')
  .addEventListener("click", function (e) {
    mainSection.innerHTML = "";
    // switching between active
    removeAllSuccessClass(movieFilterButtons, e);
    getMovies(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
  });

// Get movies from API
window.addEventListener("DOMContentLoaded", function () {
  getMovies(apiUrl);
});
// getMovies(apiUrl);

async function getMovies(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();

  showMovies(data.results);
}

function showMovies(movies) {
  // main.innerHTML = "";

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

// Search feature
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchElement.value;

  if (searchTerm !== "") {
    mainSection.innerHTML = "";
    getMovies(searchApiPath + searchTerm);

    searchApiPath.value = "";
  } else {
    window.location.reload();
  }
});
