const { request, response } = require("express");
const  { ObjectId } = require ("mongoose").Types;

const { Categoria, Producto, Usuario } = require("../models");

const collecionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async (termino, res=response) => {

    const esMongoID = ObjectId.isValid( termino ); // true
 
    if ( esMongoID ){
        const usuario = await Usuario.findById(termino);

        if (usuario) {
            return res.json({
                results: (usuario) 
            })
        }else{
            return res.json({
                results: []
            })
        }

    }  

    const regex = new RegExp(termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{nombre:regex}, {correo:regex},{usuario:regex}],
        $and:[{estado:true}]
    });

     res.json({
           results:usuarios 
        })

}

const buscarCategorias = async (termino, res=response) => {

    const esMongoID = ObjectId.isValid( termino ); // true
 
    if ( esMongoID ){
        const usuario = await Categoria.findById(termino);

        if (usuario) {
            return res.json({
                results: (usuario) 
            })
        } else{
            return res.json({
                results: []
            })
        }

    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Categoria.find({
        
        $or: [{nombre:regex}],
        $and:[{estado:true}]
    });

     res.json({
           results:usuarios 
        })

}
const buscarProductos = async (termino, res=response) => {

    const esMongoID = ObjectId.isValid( termino ); // true
 
    if ( esMongoID ){
        const usuario = await Producto.findById(termino).populate('usuario', 'nombre ').populate('categoria', 'nombre');

        if (usuario) {
            return res.json({
                results: (usuario) 
            })
        } else{
            return res.json({
                results: []
            })
        }

    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Producto.find({
        
        $or: [{nombre:regex}, {descripcion:regex}],
        $and:[{estado:true}]
    }).populate('usuario', 'nombre ').populate('categoria', 'nombre');

     res.json({
           results:usuarios 
        })

}

const buscar = async(req=request, res=response) =>{

    const {coleccion, termino} = req.params;

    if ( !collecionesPermitidas.includes(coleccion) ) {
         return res.status(400).json({
            msg: `las colleciones permitidas son : ${ collecionesPermitidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            
            break;
        case 'categoria':

            buscarCategorias(termino, res)
            
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
        default:
                res.status(500).json({
                mdg:" se le olvido hacer esta busqueda"
            })
            
    }

       
//     res.json({
//      coleccion,
//      termino
//  })
}


module.exports = {
    buscar
}