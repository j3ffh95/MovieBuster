const ApiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const imagePath = "https://image.tmdb.org/t/p/w1280";
const searchApiPath =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

// Get elements from the doc
const mainSection = document.querySelector("#main"),
  formElement = document.querySelector("#form"),
  seachElement = document.querySelector("#search");
