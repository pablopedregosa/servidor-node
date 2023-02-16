const mongoose = require("mongoose");

// definir el esquema de los agentes
const agenteSchema = mongoose.Schema({
    name: String,
    age: { type: Number, min: 18, max: 90 }
    //documento: mongoose.Schema.Types.Mixed
}, {
    //collection: 'agentes'
});

//tipos de metodos:
// -Agente.createWithColor('red') --> metodo estatico
// - agente.sendMail({subject: asd}) --> metodo de instancia (no usar arrow functions)

agenteSchema.statics.lista = function(filtro, skip, limit) {
    const query = Agente.find(filtro);
    query.skip(skip);
    query.limit(limit);
    //..
    return query.exec();
}


// crear el modelo de agente
const Agente = mongoose.model('Agente', agenteSchema);

// exportar el modelo
module.exports = Agente;