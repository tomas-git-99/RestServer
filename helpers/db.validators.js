const { Categoria, Producto } = require('../models');
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
//validar id
const ExiteUSuarioPorID = async ( id ) => {

    
    const exiteUsuario = await Usuario.findById( id );

    if ( !exiteUsuario ){

        throw new Error (`el id no existe ${ id }`)
}
}

//validar categoria con el id
const existeCategoria = async ( id ) => {

    const existeCategoria = await Categoria.findById(id);

    if ( !existeCategoria ){
        throw new Error(`el id no existe ${ id }`);
    }
}

const existeProducto = async ( id ) => {

    const existePRODUCTO = await Producto.findById(id);

    if ( !existePRODUCTO ){
        throw new Error(`el id no existe ${ id }`);
    }
}
const collecionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if (!incluida){
        throw new Error (`la coleccion ${coleccion} no es permitida, ${colecciones}`)
    }
    return true;
}


module.exports = {
    validacion,
    emailValidate,
    ExiteUSuarioPorID,
    existeCategoria,
    existeProducto,
    collecionesPermitidas
    

    
}