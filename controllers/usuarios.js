const { response } = require('express')

const usuariosGet = ( req,res= response )=>{
    res.json({
        msg: 'get API - controller'
    })
}

const usuariosPost =  ( req,res )=>{
   
    const body = req.body;
    res.status(201).json({
        body
    })
}

const usuariosPut = ( req,res )=>{

    const id = req.params.id

    res.json({
        msg:'put API - controller'
    })
}

const usuariosPatch = ( req,res )=>{
    res.json({
        msg:'patch API - controller'
    })
}

const usuariosDelete =  ( req,res )=>{
    res.json({
        msg:'delete API - controller'
    })
}


module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}