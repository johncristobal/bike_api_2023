const { response, request  } = require("express");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar_jwt");
const Usuario = require('../models/usuario');

const loginUsuario = async (req = request, res = response) => {

    let errorResponse = {
        msg: "auth error",
        status: false,
        error: ""
    };

    const { correo, password, token_mobile } = req.body;
    try{
        const user = await Usuario.findOne({ email: correo });
        if(!user){
            errorResponse.error = 'El correo no existe';
            return res.status(400).json(errorResponse);
        }

        if(!user.activo){
            errorResponse.error = "El usuario no esta activo";
            return res.status(400).json(errorResponse);
        }

        const bcryptPass = bcryptjs.compareSync(password, user.password);
        if(!bcryptPass){
            errorResponse.error = "La contraseña es incorrecta";
            return res.status(400).json(errorResponse);
        }

        await Usuario.findByIdAndUpdate( user.id, {token_mobile} );

        const token = await generarJWT( user.id );
        const { email, nombre, id } = user;

        return res.json({
            user: {
                email, nombre, id
            },
            token
        })

    }catch(err){
        return res.status(500).json({
            status: false,
            error: err,
        });
    }
}

const registerUsuario = async (req = request, res = response) => {

    const { correo, password, name, token_mobile } = req.body;

    let errorResponse = {
        msg: "auth register error",
        status: false,
        error: ""
    };
    
    try{
        const userExists = await Usuario.findOne({ email: correo });
        if(userExists){
            errorResponse.error = 'El correo ya existe';
            return res.status(400).json(errorResponse);
        }

        let user = new Usuario({
            nombre: name,
            email: correo,
            password,
            token_mobile
        });

        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        await user.save();

        const token = await generarJWT( user.id );
        const { email, nombre, id} = user;
        return res.json({
            user: {
                email, nombre, id
            },
            token
        });

    }catch(err){
        console.log(err);
        return res.status(500).json({
            status: false,
            error: err,
        });
    }
}

const loginGoogle = async (req = request, res = response) => {

    const { correo, name, token_mobile } = req.body;

    let errorResponse = {
        msg: "auth register error",
        status: false,
        error: ""
    };

    try{
        const userExists = await Usuario.findOne({ email: correo });
        if(userExists){
            errorResponse.error = 'El correo ya existe';
            return res.status(400).json(errorResponse);
        }

        let user = new Usuario({
            nombre: name,
            email: correo,
            password: ":P",
            google_login: true,
            token_mobile
        });

        await user.save();

        const token = await generarJWT( user.id );
        const { email, nombre, id } = user;
        return res.json({
            user: {
                email, nombre, id
            },
            token
        });

    }catch(err){
        return res.status(500).json({
            status: false,
            error: err,
        });
    }    
}

module.exports = {
    loginGoogle,
    loginUsuario,
    registerUsuario
}