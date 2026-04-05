const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dataPath = path.join(__dirname, '../ressources/movie.json');
let movies = require(dataPath);

// Task 1.2: GET /movies (Gibt Objekt als Array zurück)
app.get('/movies', function (req, res) {
  res.json(Object.values(movies));
});

// Task 2.1: GET /movies/:imdbID
app.get('/movies/:imdbID', function (req, res) {
  const movie = movies[req.params.imdbID];
  if (movie) {
    res.json(movie);
  } else {
    res.sendStatus(404);
  }
});

// Task 3.1 & 3.2: PUT /movies/:imdbID (Speichert in Datei)
app.put('/movies/:imdbID', function (req, res) {
  const imdbID = req.params.imdbID;
  const exists = !!movies[imdbID];

  movies[imdbID] = req.body;
  fs.writeFileSync(dataPath, JSON.stringify(movies, null, 2), 'utf-8');

  if (exists) {
    res.sendStatus(200);
  } else {
    res.status(201).json(movies[imdbID]);
  }
});

app.listen(3000, () => {
  console.log("Server now listening on http://localhost:3000/");
});