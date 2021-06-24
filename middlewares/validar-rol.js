const { response, request } = require("express")





const esAdminRole = (req, res = response, next) => {

    if ( !req.usuario ){
        return res.status(500).json({
            msg:"se quieren verificar el role sin validar el token primero"
        })
    }

    const { rol, nombre } = req.usuario;

    if( rol !== 'ADMIN_ROLE' ){
        return res.status(400).json({
            msg:`${ nombre } no es administrador - no puede hacer esto`
        })
    }

    next();
}




module.exports ={
    esAdminRole
}