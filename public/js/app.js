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
      if (data.total_results === 0) {
        searchResults.textContent = "";
        searchResults.insertAdjacentHTML(
          "afterbegin",
          `<div class="results-count">
                    <small>Your search didn't match any movies.</small>
                </div>`
        );
      } else {
        searchResults.textContent = "";
        searchResults.insertAdjacentHTML(
          "afterbegin",
          `<div class="results-count">
                  <small>${data.results.length} results</small>
              </div>`
        );
        data.results.forEach((m) =>
          searchResults.insertAdjacentHTML(
            "beforeend",
            `<div class="search-result">
                      <img src="https://image.tmdb.org/t/p/w300/${m.poster_path}" alt="${m.original_title} poster">
                      <div class="movie-details">
                          <h3 class="movie-title">${m.original_title}</h3>
                          <p class="movie-overview">${m.overview}</p>
                          <button>More Info</button>
                    </div>`
          )
        );
      }
    });
  });
});
