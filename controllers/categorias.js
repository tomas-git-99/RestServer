const { response, request } = require("express");
const { Categoria, Producto } = require("../models");
const Usuario = require('../models/usuario');

// obtenercategorias -paginado - total - populate
const obtenercategorias = async ( req = request, res = response) =>{


    const { limite = 5, desde = 0} = req.query;
    const query = {estado:true}

    const [ total, usuarios ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario' )
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    
    res.json(
            {          
                total,      
                usuarios, 
                
           }
        )
} 

//obtenercategori - populate {}
const obtenerCategoria = async (req = request, res = response) =>{

    const { id } = req.params;

    const usuarios = await Categoria.findById(id).populate('usuario', 'nombre ');

    //const { usuario } = await Categoria.findById(id);


    res.json({
    
        usuarios,
        
        
    })
}

const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `la categori ${categoriaDB.nombre}, ya existe`
        })
    }
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.status(201).json(categoria);
}

// actualizarcategori

const actualizarCategoria =  async(req = request , res = response) =>{

    const { id } = req.params;
    const { estado, usuario, ...data} = req.body;

    data.nombre  = req.body.nombre.toUpperCase();
    data.usuario = req.usuario._id;
    
    const categoria = await Categoria.findByIdAndUpdate(id, data, {new:true});

    res.json(categoria)
} 

//borrarcategoria - estado:false
const borrarCategori = async (req = request , res = response) => {

    const { id } = req.params;
   

    const usuario = await Categoria.findByIdAndUpdate(id, {estado: false}, {new:true})

    res.json(usuario)
}
const eliminarProducto = async (req = request , res = response) => {

    const { id } = req.params;

    const cambiar = await Producto.findOneAndUpdate(id, {estado:false}, {new:true});

    res.json(cambiar)
}


module.exports = {
    crearCategoria,
    obtenercategorias,
    actualizarCategoria,
    borrarCategori,
    obtenerCategoria,
    eliminarProducto
}

