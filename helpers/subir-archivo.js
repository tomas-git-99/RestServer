

const { v4: uuidv4 } = require('uuid');
const path = require('path')
 

 const subirArchivo = (files, extencionesValidas = ['png', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise ((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
    
        const extension = nombreCortado[nombreCortado.length -1];
     
    
        if (!extencionesValidas.includes(extension)){
            reject (`La extension ${extension} no es permitida, ${extencionesValidas}`);
        }
    
        const newName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, newName);
      
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function(err) {
          if (err)
            reject(err)
      
          resolve (newName);
        });
    })

 }


 module.exports = {
     subirArchivo
 }