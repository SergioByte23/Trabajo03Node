const { getAll, create, getOne, remove, update, setGenresMovies } = require('../controllers/genres.controllers');
const express = require('express');

const genreRouter = express.Router();

genreRouter.route("/genres")
	.get(getAll)
	.post(create);

genreRouter.route("/genres/:id")
	.get(getOne)
	.delete(remove)
	.put(update);

genreRouter.route("/genres/:id/movies")
	.post(setGenresMovies);

module.exports = genreRouter;
