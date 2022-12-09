const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validarEstadoEquipo } = require('../helpers/validar-estadoEquipo');
const { validarJWT } = require('../middleware/validarJWT');
const { validarRolAdmin } = require('../middleware/validar-rol-administrador');

const router = Router();

router.get('/', [ validarJWT, validarRolAdmin ], async function(req, res) {
    try {
        const estado = await EstadoEquipo.find();
        res.send(estado);
    }catch(error) {
        console.log(estado);
        res.status(500).send('Ocurrió un error');
    }
});

router.post('/', [ validarJWT, validarRolAdmin ], async function(req, res) {
    try {
        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0) {
            return res.status(400).send(validaciones);
        }

        let estado = new EstadoEquipo();
        estado.nombre = req.body.nombre;
        estado.estado = req.body.estado,
        estado.fechaCreacion = new Date();
        estado.fechaActualizacion = new Date();
        estado = await estado.save();
        res.send(estado);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:estadoId', [ validarJWT, validarRolAdmin ], async function(req, res) {
    try {
        let estado = await EstadoEquipo.findById(req.params.estadoId);
        if (!estado) {
            return res.status(400).send('Estado no existe');
        }
        estado.nombre = req.body.nombre;
        estado.estado = req.body.estado,
        estado.fechaActualizacion = new Date();
        estado = await estado.save();
        res.send(estado);

    }catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.get('/:estadoId', async function(req, res) {
    try {
        const estado = await estado.findById(req.params.estadoId);
        if (!estado) {
            return res.status(404).send('Inventario no existe');
        }
        res.send(estado);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al modificar estados');
    }
});

module.exports = router;