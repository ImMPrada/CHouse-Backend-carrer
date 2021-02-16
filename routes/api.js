const colors = require('colors');

var express =require('express');
const Archivo = require('../productos/desafio');
var router=express.Router();

let archivo = Object;
let datos;

router.use('/', function(req,res,next){
    console.log(colors.red.bold('Middleware ++'))
    archivo = new Archivo.Archivo('Productos.txt');
    datos=archivo.leer();
    next();
});

router.get('/productos', function(req,res){
    datos.then(e=>{
        
        res.send(e.productos)
    })
});

module.exports=router; 