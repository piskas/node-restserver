// REQUIRE'S
require('./config/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// BODY-PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Copnfiguracion Global de Rutas
app.use(require('./routes/index'));


// MONGOOSE - MongoDB
mongoose.connect(process.env.URL_DB, { useNewUrlParser: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});


// LISTENER
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto", process.env.PORT);
});