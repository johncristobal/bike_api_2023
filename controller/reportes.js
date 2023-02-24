const { response, request  } = require("express");
const { subirArchivoReporteRobo } = require('../helpers/subir_archivo');
const Reporte = require('../models/reporte');

const agregarReporteRobo = async (req = request, res = response) => {
    try{

        const { data } = req.body;
        const jsonD = JSON.parse(data);

        const reporte = new Reporte( jsonD );
        await reporte.save();

        jsonD.robery.photos.forEach( async ( e ) => {

            switch (e) {
                case "lateral":
                    await subirArchivoReporteRobo(req.files.lateral, reporte.id, "lateral");
                    break;
                case "sillin":
                    await subirArchivoReporteRobo(req.files.sillin, reporte.id, "sillin");
                    break;
                case "manubrio":
                    await subirArchivoReporteRobo(req.files.manubrio, reporte.id, "manubrio");
                    break;
                case "pedal":
                    await subirArchivoReporteRobo(req.files.pedal, reporte.id, "pedal");
                    break;
            
                default:
                    break;
            }        
        });
        
        return res.json({
            status: true,
            msg: 'reporte ok',
            error: ''
        });

    } catch (err){
        return res.status(500).json({
            msg: "reporte error contacte admin",
            status: false,
            error: err,
            //jsonD
        })
    }
}

const agregarReporte = async (req = request, res = response) => {

    try{
        const reporte = new Reporte(req.body);
        await reporte.save();
        
        return res.json({
            status: true,
            msg: 'reporte ok',
            error: ''
        });
    }catch(e){
        return res.status(500).json({
            status: false,
            msg: 'reporte error contacte admin',
            error: e.message
        })
    }
}

const obtenerReportes = async (req = request, res = response) => {

    try{
        const reportes = await Reporte.find();
        
        return res.json({
            status: true,
            msg: 'reporte ok',
            error: '',
            reportes
        });
    }catch(e){
        return res.status(500).json({
            status: false,
            msg: 'reporte error contacte admin',
            error: e.message
        })
    }
}

module.exports = {
    agregarReporteRobo,
    agregarReporte,
    obtenerReportes,
}
