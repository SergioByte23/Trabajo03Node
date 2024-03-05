const express = require('express');
const router = express.Router();

const actorRouter=require('./actor.router')
const directorRouter=require('./director.router')
const genreRouter=require('./genre.router');
const routerMovie = require('./movie.router');
// colocar las rutas aquí
router.use(actorRouter);
router.use(directorRouter);
router.use(genreRouter);
router.use(routerMovie);

module.exports = router;