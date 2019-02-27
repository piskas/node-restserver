// REQUIRE'S
require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');


// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Habilitar /Public
app.use(express.static(path.resolve(__dirname, "../public")));


// Configuracion Global de Rutas
app.use(require('./routes/index'));


// MONGOOSE - MongoDB
mongoose.connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useCreateIndex: true // por error de DEPRECATE de unique
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});


// LISTENER
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
});