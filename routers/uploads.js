const {Router} = require('express');

const { check, validationResult } = require('express-validator');
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { collecionesPermitidas } = require('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarImagen } = require('../middlewares/validar-img');



const router = Router();


router.post('/', [validarImagen],cargarArchivo);
router.put('/:coleccion/:id',[
    validarImagen,
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => collecionesPermitidas (c, ['usuarios','productos'])),
    validarCampos,
], actualizarImagenCloudinary)

router.get('/:coleccion/:id', [
    check('id', 'El id debe de ser de mongo').isMongoId(),
    check('coleccion').custom( c => collecionesPermitidas (c, ['usuarios','productos'])),
    validarCampos,
], mostrarImagen)


module.exports = router;