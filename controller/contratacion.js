const { response, request  } = require("express");
const { sendMail } = require("../helpers/send_mail");
const { subirArchivo } = require("../helpers/subir_archivo");
const Policy = require("../models/contratacion");

const postContracts = async (req = request, res = response) => {
    
    try{

        const { data } = req.body;
        const jsonD = JSON.parse(data);

        const dmail = await sendMail(jsonD, req); // SEND MAIL
        console.log(dmail);

        // verifica si correo existe, anexamos nueva poliza a cliente
        //TODO: quiza actualizar datos de direccion...
        const existeEmail = await Policy.findOne({
            //telefono: jsonD.telefono 
            $or: [
                { telefono : jsonD.telefono },
                { correo : jsonD.telefono }
              ]
        });
        if(existeEmail) {
            await existeEmail.updateOne({
                $push: {
                    polizasInfo: {
                        folio: "",
                        fecha_contratacion: Date.now(),
                        fecha_vigencia: Date.now()
                    },
                }
            });

            return res.json({
                msg: "Usuario activo con nueva poliza.",
                status: true,
                error: "null",
            })
        }

        const policy = new Policy({
            cliente:{
                nombre: jsonD.nombreTitular,
                nacimiento: jsonD.fechaNacimiento,
                segundo: ""
            },
            polizasInfo: {
                folio: "",
                fecha_contratacion: Date.now(),
                fecha_vigencia: Date.now(),
            },
            correo: jsonD.correo,
            telefono: jsonD. telefono,
            fecha_update: Date.now(),
            direccion: {
                alcaldia: jsonD.alcaldia,
                calle: jsonD.calle,
                colonia: jsonD.colonia,
                cp: jsonD.cp
            }
        });

        await policy.save();

        res.json({
            msg: "Usuario creado nueva póliza.",
            status: true,
            error: "null",
            //policy
        })
    } catch (err){
        return res.status(500).json({
            msg: "post Contrataciones...",
            status: false,
            error: err,
            //jsonD
        })
    }
}

const putContracts = async (req = request, res = response) => {

    try{
        const { telefono, folio } = req.body;
        const exists = await Policy.findOne({ telefono: telefono });

        if(exists == null){ //si no existe, error
            return res.status(400).json({
                msg: "put Contrataciones...",
                status: false,
                error: "No cuenta con datos, te invitamos a contratar pólizas",
            })
        }
            
        const { id, polizasInfo } = exists;

        const polizasNotActive = polizasInfo.filter( (p) => !p.isActive );   //busco polizas que no esten activas

        if(polizasNotActive.length == 0){   // no polizas, todo polizas activas
            return res.status(400).json({
                msg: "put Contrataciones...",
                status: false,
                error: "Todas tus polizas estan activas, contacta al administrador.",
            });
        }

        polizasInfo.sort((a, b) => { //actualizo poliza 0
            return a.fecha_contratacion.getTime() - b.fecha_contratacion.getTime();
        });

        let i = 0;
        for(let p of polizasInfo) {
            if(p.isActive === false){
                polizasInfo[i].folio = folio;
                polizasInfo[i].isActive = true;
                break;
            }
            i += 1;
        }

        //subir archivos server
        await subirArchivo(req.files.lateral, folio, "lateral");
        await subirArchivo(req.files.manubrio, folio, "manubrio");
        await subirArchivo(req.files.sillin, folio, "sillin");
        await subirArchivo(req.files.pedal, folio, "pedal");
        await subirArchivo(req.files.poliza, folio, "poliza");
        await subirArchivo(req.files.pago, folio, "pago");

        //TODO: checar si debemos actualizat datos cliente...
        const update = await Policy.findByIdAndUpdate( id, {polizasInfo: polizasInfo}, {new: true} );   //update base datos

        return res.json({
            msg: "Usuario actualizado con póliza.",
            status: true,
            error: "",
            update
        })
    } catch(err){
        return res.status(500).json({
            msg: "put Contrataciones...",
            status: false,
            error: err,
        })
    }
}

module.exports = {
    postContracts,
    putContracts
}