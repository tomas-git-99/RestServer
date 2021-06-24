const {Router} = require('express');
const { login, googleSingnin } = require('../controllers/auth');
const { check, validationResult } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();



router.post('/login', [
    check('correo', 'El correo es invalido perrin').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'el id_toekn es necesario').not().isEmpty(),
    validarCampos
], googleSingnin);





module.exports = router;