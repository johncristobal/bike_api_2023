const { response } = require("express")
const { validationResult } = require("express-validator")

const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        
        genericErrorResponse.response.msg = errors.array()[0]['msg'];
        return res.status(400).json(genericErrorResponse)
    }

    next();
}

module.exports = {validarCampos}