const { Router } = require('express');
const { check } = require('express-validator');


const { validarJWT, validarcampos, esAdminRole } = require('../middlewares');

const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria} = require('../controllers/categorias');

const { existeCategoriaPorId } = require('../helpers/db-validators');



const router = Router()

/* 
    {{url}}/api/categorias
 */

// Obtener todas las categorias --- publico
router.get('/', obtenerCategorias)


// Obtener una categoria por id --- publico
router.get('/:id', [
    check('id', 'No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarcampos,
], obtenerCategoria)


// Crear categoria -privado - cualquier persona con un token valido
router.post('/', 
    [validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarcampos,
    ],
    crearCategoria
)

// Actualizar por id - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarcampos
], actualizarCategoria)

// Borrar una categoria  - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarcampos
], borrarCategoria)



module.exports = router