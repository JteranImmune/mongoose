const mongoose = require('mongoose')

const discoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    titulo: {
        type:String,
        required:[true, 'El título es requerido']
    },
    artista: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'artista',
        required: [true]
    },
    genero: String,
    anyo: Date,
    stock:  {
        type:Number,
        require:[true, 'El stock es requerido']
    },
    formato:  String,
    created:{
        type:Date,
        default:  Date.now,
    }
});

const artistaSchema  = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type:String,
        required:[true, 'El nombre es requerido']
    },
    genero:{
        type:String,
        required:[true, 'El genero es requerido']
    },
    fechaNacimiento : Date,
    nacionalidad:  {
        type:String,
        required:[true, 'La nacionalidad es requerida']
    },
    nombreArtistico: String,
    created:{
        type:Date,
        default:  Date.now,
    }
})

module.exports .Disco = mongoose.model('disco', discoSchema, 'discos');
module.exports .Artista = mongoose.model('artista', artistaSchema);
