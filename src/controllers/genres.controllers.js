const catchError = require('../utils/catchError');
const Genres = require('../models/Genres');

const getAll = catchError(async(req, res) => {
    const genres = await Genres.findAll();
    return res.json(genres);
});

const create = catchError(async(req, res) => {
    const { name } = req.body;
    const genres = await Genres.create({
        name: name,      
    });
    return res.status(201).json(genres);
});

// /genres/:id
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const genres = await Genres.findByPk(id);
    if (!genres) return res.status(404).json({ message: 'Genero no encontrado'});
    return res.json(genres);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Genres.destroy({ where: { id: id } });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { name  } = req.body;
    const genres = await Genres.update({
        name: name
        
    }, { where: { id: id }, returning: true });
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(genres[1][0])
});


const setGenresMovies =catchError(async(req, res) => {
    const { id } = req.params;
    const genre= await Genres.findByPk(id);
    await genre.setGenres(req.body);
    const movies= await genre.getMovies();
    return res.json(movies);

});


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenresMovies,   
}