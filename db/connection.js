const { default: mongoose } = require("mongoose")

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Conexion a DB lista");
    }catch(error){
        console.log(error);
        throw new Error("No se pudo conectar a la base de datos")
    }
}

module.exports = dbConnection