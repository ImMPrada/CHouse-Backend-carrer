const colors = require('colors');
const { json } = require('express');

var express =require('express');
var methodOverride = require('method-override')
const Archivo = require('../productos/desafio');
var router=express.Router();

let archivo = Object;
let datos;

router.use(methodOverride('_method'));

router.use('/', function(req,res,next){
    console.log(colors.red.bold('Middleware ++'))
    archivo = new Archivo.Archivo('Productos.txt')
    datos=archivo.leer()
    next()
});

/* 
PERMITE OBTENER LA LISTA DE PRODUCTOS, COMO UN ARRAY SI EL id VIENE VACÍO.
SI NO, DEVUELVE LA INFORMACION DEL PRODUCTO id
 */
router.get('/productos', function(req,res){
    console.group(colors.green.bold('(desde el router) GET para obtener uno o todos los productos:'));
    let index=req.query.id;

    archivo.leer(index).then(e=>{
        res.send(e);
    });  
    
    console.groupEnd();
});


/*
PERMITE AGREGAR UN NUEVO PRODUCTO, REQUIER UN JSON CON LA SIGUIENTE ESTRUCTURA

{
    title: ,
    price: ,
    thumbnail:
}
*/
router.post('/producto', function(req,res){
    console.group(colors.green.bold('(desde el router) POST para agregar producto:'));
    let {title, price, thumbnail}=req.body;

    archivo.agregar(title, price, thumbnail).then(e=>{
        console.log(colors.white(`Title: ${title}`));
        console.log(colors.white(`Price: ${price}`));
        console.log(colors.white(`Thumbnail: ${thumbnail}`));
        console.log(colors.white(`AGREGADO`));
        
        res.send(e);
    });
    
    console.groupEnd();
});

/*
PERMITE AGREGAR UN NUEVO PRODUCTO, REQUIER UN JSON CON LA SIGUIENTE ESTRUCTURA

{
    title: ,
    price: ,
    thumbnail: ,
    id:
}

SI EL id NO EXISTE EN Productos, NO HACE NADA, DEVUELVE ERROR
*/
router.put('/producto', function(req,res){
    console.group(colors.green.bold('(desde el router) PUT para actualizar producto:'));
    let {title, price, thumbnail, id}=req.body;

    archivo.modificar(title, price, thumbnail, id).then(e=>{       
        res.send(e);
    });
    
    console.groupEnd();
});

/*
PERMITE BORRAR EL ELEMENTO CON EL id ESPECIFICADO
*/
router.delete('/producto', function(req,res){
    console.group(colors.green.bold('(desde el router) DELETE para eliminar un producto:'));
    let index=req.body.id;

    /*
    */
   if (index) {
       console.log(index);
       archivo.eliminar(index).then(e=>{       
           res.send(e);
       });
   }
    console.groupEnd();
});
module.exports=router; 