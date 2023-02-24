const Policy = require("../models/contratacion");

const existeTelefonoDB = async ( telefono ) => {
    const existe = await Policy.find({ telefono: telefono });
    if(existe.length == 0){
        throw Error("El telefono no existe en los registros");
    }
} 

module.exports = existeTelefonoDB;