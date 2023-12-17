const express = require("express");
const path = require("path");
const hbs = require("hbs");
const searchMovies = require("./utils/search");
const similarMovies = require("./utils/similar-movies");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Movies",
    name: "Reggie Cheston",
  });
});

app.get("/movies", async (req, res) => {
  if (!req.query.title) {
    return res.send({
      error: "Please provide a valid movie title",
    });
  } else {
    searchMovies(req.query.title, (error, { id, title, overview } = {}) => {
      if (error) {
        return res.send({ error });
      }
      similarMovies(id, (error, searchResult) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          result: searchResult,
          title,
          overview,
          poster,
        });
      });
    });
  }
});

app.listen(4000, () => console.log("Server listening on port 4000..."));
