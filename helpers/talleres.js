const { response, request  } = require("express");
const Taller = require("../models/talleres");

const readFile = async (req = request, res = response, next) => {

    var fs = require('fs');
    var parser = require('xml2json');

    fs.readFile( './data.xml', function(err, data) {
        const json = parser.toJson(data);
        const obj = JSON.parse(json);

        obj.Folder.Placemark.map( async (taller) => {
            const coords = taller.Point.coordinates.split(",");
            const lat = coords[0];
            const long = coords[1];

            const tallerDB = new Taller({
                nombre: taller.name,
                descripcion: taller.description ?? "",
                latitud: lat,
                longitud: long,                
            });

            await tallerDB.save();
        });
     });

    next();
}

module.exports = readFile