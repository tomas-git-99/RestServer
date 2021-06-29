const { response, request } = require("express");


const validarImagen = async(req = request, res=response, next) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'no hay archivo que subir'});
      }

      next();
}


module.exports = {
    validarImagen
}