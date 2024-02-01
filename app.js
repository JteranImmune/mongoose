const express = require('express');
let { ObjectId } = require('mongodb');
const port = process.env.PORT || 3000;
const app = express();
const mongoose = require('mongoose');
const { Disco, Artista } = require('./schemas');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/discos')
.then(console.log('🟢 MongoDB está conectado'))
.catch(err => {
console.log('🔴 MongoDB no conectado: ' + err)
});

let artistaPrimero = new Artista ({
    _id: new mongoose.Types.ObjectId(),
    nombre:'Artista Primero',
    genero:'Masculino',
    fechaNacimiento: '1992-12-09',
    nacionalidad: 'Español',
    nombreArtistico: 'El Primero'
});

artistaPrimero.save()
.then((console.log('Artista creado')))
.catch((error)=> console.log('No se ha podido crear el artista' + error));

let DiscoPrimero = new Disco({
    _id:new mongoose.Types.ObjectId(),
    titulo:"Disco de Oro",
    artista: artistaPrimero._id,
    anyo: "2004",
    stock: 20,
    formato:'mp4'

});

DiscoPrimero.save()
.then((console.log('Disco creado')))
.catch((error)=> console.log('No se ha podido crear el disco' + error));

app.get('/discos', async (req, res) =>{

    try {
        const results = await Disco.find();
        res.send({
            mensaje: 'Discos encontrados: ' + results.length,
            results
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al hacer la consulta',
            error
        });
    }
})

app.get('/discos/:id', async (req, res) =>{

    try {
        const results = await Disco.findById(req.params.id);
        res.send({
            mensaje: 'Disco encontrado: ' + results.titulo,
            results
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al hacer la consulta',
            error
        });
    }
})

app.get('/discos/:id', async (req, res) =>{

    try {
        const results = await Disco.findById(req.params.id);
        res.send({
            mensaje: 'Disco encontrado: ' + results.titulo,
            results
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al hacer la consulta',
            error
        });
    }
})

app.post('/artista/agregarArtista', async (req, res) =>{

    try {
        let artistaNuevo = new Artista({
                _id: new mongoose.Types.ObjectId(),
                nombre:'Artista Segundo',
                genero:'Femenino',
                fechaNacimiento: '1985-10-15',
                nacionalidad: 'Cubana',
                nombreArtistico: 'El Segundo'
            });
        artistaNuevo = await artistaNuevo.save();
        res.send({
            mensaje: 'Artista Agregado: ' + artistaNuevo.nombre,
            artistaNuevo
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al agregar',
            error
        });
    }
})

app.post('/disco/agregarDisco', async (req, res) =>{

    try {
        let discoNuevo = new Disco({
                _id:new mongoose.Types.ObjectId(),
                titulo:"Disco de Plata",
                artista: ObjectId('65bb8575be195eda714de1c2'),
                genero: 'Rock',
                anyo: "2008",
                stock: 50,
                formato:'mp3'
            });
        discoNuevo = await discoNuevo.save();
        res.send({
            mensaje: 'Disco Agregado: ' + discoNuevo.titulo,
            discoNuevo
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al agregar',
            error
        });
    }
})

app.put('/disco/:id', async (req, res) =>{

    try {
        const results = await Disco.findByIdAndUpdate(
            req.params.id,
            req.body,
            );
        res.send({
            mensaje: 'Disco modificado: ' + results.titulo,
            results
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al modificar',
            error
        });
    }
})

app.delete('/disco/:id', async (req, res) =>{

    try {
        const results = await Disco.findOneAndDelete(req.params.id);
        res.send({
            mensaje: 'Disco eliminado: ' + results.titulo
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar',
            error
        });
    }
})

app.delete('/artista/:id', async (req, res) =>{

    try {
        const results = await Artista.findOneAndDelete(req.params.id);
        res.send({
            mensaje: 'Artista eliminado: ' + results.nombre
        });
    } catch (error) {
        res.status(500).send({
            mensaje: 'Error al eliminar',
            error
        });
    }
})


app.listen(port || 3000, (e) =>{
    e
    ? console.log(`Error en servidor: ${e}`)
    : console.log("Servidor andando!");
});