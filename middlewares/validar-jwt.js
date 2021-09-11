const { response, request } = require("express");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  //Verificacion de token
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponda al uid
    const usuario = await Usuario.findById(uid);

    req.usuario = usuario
    
    // Validar que el usuario exista
    if ( !usuario ){
        return res.status(401).json({
            msg: 'Token no válido -  Usuario no existe en BD'
        })
    }

    // Verificar si el uid tiene estado true
    if ( !usuario.estado ){
        return res.status(401).json({
            msg: 'Token no válido - usuario con estado false'
        })
    }
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }

};

module.exports = {
  validarJWT,
};
