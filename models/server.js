const express = require('express');
const { dbCOnnection } = require('../database/config');
const  router  = require('../routers/user');
require('dotenv').config();


class Server  {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //CONNECTAR DB

        this.conectarDB();

        
        //MIDDLEWARES
        this.middlewares();

        //ROUTER
        this.router();

        
       
    }

    async conectarDB(){
        await dbCOnnection();
    }

    middlewares(){
        this.app.use(express.static('public'));

        //lectura y parseo del body
        this.app.use( express.json());

    }

    router(){

        //USERS   
        this.app.use('/api/user', require('../routers/user'));
    }

    listenStart(){
        this.app.listen(this.port, () => {
            console.log(`Esta en el puerto ${this.port}`)
        });
    }
}




module.exports = Server;