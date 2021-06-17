const {Router} = require('express');
const { check, validationResult } = require('express-validator');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const { validacion, emailValidate, ExiteUSuarioPorID } = require('../helpers/db.validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const Role = require('../models/role');


const router = Router();


router.get('/', userGet);

router.put('/:id', [
    check('id', 'No ES un ID valido').isMongoId(),
    check('id').custom(ExiteUSuarioPorID),
    check('rol').custom( validacion ),
    validarCampos
], userPut);


//validacion de nombre, password, correo, rol antes de guardar a la base de datos

router.post('/',[ 
    check('nombre', 'el es obligatorio').not().isEmpty(),
    check('password', 'el password tiene que ser mayor a 6').isLength({min: 6}),
    check('correo').custom( emailValidate ),
    //check('rol', 'NO es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( validacion ),
    validarCampos

], userPost);

router.delete('/:id' , [
    validarJWT,
    check('id', 'No ES un ID valido').isMongoId(),
    check('id').custom(ExiteUSuarioPorID),
    validarCampos
], userDelete);


module.exports= router;
