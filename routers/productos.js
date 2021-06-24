const {Router, request, response} = require('express');
const { check } = require('express-validator');
const { eliminarProducto } = require('../controllers/categorias');
const { crearProducto, obtenerProducto, actualizarProducto } = require('../controllers/productos');
const { existeCategoria, existeProducto } = require('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRole } = require('../middlewares/validar-rol');




const router = Router();


//mostrar
router.get('/', obtenerProducto);

//crear
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('categoria', 'no es un id de mongo').isMongoId(),
    check('categoria').custom( existeCategoria),
    validarCampos,
],crearProducto);

//actualizar
router.put('/:id',[
    validarJWT,
    check('id').custom(existeProducto),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    validarCampos,
] ,actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No ES un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos,
], eliminarProducto);


module.exports = router;