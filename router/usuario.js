const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');
const { validarUsuario } = require('../helpers/validar-usuario');
const bycript = require('bcryptjs');
const { validarJWT } = require('../middleware/validarJWT');
const { validationResult, check } = require('express-validator');
const { validarRolAdmin } = require('../middleware/validar-rol-administrador');

router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('rol', 'invalid.rol').isIn([ 'ADMIN', 'DOCENTE']),
    check('contrasena', 'invalid.contrasena').not().isEmpty(),
    check('estado', 'invalid.estado').isIn([ 'Activo', 'Inactivo']),
    validarJWT, validarRolAdmin
  ], async function(req, res){

    try {

        console.log(req.body);

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ mensaje: errors.array() });
        }

        const existeEmail = await Usuario.findOne({ email: req.body.email });
        if(existeEmail) {
            return res.status(400).json({ mensaje: 'Email existe' });
        }
    
        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.rol = req.body.rol;

        const salt = bycript.genSaltSync();
        const contrasena = bycript.hashSync(req.body.contrasena, salt);
        usuario.contrasena = contrasena;

        usuario.estado = req.body.estado;
        usuario.fechaCreacion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }
});

router.get('/', [ validarJWT, validarRolAdmin ], async function(req, res){
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);

    }catch(error) {
        console.log(error);
        res.send('Ocurrio un error')
    }

});

router.put('/:usuarioId', [ validarJWT, validarRolAdmin ], async function(req, res){
    try {
        console.log(req.body, req.params);

        let usuario = await Usuario.findById(req.params.usuarioId);

        if (!usuario) {
            return res.status(400).send('Usuario no existe');
        }

        const existeUsuario = await Usuario.findOne({ email: req.body.email, _id: { $ne: usuario._id } });
        if (existeUsuario) {
            return res.status(400).send(`Ya hay un usuario registrado con este email ${req.body.email}`);
        }
        
        usuario.email = req.body.email;
        usuario.nombre = req.body.nombre;
        usuario.estado = req.body.estado;
        usuario.rol = req.body.rol;
        usuario.contrasena = req.body.contrasena;
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error')
    }

});

router.get('/:usuario', [ validarJWT, validarRolAdmin ], async function(req, res) {
    try {
        const usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(404).send('usuario no existe');
        }
        res.send(usuario);
    } catch(error) {
        console.log(error);
        res.status(500).send('Ocurrió un error al modificar el usuario');
    }
});

module.exports = router;