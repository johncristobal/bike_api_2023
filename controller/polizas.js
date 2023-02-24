const { response, request  } = require("express");
const Policy = require("../models/contratacion");

const getContracts = async (req = request, res = response) => {

    try{
        const { telefono } = req.params;

        const [ polizas ] = await Policy.find({ telefono: telefono });
    
        if(polizas.polizasInfo.length == 0){
            return res.json({
                msg: "get Contrataciones...",
                status: false,
                error: "No tienes pólizas en tu información, contacta al administrador."
            })
        }

        let flag = false;
        for(let p of polizas.polizasInfo) {
            if(p.isActive){
                flag = true;
                break;
            }
        }

        if(!flag){
            return res.json({
                msg: "get Contrataciones...",
                status: false,
                error: "No tienes pólizas activas, si el proceso sigue durante 24 horas, contacta al administador."
            })
        }

        return res.json({
            msg: "get Contrataciones...",
            status:true,
            polizas: polizas
        });

    }catch(err){
        return res.json({
            msg: "get Contrataciones...",
            status: false,
            error: err
        })
    }
}

const getContractsLogin = async (req = request, res = response) => {

    let errorResponse = {
        msg: "get Contrataciones login...",
        status: false,
        error: ""
    };

    try{
        const { phone, pass } = req.body;
        const [ polizas ] = await Policy.find({ telefono: phone });
    
        if(!polizas){
            errorResponse.error = "El teléfono no existe en los registros"
            return res.status(400).json(errorResponse);
        }

        if(polizas.polizasInfo.length == 0){
            errorResponse.error = "No tienes pólizas en tu información, contacta al administrador.";
            return res.status(400).json(errorResponse);
        }

        let flag = false;   //Check polizas activas
        for(let p of polizas.polizasInfo) {
            if(p.isActive){
                flag = true;
                break;
            }
        }

        if(!flag){
            errorResponse.error = "No tienes pólizas activas, si el proceso sigue durante 24 horas, contacta al administador.";
            return res.status(400).json(errorResponse);
        }

        flag = false;   //Check pass and folio match
        for(let p of polizas.polizasInfo) {
            if(p.folio == pass){
                flag = true;
                break;
            }
        }

        if(!flag){
            errorResponse.error = "Contraseña incorrecta. Verifica que el número de folio este escrito como esta en la póliza.";
            return res.status(400).json(errorResponse);
        }

        return res.json({
            msg: "get Contrataciones...",
            status:true,
            polizas: polizas
        });

    }catch(err){
        return res.json({
            msg: "get Contrataciones...",
            status: false,
            error: err
        })
    }
}

module.exports = {
    getContracts,
    getContractsLogin
}