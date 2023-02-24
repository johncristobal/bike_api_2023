const { Router } = require("express");
const { check } = require("express-validator");
const { loginGoogle, loginUsuario, registerUsuario } = require("../controller/auth");
const { validarCampos } = require('../middlewares/validar_campos');

const authRouter = Router();

authRouter.post('/login', [
    check('correo', 'Coloque correo válido').isEmail(),
    check('password','Contraseña obligatoria').not().isEmpty(),
    validarCampos
], loginUsuario)

authRouter.post('/register', [
    check('correo', 'Coloque correo válido').isEmail(),
    check('password','Contraseña obligatoria').not().isEmpty(),
    check('password','Contraseña minimo 8 caracteres').isLength({ min: 8 }),
    check('password','Contraseña debe contener una letra mayúscula').matches("[A-Z]"),
    check('name','El nombre es obligatrio').not().isEmpty(),
    validarCampos
], registerUsuario)

authRouter.post('/login/google', [
    check('correo', 'Correo obligatorio').isEmail(),
    check('name','El nombre es obligatrio').not().isEmpty(),
    validarCampos
], loginGoogle)

module.exports = authRouter
