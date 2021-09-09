const Rol = require('../models/role');
const Usuario = require('../models/usuario');

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


module.exports = {
    esRolValido, 
    existeCorreo,
    existeUsuarioPorId
}