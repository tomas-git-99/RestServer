const { response, request } = require('express');
const bcryptjs  = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
require('dotenv').config();


const login = async (req = request, res = response) => {

    const {correo, password} = req.body;


    try {

        //verificar el email
        const usuario = await Usuario.findOne({ correo })
        if ( !usuario ) {
            return res.status(400).json ({
                msg:'Usuario / Password no son correctos - correo'
            })
        }


        //verifica el estado el usuario (si esta en la base de datos o no)
        if ( !usuario.estado ) {
            return res.status(400).json ({
                msg:'Usuario / Password no son correctos - esatodo:false'
            })
        }



        //verificar el password
        const validPassword = bcryptjs.compareSync( password, usuario.password)
        if (!validPassword) {
            return res.status(400).json ( {
                mdg:'Usuario / Password no son correctos - password'
            });
        }

        //generar el JWT
        const token = await generarJWT ( usuario.id );


        res.json({
            msg:'todo okiiiii',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json ( {
            msg:"Hable con el administrador"
        })
    }

}





module.exports = {
    login
}