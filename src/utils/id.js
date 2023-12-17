const request = require("postman-request");

// Finding movie ID

const APIKEY = "cecf8342c3d41e9e916ff0a82acd0445";

const id = (movieID, callback) => {
  const url = `https://api.themoviedb.org/3/movie/${encodeURIComponent(
    id
  )}?api_key=${APIKEY}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the server.", undefined);
    } else if (body.success) {
      callback("Unable to find movie. Try another search.", undefined);
    } else {
      callback(undefined, {
        title: body.original_title,
        poster: body.poster_path,
      });
    }
  });
};

module.exports = id;
