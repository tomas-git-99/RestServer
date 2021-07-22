const { response, request } = require('express');
const bcryptjs  = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSingnin = async(req, res=response) => {

    const {id_token } = req.body;

    try {
    const {correo, nombre,img} = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if(!usuario){
        const data = {
            nombre,
            correo,
            password:':P',
            img,
            google:true

        };
        usuario = new Usuario(data);
        await usuario.save();
    }

    //si el usuario En db

    if (!usuario.estado){
        return res.status(401).json({
            msg:'hable con el administrador, usuario bloqueado'
        });
    }

    //generar token
    const token = await generarJWT ( usuario.id );

        res.json ({

            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            mdg:'Token de google no es valido'
        })
    }

}




module.exports = {
    login,
    googleSingnin
}