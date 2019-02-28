const express = require('express');
const fs = require('fs');
const path = require('path');
const { verificaToken }  = require('../middlewares/autenticacion');
let app = express();

app.get('/imagen/:tipo/:img', verificaToken, (req, res) => {
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname, `../../uploads/${tipo}/${img}`);
    let pathNoImg = path.resolve(__dirname, '../assets/no-image.jpg');

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        res.sendFile(pathNoImg);
    }


});

module.exports = app;