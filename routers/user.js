const {Router} = require('express');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');


const router = Router();


router.get('/', userGet);

router.put('/', userPut);

router.post('/:id', userPost);

router.delete('/', userDelete);


module.exports= router;
