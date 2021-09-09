const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, existeCorreo, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarcampos } = require('../middlewares/validar-campos');


const { usuariosGet, 
        usuariosPut, 
        usuariosPost, 
        usuariosPatch, 
        usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet)

router.put('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRolValido ),
        validarcampos
], usuariosPut )

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser mas de 6 letras').isLength({ min:6 }),
        check('correo', 'El correo no es válido').isEmail(),
        check('correo').custom( existeCorreo ),
        // check('rol', 'No es un rol válido').isIn('ADMIN_ROLE','USER_ROLE'),
        check('rol').custom( esRolValido ),
        validarcampos
],usuariosPost)

router.patch('/', usuariosPatch)

router.delete('/:id', [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarcampos
], usuariosDelete)


module.exports= router

