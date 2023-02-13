var express = require('express');
var router = express.Router();

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
router.get('/parametro_query_string', (req, res, next) => {
    const talla = req.query.talla;
    const color = req.query.color;

    res.send(`Me has pedido talla ${talla} y color ${color}`);
})

module.exports = router;