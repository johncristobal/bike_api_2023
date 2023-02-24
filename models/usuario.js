const { Schema, model } = require("mongoose")

const usuarioSchema = new Schema({
    nombre:{
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    token_mobile: {
        type: String,
        default: ""
    },
    google_login: {
        type: Boolean,
        default: false
    },
    facebook_login: {
        type: Boolean,
        default: false
    },
    fecha_alta: {
        type: Date,
        default: Date.now
    },
    activo: {
        type: Boolean,
        default: true,
    },
    rol: {
        type: String,
        default:'USER',
    },
});

module.exports = model('Usuario', usuarioSchema);
