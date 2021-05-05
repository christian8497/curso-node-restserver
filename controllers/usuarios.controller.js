const { response } = require('express');

const usuariosGet = (req = request, res = response) => {
    //const {query} = req.query; obtenemos todos los parametros o podemos desestructurar lo que deseamos
    const { q, nombre, apikey } = req.query;
    res.json({
        msg: 'GET API - controlador',
        q,
        nombre,
        apikey,
    });
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'PUT API - controlador',
        id
    });
}

const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        msg: 'POST API - controlador',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API - controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,

}