var express = require('express');
var router = express.Router();
const { query, validationResult } = require('express-validator');
const Agente = require('../models/Agente');

/* GET home page. */
router.get('/', async function(req, res, next) {
    try {

        const agentes = await Agente.find();
        res.locals.agentes = agentes;
        res.locals.title = 'Express';
        console.log(agentes);

        res.render('index');
    } catch (err) {
        next(err);
    }
});

router.get('/pablo', (req, res, next) => {
    res.send("Insertar frasecilla");
})

router.get('/pruebaview', (req, res, next) => {
    res.locals.nombre = "MJ SEAL";
    res.render("pruebaview", { title: "MJ POWER" });
})

//GET /parametro_query_string?talla=35&color=rojo
router.get('/parametro_query_string', [ //validaciones
        query('talla').isNumeric().withMessage('debe ser numérico'),
        query('color').custom(valor => {
            return valor === 'rojo'
        }).withMessage('debe ser rojo')
    ],
    (req, res, next) => {
        validationResult(req).throw();
        const talla = req.query.talla;
        const color = req.query.color;
        res.send(`Me has pedido talla ${talla} y color ${color}`);
    })

//POST
router.post('/enelbody', (req, res, next) => {
    const altura = req.body.altura;
    const peso = req.body.peso;
    res.send(`Recibida con altura ${altura} y peso ${peso}`)
});

module.exports = router;