const request = require("postman-request");

// Finding movie via title search

const APIKEY = "cecf8342c3d41e9e916ff0a82acd0445";

const search = (movieTitle, callback) => {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
    movieTitle
  )}&api_key=${APIKEY}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the server.", undefined);
    } else if (body.total_results === 0) {
      callback("Unable to find movie. Try another search.", undefined);
    } else {
      callback(undefined, {
        id: body.results[0].id,
        title: body.results[0].original_title,
        poster: body.results[0].poster_path,
      });
    }
  });
};

module.exports = search;
