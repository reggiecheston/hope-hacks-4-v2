const movieForm = document.querySelector("form");
const search = document.querySelector("input");
const searchResults = document.getElementById("search-results");

const APIKEY = "cecf8342c3d41e9e916ff0a82acd0445";

// const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
//     movieTitle
//   )}&api_key=${APIKEY}`;

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movieTitle = search.value.trim();
  //   const id = (searchResults.textContent = "Loading...");

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      movieTitle
    )}&api_key=${APIKEY}`
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        searchResults.innerHTML = `<h2>${data.error}</>`;
      } else {
        searchResults.textContent = "";
        data.results.forEach((m) =>
          searchResults.insertAdjacentHTML(
            "afterbegin",
            `<img src="${m.poster_path}" alt="${m.original_title} poster">
              <div class="movie-details">
                <h2 class="movie-title">${m.original_title}</h2>
                <p class="movie-overview">${m.overview}</p>
              </div>`
          )
        );
      }
    });
  });
});
