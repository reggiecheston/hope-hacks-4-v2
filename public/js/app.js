const movieForm = document.querySelector("form");
const search = document.querySelector("input");
const searchResults = document.getElementById("search-results");
const pageTitle = document.querySelector("h1");

const APIKEY = "cecf8342c3d41e9e916ff0a82acd0445";

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const movieTitle = search.value.trim();

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
                        <button class="movie-details__btn cta-btn" data-movie-id="${m.id}" data-title="${m.original_title}">Similar Movies</button>
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
            const title = btn.dataset.title;
            console.log(id);

            // Scroll to the top of the page
            window.scrollTo({
              top: 0,
            });

            fetch(
              `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${APIKEY}`
            ).then((response) => {
              response.json().then((data) => {
                console.log(data);
                if (data.total_results === 0) {
                  searchResults.textContent = "";
                  searchResults.insertAdjacentHTML(
                    "afterbegin",
                    `<div class="results-count">
                <small>"${title}" is one of a kind! Try another search.</small>
            </div>`
                  );
                } else {
                  searchResults.textContent = "";
                  searchResults.insertAdjacentHTML(
                    "afterbegin",
                    `<div class="results-count">
                            <small>${data.results.length} results for movies similar to "${title}"</small>
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

pageTitle.addEventListener("click", () => {
  search.value = "";
  searchResults.textContent = "";
});
