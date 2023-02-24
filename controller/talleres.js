const { response, request  } = require("express");
const Taller = require("../models/talleres");

const readDataTalleres = async (req = request, res = response) => {

    try{
        const talleres = await Taller.find();
        res.json({
            ok: true,
            talleres
        })
    }catch(err){
        console.log(err);
        return res.json({
            ok: true,
            msg: "read talleres ok"
        })
    }
}

module.exports = readDataTalleres;