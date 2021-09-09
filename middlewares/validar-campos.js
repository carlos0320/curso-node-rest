const {validationResult} = require('express-validator')


const validarcampos = ( req, res, next) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors)
    }

    // if all is well, then call the next middleware
    next();
}


module.exports = {
    validarcampos
}