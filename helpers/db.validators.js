const Role = require('../models/role');
const Usuario = require('../models/usuario');


//validacion de rol
const validacion = async (rol = '') => {
    const existe = await Role.findOne({ rol });

    if( !existe ){
        throw new Error (`el rol ${rol} no esta en la base de datos`)
    }
}


//validacion de correo
const emailValidate = async (correo = '') =>{

    
    const exiteEmail = await Usuario.findOne({ correo });
    if ( exiteEmail ){

        throw new Error (`el correo ${correo} ya esta registrado`)
}
}
const ExiteUSuarioPorID = async (id ) =>{

    
    const exiteUsuario = await Usuario.findById( id );
    if ( !exiteUsuario ){

        throw new Error (`el id no existe ${ id }`)
}
}



module.exports = {
    validacion,
    emailValidate,
    ExiteUSuarioPorID,
    

    
}