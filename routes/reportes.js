const { Router } = require("express");
const { check } = require("express-validator");
const { agregarReporte, agregarReporteRobo, obtenerReportes } = require ('../controller/reportes');
const { validarCampos } = require ('../middlewares/validar_campos');

const routerReportes = Router();

routerReportes.get('/',[],obtenerReportes)

routerReportes.post('/agregar',[
    check('iduser',"No es un usuario valido").isMongoId(),
    check('type_report',"No hay tipo de reporte").not().isEmpty(),
    check('latitude',"No hay latitud").not().isEmpty(),
    check('latitude',"No hay latitud").not().isEmpty(),
    check('description',"No hay descripción").not().isEmpty(),
    validarCampos
], agregarReporte)

routerReportes.post('/robo',[
], agregarReporteRobo)

module.exports = routerReportes
