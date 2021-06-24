const { request, response } = require("express");
const { Producto, Categoria } = require("../models");

const obtenerProducto = async(req=request, res=response) => {

    const { limite = 5, desde = 0} = req.query;
    const query = {estado:true}

    const [ total, usuarios ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('categoria', 'nombre').populate('usuario', 'nombre correo')
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

const crearProducto = async(req=request, res=response) => {

    const { estado, usuario, ...body } = req.body;

    const ProductoDB = await Producto.findOne({nombre:req.body.nombre});

    if (ProductoDB){
        return res.status(400).json({
            mdg: `el producto ${ProductoDB.nombre}, ya existe`
        })
    }

    const data = {
        
        ...body,
        nombre:req.body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    await producto.save();

    res.status(200).json(producto);

}
const actualizarProducto = async(req=request, res=response) => {

    const { id } = req.params;

    const {estado, usuario, ...todo} = req.body;

    const datos = await Producto.findByIdAndUpdate(id, todo, { new:true});

    res.json(datos)

}

module.exports={
    crearProducto,
    obtenerProducto,
    actualizarProducto
}