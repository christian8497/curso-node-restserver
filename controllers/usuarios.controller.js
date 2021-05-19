const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        //tomar total de usuarios
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
        .skip(Number(desde))
        .limit(Number(limite))

    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res = response) => {

    //aqui estaba el codigo que atrapa los errores

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //verificar si el correo existe


    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en BD
    await usuario.save();

    res.json({
        msg: 'POST API - controlador',
        usuario
    });
}

const usuariosPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;
    //console.log(req.body);

    //TODO validar contra BD
    if (password) {
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    //enviar datos a BD de acuerdo al id especifico
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    //mostrar la info en respuesta
    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'PATCH API - controlador',
    });
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    //eliminar un usuario fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    //eliminar de modo que se desactive estado
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    res.json(usuario);
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}