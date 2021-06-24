const { Schema, model } = require("mongoose");





const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'EL nombre es obligatorio']
    },
    estado:{
        type: Boolean,
        default: true,
        required: true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

CategoriaSchema.methods.toJSON = function () {
     const {__v,estado, ...dato} = this.toObject();
 
     return dato;
}

module.exports = model('Categoria', CategoriaSchema);