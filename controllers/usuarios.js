const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");


const usuariosGet = async (req, res = response) => {

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true }  

  const [ total, usuarios ] = await Promise.all([
    Usuario.countDocuments( query ),
    Usuario.find( query )
    .skip( Number(desde) )
    .limit(Number(limite))
  ])

  res.json({
    total,
    usuarios
  });
};

const usuariosPost = async (req, res) => {

  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  

  //Encriptar la contraseña
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  //Guardar en BD

  await usuario.save();

  res.status(201).json({
    msg: "Post API ",
    usuario,
  });
};

const usuariosPut = async (req, res) => {

  const { id } = req.params;
  const { _id,password, google, correo, ...resto } = req.body;

  // TODO: validar contra base de datos
  if( password ){
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync( password, salt )
  }

  const usuario = await Usuario.findByIdAndUpdate( id, resto )

  res.json(usuario);
};

const usuariosPatch = (req, res) => {
  res.json({
    msg: "patch API - controller",
  });
};

const usuariosDelete = async (req, res) => {

  
  const { id } = req.params;  

  // fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id )

  // Recomendado
  const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })

  // const usuarioAutenticado = req.usuario;
  console.log( usuario )
  res.json( usuario );

};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
