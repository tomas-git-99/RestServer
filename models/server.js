const express = require('express');
const { dbCOnnection } = require('../database/config');
const  router  = require('../routers/user');
require('dotenv').config();
const cors = require('cors');

class Server  {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.auth = '/api/auth';
        this.user = '/api/user';

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
        this.app.use(cors());

        this.app.use(express.static('public'));

        //lectura y parseo del body
        this.app.use( express.json());

    }

    router(){

        //USERS   
        this.app.use(this.auth, require('../routers/auth'));
        this.app.use(this.user, require('../routers/user'));
    }

    listenStart(){
        this.app.listen(this.port, () => {
            console.log(`Esta en el puerto ${this.port}`)
        });
    }
}




module.exports = Server;