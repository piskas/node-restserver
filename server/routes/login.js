// REQUIRE'S
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Models
const Usuario = require('../models/usuario');


// Servicios
app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '[Usuario] o contraseña incorrectos'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o [contraseña] incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.KEY, { expiresIn: process.env.EXPIRES_IN })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});

app.post('/google', async(req, res) => {
    let token = req.body.idtoken;

    let googleUser = await verify(token)
        .catch(err => {
            return res.status(403).json({
                ok: false,
                err
            });
        });

    Usuario.findOne({ email: googleUser.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (usuarioDB) {
            // Usuario ya existe
            if (!usuarioDB.google) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Debe usar su autenticación normal'
                    }
                });
            } else {
                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.KEY, { expiresIn: process.env.EXPIRES_IN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            }
        } else {
            // Si el usuario no existe en la BD
            let usuario = new Usuario();

            usuario.nombre = googleUser.nombre;
            usuario.email = googleUser.email;
            usuario.img = googleUser.img;
            usuario.google = true;
            usuario.password = '.';

            usuario.save((err, usuarioDB) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let token = jwt.sign({
                    usuario: usuarioDB
                }, process.env.KEY, { expiresIn: process.env.EXPIRES_IN });

                return res.json({
                    ok: true,
                    usuario: usuarioDB,
                    token
                })
            });
        }
    });
});

async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    }
}

// Exportar Servicios
module.exports = app;