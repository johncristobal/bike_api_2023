const { response } = require("express")
const { validationResult } = require("express-validator")

const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        
        let errorResponse = {
            msg: "Error interno, intente más tarde...",
            status: false,
            error: ""
        };
        errorResponse.error = errors.array()[0]['msg'];
        return res.status(400).json(errorResponse)
    }

    next();
}

module.exports = {validarCampos}