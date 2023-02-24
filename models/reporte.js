const { Schema, model } = require("mongoose")

const reporteSchema = new Schema({
    iduser: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    type_report: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fecha_alta: {
        type: Date,
        default: Date.now
    },
    robery: {
        type: {
            serie: {
                type: String,
                required: true
            },
            photos:{
                type:[String]
            }
        }
    }
})

reporteSchema.methods.toJSON = function(){
    const { __v, ...data } = this.toObject();
    data.id = data._id;
    delete data._id;
    return data;
}

module.exports = model('Reporte', reporteSchema);