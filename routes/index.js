var express = require('express');
var router = express.Router();
const { query, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
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
})

module.exports = router;