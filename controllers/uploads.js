
const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { subirArchivo } = require('../helpers/subir-archivo');
const {Usuario, Producto} = require('../models');
require('dotenv').config();
const cloudinary = require('cloudinary').v2; 
const { env } = require('process');

/* cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
}); */

cloudinary.config(process.env.CLOUDINARY_URL)


const cargarArchivo = async(req, res = response) => {




    try {
        
        const nombre = await subirArchivo(req.files, undefined,'texto' )
        res.json({
            nombre
        })
    
    } catch (msg) {
        res.status(400).json({msg})
    }

}
/* const actualizarImagen = async (req, res=response) =>{

    const {id, coleccion} = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json(`No existe un usuario con el id ${id}`)
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json(`No existe un producto con el id ${id}`)
            }
            
                break;
    
        default:
            break;
    }

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen)
        }
    }

    const nombre = await subirArchivo(req.files, undefined,coleccion )

    modelo.img = nombre;

    await modelo.save();

    res.json(modelo)
} */

const actualizarImagenCloudinary = async (req, res=response) =>{

    const {id, coleccion} = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json(`No existe un usuario con el id ${id}`)
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json(`No existe un producto con el id ${id}`)
            }
            
                break;
    
        default:
            break;
    }

    if (modelo.img) {
        const nombreArr  = modelo.img.split('/');

        const nombre = nombreArr[nombreArr.length -1];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id)    
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath )

    modelo.img = secure_url

    await modelo.save();

    res.json(modelo)
}

const mostrarImagen = async(req, res=response) => {
    const {id, coleccion} = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json(`No existe un usuario con el id ${id}`)
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json(`No existe un producto con el id ${id}`)
            }
            
                break;
    
        default:
            break;
    }

    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
        if(fs.existsSync(pathImagen)){
           res.sendFile(pathImagen);
        }
    }else{
        const pathNOimagen = path.join(__dirname,'../assets/14.1 no-image.jpg.jpg')
        res.sendFile(pathNOimagen)
    }

}

module.exports = {
    cargarArchivo,
    mostrarImagen,
    actualizarImagenCloudinary
}