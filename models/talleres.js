const { Schema, model } = require("mongoose")

const tallerSchema = new Schema({
    nombre:{
        type: String,
        default: ""
    },
    descripcion: {
        type: String,
        default: ""
    },
    latitud: {
        type: String,
        default: ""
    },
    longitud: {
        type: String,
        default: ""
    },
    activo: {
        type: Boolean,
        default: true,
    },
});

tallerSchema.methods.toJSON = function(){
    const { __v, _id, ...data } = this.toObject();
    return data;
}

module.exports = model('Taller', tallerSchema);
