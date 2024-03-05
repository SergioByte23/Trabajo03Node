const catchError = require('../utils/catchError');
const Actors = require('../models/Actors');

const getAll = catchError(async(req, res) => {
    const actors = await Actors.findAll();
    return res.json(actors);
});

const create = catchError(async(req, res) => {
    const { first_name, last_name, nationality, image, birthday  } = req.body;
    const actors = await Actors.create({
        first_name: first_name,
        last_name: last_name,
        nationality: nationality,
        image: image,
        birthday:birthday,

    });
    return res.status(201).json(actors);
});

// /products/:id
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const actors = await Actors.findByPk(id);
    if (!actors) return res.status(404).json({ message: 'Actor no encontrado'});
    return res.json(actors);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Actors.destroy({ where: { id: id } });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { first_name, last_name, nationality,image, birthday  } = req.body;
    const actors = await Actors.update({
        first_name: first_name,
        last_name: last_name,
        nationality: nationality,
        image: image,
        birthday:birthday,
    }, { where: { id: id }, returning: true });
    return res.json(actors[1][0])
});



module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
  
}