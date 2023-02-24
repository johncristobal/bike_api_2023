const path = require('path');
const fs = require('fs');

const subirArchivo = (file, carpeta = '', name = "") => {

    return new Promise((resolve, reject) => {

        const nombreCortado = file.name.split(".");
        const extension = nombreCortado[ nombreCortado.length - 1];
        const temp = name + "." + extension;
        const uploadPath = path.join( __dirname , '../polizas/' ,carpeta, temp );
        
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(temp);
        });
    });
}

const subirArchivoReporteRobo = (file, carpeta = '', name = "") => {

    return new Promise((resolve, reject) => {

        const nombreCortado = file.name.split(".");
        const extension = nombreCortado[ nombreCortado.length - 1];
        const temp = name + "." + extension;
        const uploadPath = path.join( __dirname , '../reportes/' ,carpeta, temp );
        
        file.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(temp);
        });
    });
}

module.exports = {
    subirArchivo,
    subirArchivoReporteRobo
}