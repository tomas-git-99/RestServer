const { response, request } = require('express');
const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { ValidarQuery } = require('../helpers/db.validators');


const userGet = async(req, res = response) => {

    const { limite = 5, desde = 0} = req.query;


    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
           .skip(Number(desde))
           .limit(Number(limite))
    ]);
    res.json(
            {
                total,
                usuarios
                
            }
        )
}

const userPost = async (req = request, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //verificar si el correo exite
    
    

    //incriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );


    //guardar en db

    await usuario.save();

    res.json(
        {
            usuario 
        }
    )
    
}

const userPut = async(req = request , res = response) => {

    const { id } = req.params;

    const {_id, password, google, correo, ...resto}  = req.body;

    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}

const userDelete = async(req, res = response) => {

    const { id }  = req.params;

    //borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    res.json( usuario )
}




module.exports= {
    userGet,
    userPost,
    userPut,
    userDelete
}