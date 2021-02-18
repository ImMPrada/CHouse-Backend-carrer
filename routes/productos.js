const colors = require('colors');
const { json } = require('express');

var express =require('express');
var methodOverride = require('method-override');
const Archivo = require('../productos/desafio');

var router=express.Router();

let archivo=undefined;
let datos;

router.use(express.urlencoded({extended:true}))
router.use(methodOverride('_method'));

router.use('/vista', function(req,res,next){
    console.log(colors.red.bold('Middleware ++'))
    if (archivo) {
        console.log(colors.red.bold('el objeto archivo existe'))
    } else {
        console.log(colors.red.bold('el objeto archivo NO existe'))
        archivo = new Archivo.Archivo('Productos.txt')
    }
    next()
});


/*
PERMITE AGREGAR UN NUEVO PRODUCTO, REQUIER UN JSON CON LA SIGUIENTE ESTRUCTURA

{
    title: ,
    price: ,
    thumbnail:
}
*/
router.get('/vista', function(req,res){
    res.render("productos-forms")
});

router.post('/vista', function(req,res){
    console.group(colors.green.bold('(desde el router) POST para agregar producto:'));
    console.log(colors.green.bold('Desde productos.js'))
    let {title, price, thumbnail}=req.body;

    archivo.agregar(title, price, thumbnail).then(e=>{
        console.log(colors.white(`Title: ${title}`));
        console.log(colors.white(`Price: ${price}`));
        console.log(colors.white(`Thumbnail: ${thumbnail}`));
        
        res.render("productos-producto",req.body)
        console.log(colors.white(`AGREGADO`));
    });
    console.groupEnd
});

/* 
PERMITE OBTENER LA LISTA DE PRODUCTOS, COMO UN ARRAY SI EL id VIENE VACÍO.
SI NO, DEVUELVE LA INFORMACION DEL PRODUCTO id
 */
router.get('/vista/all', function(req,res){
    console.group(colors.green.bold('(desde el router) GET para obtener todos los productos:'));

    archivo.leer().then(e=>{
        console.log(archivo.contenido)
        console.groupEnd();
        archivo.contenido.productos.length>0
            ? res.render("productos-productos", {products:archivo.contenido.productos, listExists:true})
            : res.render("productos-productos", {message:"Agrega productos!!", listExists:false})  
        
    });  
    
});


module.exports=router; 