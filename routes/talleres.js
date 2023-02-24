const { Router } = require("express");
const { response, request  } = require("express")
const readFile = require ("../helpers/talleres");
const { validarToken } = require ("../middlewares/validar_token");
const readDataTalleres = require ('../controller/talleres');

const routerTallers = Router();

routerTallers.post("/readFile", [
    readFile
], async (req = request, res = response) => {
    res.json({
        ok: true,
        msg: "talleres ok"
    })
});

routerTallers.get("/readFile", [
    validarToken
], readDataTalleres);

module.exports = routerTallers