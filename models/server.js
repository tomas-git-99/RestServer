const express = require('express');
const { dbCOnnection } = require('../database/config');
const  router  = require('../routers/user');
require('dotenv').config();
const cors = require('cors');

const fileUpload = require('express-fileupload');

class Server  {


    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.path = {
            buscar:'/api/buscar',
            user:'/api/user',
            auth:'/api/auth',
            categoria: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads'

        }


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
        this.app.use(express.json());

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));

    }

    router(){

        //USERS   
        this.app.use(this.path.auth, require('../routers/auth'));
        this.app.use(this.path.categoria, require('../routers/categorias'));
        this.app.use(this.path.buscar, require('../routers/buscar'));
        this.app.use(this.path.user, require('../routers/user'));
        this.app.use(this.path.productos, require('../routers/productos'));
        this.app.use(this.path.uploads, require('../routers/uploads'));

    }

    listenStart(){
        this.app.listen(this.port, () => {
            console.log(`Esta en el puerto ${this.port}`)
        });
    }
}




module.exports = Server;