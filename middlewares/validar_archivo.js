const { request, response } = require("express")

const validarArchivoPDF = (req = request, res = response, next) => {
    if (
        !req.files
        || !req.files.poliza
    ){
        return res.status(400).json({
            status: false,
            error: 'Faltan subir el archivo de la póliza.'
        });
    }

    const extensionesValidas = ['pdf'];
    const { poliza } = req.files;

    const nombreCortado = poliza.name.split(".");
    const extension = nombreCortado[ nombreCortado.length - 1];
    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            status: false,
            error: 'El archivo de la póliza debe ser pdf.'
        });
    }

    next();
}

const validarArchivoSubir = (req = request, res = response, next) => {

    const token = req.header('sos-token');
    if(!token){
        return res.status(401).json({
            status: false,
            error: 'No hay token en la peticion'
        });
    }

    if (
        !req.files
        || Object.keys(req.files).length === 0 
        || !req.files.lateral
        || !req.files.pedal
        || !req.files.sillin
        || !req.files.manubrio
        || !req.files.pago
    ) {
        return res.status(400).json({
            status: false,
            error: 'Faltan archivos por subir.'
        });
    }

    const resp = validarExtension(req.files);

    if(!resp[0]){
        res.status(400).json({
            status: false,
            error: `El archivo no es una imagen con extensión valida: ${resp[1]}`,
        });
        return;
    }

    next();
}

const validarExtension = (files) => {

    const extensionesValidas = ['png','jpg','jpeg'];
    const { lateral, pedal, sillin, manubrio, pago } = files;

    const nombreCortado = lateral.name.split(".");
    const extension = nombreCortado[ nombreCortado.length - 1];
    if(!extensionesValidas.includes(extension)){
        return [false, "lateral"];
    }

    const nombreCortadoP = pedal.name.split(".");
    const extensionP = nombreCortadoP[ nombreCortadoP.length - 1];
    if(!extensionesValidas.includes(extensionP)){
        return [false, "pedal"];
    }
    
    const nombreCortadoS = sillin.name.split(".");
    const extensionS = nombreCortadoS[ nombreCortadoS.length - 1];
    if(!extensionesValidas.includes(extensionS)){
        return [false, "sillin"];
    }
    
    const nombreCortadoM = manubrio.name.split(".");
    const extensionM = nombreCortadoM[ nombreCortadoM.length - 1];
    if(!extensionesValidas.includes(extensionM)){
        return [false, "manubrio"];
    }

    const nombreCortadoPa = pago.name.split(".");
    const extensionPa = nombreCortadoPa[ nombreCortadoPa.length - 1];
    if(!extensionesValidas.includes(extensionPa)){
        return [false, "pago"];
    }

    return [true, ""];
}

module.exports = {
    validarExtension,
    validarArchivoSubir,
    validarArchivoPDF
}