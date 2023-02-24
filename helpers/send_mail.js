//const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const path = require('path')

//const sendMail = (jsonD = any, req = any) => {
const sendMail = (email, tokenSecure, templateMail) => {

    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'smtp',
            host: process.env.HOST_MAIL,
            port: process.env.PORT_MAIL,
            secure: true,
            requireTLS: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL
            }
        });

        var htmlData = `
        <h3>Hola buen dia</h3>
        <h4>Quisiera llevar a cabo la contratación de la asistencia para ciclista</h4>
        <hr>
        Estos son mis datos:
        <br>

        <p>
            <strong>Ejecutivo: </strong>SOS Ciclista <br>
            <strong>Fecha contratacion: </strong>${Date()}<br><br>

            <strong>Nombre: </strong>${jsonD.nombreTitular}<br>
            <strong>Segundo titular: </strong>${jsonD.nombreTitular} <br>
            <strong>Fecha nacimiento: </strong>${jsonD.fechaNacimiento}<br>
            <strong>Calle y numero: </strong>${jsonD.direccion}<br>
            <strong>Colonia: </strong>${jsonD.colonia} <br>
            <strong>C.P.: </strong>${jsonD.cp} <br>
            <strong>Alcaldia / municipio: </strong>${jsonD.alcaldia} <br>
            <strong>Correo: </strong>${jsonD.correo}<br>
            <strong>Telefono: </strong>${jsonD.telefono} <br>
        </p>
        <br>
        Gracias.
        `;
        var mailOptions = {
            from: 'contratacion@sosciclista.com.mx',
            to: [process.env.MAIL_GTT_A,process.env.MAIL_GTT_B],
            cc: 'cristobaljohn00@gmail.com',
            subject: 'Contratacion SOS Ciclista - Asistencia Ciclista',
            html: htmlData,
            attachments: [
                {
                    filename: 'bici_lateral.png',
                    path: req.files.lateral.tempFilePath, //path.join( __dirname , '../uploads/imgs/bici_frontal.png' ),
                    cid: 'bici_lateral.png' //same cid value as in the html img src
                },
                {
                    filename: 'bici_sillin.png',
                    path: req.files.sillin.tempFilePath, //path.join( __dirname , '../uploads/imgs/bici_derecha.png' ),
                    cid: 'bici_sillin.png' //same cid value as in the html img src
                },
                {
                    filename: 'bici_manubrio.png',
                    path: req.files.manubrio.tempFilePath, //path.join( __dirname , '../uploads/imgs/bici_izquierda.png' ),
                    cid: 'bici_manubrio.png' //same cid value as in the html img src
                },
                {
                    filename: 'bici_pedal.png',
                    path: req.files.pedal.tempFilePath, //path.join( __dirname , '../uploads/imgs/bici_trasera.png' ),
                    cid: 'bici_pedal.png' //same cid value as in the html img src
                },
                {
                    filename: 'comprobante_pago.png',
                    path: req.files.pago.tempFilePath, //path.join( __dirname , '../uploads/imgs/comprobante_pago.png' ),
                    cid: 'comprobante_pago.png' //same cid value as in the html img src
                },
            ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {            
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}

module.exports = {
    sendMail
}