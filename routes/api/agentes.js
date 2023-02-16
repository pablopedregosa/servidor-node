const express = require('express');
const router = express.Router();
const Agente = require('../../models/Agente');

//GET /api/agentes
//Devuelve una lista de agentes
router.get('/', async(req, res, next) => {
    try {
        //para lanzar una excepcion
        //throw new Error('Se ha roto');
        //filtros
        const name = req.query.name;
        const age = req.query.age;
        //paginacion
        const skip = req.query.skip;
        const limit = req.query.limit;

        const filtro = {};
        if (name) {
            filtro.name = name;
        }

        if (age) {
            filtro.age = age;
        }

        const agentes = await Agente.lista(filtro, skip, limit)
            //const agentes = await Agente.find();
        res.json({ results: agentes })
    } catch (error) {
        next(error);
    }
});

// GET /api/agentes/_id
// Devuelve un agente buscando por _id
router.get('/agente/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const agente = await Agente.findById(id);

        res.json({ results: agente })
    } catch (error) {
        next(error);
    }
});

// PUT /api/agentes/agente/id (body)
// Actualizar un agente
router.put('/agente/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const agenteActualizado = await Agente.findByIdAndUpdate(id, body, {
            new: true // esto devuelve el doc actualizado
        });

        res.json({ result: agenteActualizado });
    } catch (error) {
        next(error);
    }
})

// POST /api/agentes (body)
// crea un agente

router.post('/', async(req, res, next) => {
    try {
        const body = req.body;

        //creamos una instancia de Agente
        const agente = new Agente(body);

        //persistimos en la BD
        const agentePersistido = await agente.save();

        res.json({ result: agentePersistido });
    } catch (error) {
        next(error);
    }
});

// DELETE /api/agentes/agente/:id
//elimina un agente
router.delete('/agente/:id', async(req, res, next) => {
    try {
        const id = req.params.id;
        await Agente.deleteOne({ _id: id });
        res.json({ result: `Agente ${id} eliminado` });
    } catch (error) {
        next(error);
    }
});

module.exports = router;