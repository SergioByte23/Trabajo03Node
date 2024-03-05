const { getAll, create, getOne, remove, update, setMoviesGenres, setMoviesActors, setMoviesDirectors } = require('../controllers/movies.controllers');
const express = require('express');


const routerMovie = express.Router();

routerMovie.route('/movies')
    .get(getAll)
    .post(create);

routerMovie.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerMovie.route("/movies/:id/genres")
    .post(setMoviesGenres);

routerMovie.route("/movies/:id/directors")
    .post(setMoviesDirectors);

routerMovie.route("/movies/:id/actors")
    .post(setMoviesActors);
module.exports = routerMovie;