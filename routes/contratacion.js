const { Router } = require("express");
const { validarArchivoSubir, validarArchivoPDF } = require("../middlewares/validar_archivo");
const { postContracts, putContracts } = require("../controller/contratacion");

const router = Router();

router.post('/', [
    validarArchivoSubir,
], postContracts);

router.put('/',[
    validarArchivoSubir,
    validarArchivoPDF
], putContracts);

module.exports = router;
