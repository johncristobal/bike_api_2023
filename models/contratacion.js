const { Schema, model } = require("mongoose")

const policydataSchema = new Schema({
    folio:{
        type: String,
        default: ""
    },
    fecha_contratacion: {
        type: Date,
        default: Date.now
    },
    fecha_vigencia: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

const policySchema = new Schema({
    cliente: {
        type: {
            nombre: {
                type: String,
                required: [true, "Nombre obligatorio"]
            },
            nacimiento: {
                type: String,
                required: [true, "Fecha de nacimiento obligatorio"]
            },
            segundo: {
                type: String,
            }
        },
        require: true
    },
    polizasInfo: {
        type: [policydataSchema],
    },
    correo: {
        type: String,
        required: [true, "Correo obligatorio"],
    },
    telefono:{
        type: String,
        require: true
    },
    estado: {
        type: Boolean,
        default: false
    },
    fecha_update: {
        type: Date,
    },
    direccion: {
        type: {
            alcaldia: {
                type: String,
                required: [true, "Alcaldia obligatoria"]
            },
            calle: {
                type: String,
                required: [true, "Calle obligatoria"]
            },
            colonia: {
                type: String,
                required: [true, "Colonia obligatoria"]
            },
            cp: {
                type: String,
                required: [true, "c.p. obligatorip"]
            },
        },
        require: true
    },
});

module.exports = model('Policy', policySchema);
