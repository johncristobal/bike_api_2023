const { response, request } = require("express")

const validarToken = async (req = request, resp = response, next) => {

    const token = req.header('sos-token');
    if(!token){
        return resp.status(401).json({
            status: false,
            error: 'No hay token en la peticion'
        });
    }

    next();
}

module.exports = {
    validarToken
}