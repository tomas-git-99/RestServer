const Server = require('./models/server');

require('dotenv').config();



const listo = new Server();


listo.listenStart();