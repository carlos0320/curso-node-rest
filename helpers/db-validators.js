const Rol = require('../models/role');
const { Usuario, Producto, Categoria } = require('../models');

const esRolValido = async (rol='') => {
    const existeRol = await Rol.findOne({ rol });
    if ( !existeRol ){
            throw new Error(`El rol: ${rol} no está registrado en la base de datos`)
    }
}

// Verificar si el correo existe
const existeCorreo = async ( correo= "" ) => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ya está registrado en la base de datos`)
    }
}

const existeUsuarioPorId = async( id = '') =>{

    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El id: ${id} no existe`)
    }
}

/*  Validadores personalizados sobre Categorias */

const existeCategoriaPorId = async( id ) => {

    // Verificar si el correo existe
    const existeCategoria = await Categoria.findById(id);
    if ( !existeCategoria ){
        throw new Error(`El id no existe ${id}`)
    }

}

/* Productos  */

const existeProductoPorId = async( id ) => {

    // Verificar si el correo existe
    const existeProducto = await Producto.findById(id);
    if ( !existeProducto ){
        throw new Error(`El id no existe ${id}`)
    }

}

const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion )
    if ( !incluida ){
        throw new Error(`La coleccion ${coleccion} no es permitida - ${colecciones}`)
    }

    return true

}

module.exports = {
    esRolValido, 
    existeCorreo,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}