const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignin } = require('../controllers/auth');
const { validarcampos } = require('../middlewares/validar-campos');


const router = Router()


router.post('/login', [
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarcampos,
    
], login);

router.post('/google', [
    check('id_token','El id_token es necesario').not().isEmpty(), 
    validarcampos,
    
], googleSignin);


module.exports = router;
