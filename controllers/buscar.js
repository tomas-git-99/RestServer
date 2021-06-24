const { request, response } = require("express");

const collecionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscar = async(req=request, res=response) =>{

    const {coleccion, termino} = req.params;

    if (collecionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `las colleciones permitidas son : ${ collecionesPermitidas}`
        })
    }
    res.json({
        coleccion,
        termino
    })
}


module.exports = {
    buscar
}