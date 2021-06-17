const { Schema, model } = require('mongoose')



const UsuarioSchema = Schema({
    nombre:{
        type: String,
        require:[true, 'el nombre es obligatorio']
    },
    correo:{
        type: String,
        require:[true, 'el correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        require:[true, 'el contraseña es obligatorio'],
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        require:true,
        emun:['ADMIN_ROLE', 'USER_ROLE']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default:false
    },
});
//con esto extraemos lo que queremos la base de datos y sacarlo

UsuarioSchema.methods.toJSON = function() { // <--- cuando es llamdo el json se va ejecutar la funcion
    const { __v, password, _id, ...usuario } = this.toObject(); //genera los objetos
    usuario.uid = _id; //subcribiendo el nombre de ID
    return usuario;
}


module.exports = model( 'Usuario', UsuarioSchema );