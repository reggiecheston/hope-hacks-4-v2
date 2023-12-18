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
                  <small>${data.results.length} results for "${movieTitle}"</small>
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
                          <div class="movie-details__btns">
                            <button class="movie-details__btn">More Info</button>
                            <button class="movie-details__btn cta-btn" data-movie-id="${m.id}">Similar Movies</button>
                          </div>
                    </div>
            </div>`
          )
        );

        const ctaBtn = document.querySelectorAll(".cta-btn");
        console.log(ctaBtn);

        ctaBtn.forEach((btn) => {
          btn.addEventListener("click", () => {
            const id = btn.dataset.movieId;
            console.log(id);
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${APIKEY}`
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
                        <div class="movie-details__btns">
                            <button class="movie-details__btn">More Info</button>
                        </div>
                    </div>
                  </div>`
                    )
                  );
                }
              });
            });
          });
        });
      }
    });
  });
});
