const { Router } = require('express');
const router = Router();
const movies = require('../samples.json');
const _r = require('underscore');

//listar
router.get('/', (req, res) => {
    res.json(movies);
});

//Crear
router.post('/', (req, res) => {
    const { name, year } = req.body;
    if (!(name && year)) {
        res.status(400);
        res.json({ err: 'parametros obligatorios no informados' });
    } else {
        const data = { "id": movies.length + 1, ...req.body }
        movies.push(data);
        res.json(data);
    }
});

//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, year } = req.body;
    if (!(id && name && year)) {
        res.status(400);
        res.json({ err: 'parametros obligatorios no informados' });
    } else {
        _r.each(movies, (value, i) => {
            if (value.id == id) {
                value.name = name;
                value.year = year;
//                res.json({ response: 'Update OK' });
            }
        });
        res.json({ response: 'no found id' });
    }
})

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let pos;
    _r.each(movies, (value, i) => {if (value.id == id) pos = i});

    if(typeof pos !== "undefined"){
        movies.splice(pos, 1);
        res.json({ response: 'Delete OK' });
    }else{
        res.json({error : 'no found'});
    }
});

module.exports = router;
