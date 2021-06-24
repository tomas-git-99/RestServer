const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenercategorias, actualizarCategoria, borrarCategori, obtenerCategoria } = require('../controllers/categorias');
const { existeCategoria, ExiteUSuarioPorID } = require('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-rol');



const router = Router();


router.get ('/', obtenercategorias);

//obtener una categoria por id -publico
router.get ('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos,
] , obtenerCategoria); 

// crear categoria -privada - cualquier persona con un token valido
router.post ('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos, ], crearCategoria );

//actualizar  -privado - cualquiera con token valido

router.put ('/:id',[
    validarJWT,
    check('id').custom(existeCategoria),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos,
], actualizarCategoria);

//borrar categoria - solo admin
router.delete ('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No ES un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
] ,borrarCategori);







module.exports = router;