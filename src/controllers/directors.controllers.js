const catchError = require('../utils/catchError');
const Directors = require('../models/Directors');

const getAll = catchError(async(req, res) => {
    const directors = await Directors.findAll();
    return res.json(directors);
});

const create = catchError(async(req, res) => {
    const { firstName, lastName, nationality,image, birthday  } = req.body;
    const directors = await Directors.create({
        firstName: firstName,
        lastName: lastName,
        nationality: nationality,
        image: image,
        birthday:birthday,

    });
    return res.status(201).json(directors);
});

// /products/:id
const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const directors = await Directors.findByPk(id);
    if (!directors) return res.status(404).json({ message: 'Director no encontrado'});
    return res.json(directors);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Directors.destroy({ where: { id: id } });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName, nationality,image, birthday  } = req.body;
    const directors = await Directors.update({
        firstName: firstName,
        lastName: lastName,
        nationality: nationality,
        image: image,
        birthday:birthday,
    }, { where: { id: id }, returning: true });
    return res.json(directors[1][0])
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}