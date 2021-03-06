
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');



const validarJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        


        // leer el usuario que corresponde al uid
        
        const usuario = await Usuario.findById( uid );

        if (!usuario){
            return res.status(401).json({
                msg:'token no valido - usuario no existe DB'
            })
        }

        // verificar si el uid tiene estado esta en true

        if ( !usuario.estado ){
            return res.status(401).json({
                msg:'token no valido - estado false'
            })
        }
        req.usuario = usuario;

        next();

    } catch (error) {

        return res.status(401).json({
            msg:'bro ese token no es el correcto'
        })
        
    }


}


module.exports = {
    validarJWT
}