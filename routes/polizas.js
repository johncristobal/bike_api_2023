const { Router } = require("express");
const { check } = require("express-validator");
const { getContracts, getContractsLogin } = require('../controller/polizas');
const existeTelefonoDB = require('../helpers/db_validar');
const { validarCampos } = require('../middlewares/validar_campos');
const { validarToken } = require('../middlewares/validar_token');

const routerPolzias = Router();

routerPolzias.get('/:telefono', [
    validarToken,
    check('telefono').custom( existeTelefonoDB ), 
    validarCampos,
], getContracts);

routerPolzias.post('/login', [
    validarToken,
], getContractsLogin);


module.exports = routerPolzias;
