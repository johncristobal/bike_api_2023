const express = require('express');
var cors = require('cors');
const dbConnection = require('../db/connection');

const fileUpload = require('express-fileupload');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT

        this.paths = {
            contratacion: '/gttapi/contratacion',
            polizas: '/gttapi/polizas',
            reportes: '/gttapi/reportes',
            talleres: '/gttapi/talleres',
            auth: '/gttapi/auth',
        };

        //conectar db
        this.connectDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json() );
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        this.app.use( express.static('public') );
        this.app.use(express.static( 'dist/polizas'  ));
        this.app.use(express.static( 'dist/reportes'  ));

    }

    routes(){
        this.app.use( this.paths.contratacion, require('../routes/contratacion'));
        this.app.use( this.paths.polizas, require('../routes/polizas'));
        this.app.use( this.paths.reportes, require('../routes/reportes'));
        this.app.use( this.paths.talleres, require('../routes/talleres'));
        this.app.use( this.paths.auth, require('../routes/auth'));

    }

    async connectDB () {
        await dbConnection();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("App running", this.port)
        })
    }
}

module.exports = Server;