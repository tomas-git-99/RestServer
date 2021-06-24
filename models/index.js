
// con esto acomodamos de forma mas ordenada nuestras exportaciones de la carpeta MODELS 
const Categoria = require('./categoria');
const Producto = require('./producto');
const Role = require('./role');
const Server = require('./server');
const Usuario = require('./usuario');



module.exports = {
    Categoria,
    Role,
    Server,
    Usuario,
    Producto
}