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
  movies.forEach((movie) => {
    let { title, overview, poster_path, vote_average, backdrop_path } = movie;

    // Create div element of movie
    const divMovieElement = document.createElement("div");
    // add class of movie to the element
    divMovieElement.classList.add("movie");

    // if (poster_path === null) poster_path = backdrop_path;

    // This if statement takes care if the movie has a image path, if it doesnt then we are not going to show it.
    if (poster_path !== null) {
      // create the inside of the divMovieElement
      divMovieElement.innerHTML = `
      <img src='${imagePath + poster_path}' alt='${title} image' />
      <div class='movie-info'>
        <h3>${title}</h3>
        <span class='${getClassByRate(vote_average)}'>${vote_average}</span>
      </div>
      <div class='overview'>
        <h3>Overview</h3>
        <p>${overview}</p>
      </div>
    `;

      // Attached it to the  main section element using the appendChild method
      mainSection.appendChild(divMovieElement);
    }
  });
}

// This function will return a color name depending what the vote average is;
function getClassByRate(voteNum) {
  if (voteNum >= 8) {
    return "green";
  } else if (voteNum >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Search for submit feature
formElement.addEventListener("submit", (e) => {
  // Preventing default from the submit event
  e.preventDefault();

  let searchTerm = searchElement.value;

  if (searchTerm !== "") {
    mainSection.innerHTML = "";

    getMovies(searchApiPath + searchTerm);
    // console.log(searchApiPath.value);
    // searchElement.value = "";
  } else {
    window.location.reload();
  }
});
