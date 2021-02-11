const colors = require('colors');

const express = require('express');
const { json } = require('express');

const Archivo =require('./desafio');


const app=express();
const PORT=8080;

const archivo = new Archivo.Archivo('Productos.txt');

const dir_='/api'
const dir_prductos= dir_+'/productos';
const dir_agregar_producto= dir_+'/producto';
const dir_eliminar_producto= dir_+'/productoeliminar';

const server=app.listen(PORT, ()=>{
    console.log(colors.green.bold(`Servidor http escuchando en el puerto ${server.address().port}`));
    archivo.leer();
});
server.on("error",error => console.log(colors.red.bold(`Se obtuvo un error: ${error}`)));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get(dir_,(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
});

app.get(dir_prductos, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_prductos}`));;
    let datos=archivo.contenido;
    console.log(colors.yellow(datos.items))
    if (Object.entries(datos).length === 0) { 
        res.send(JSON.parse('{"error":"no hay productos cargados"}'));
    };
    res.send(datos.items);
});

app.post(dir_agregar_producto, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_agregar_producto}`));
    console.log(archivo.contenido)
    console.log(colors.green.bold(req.body));
    archivo.guardar(req.body);
    res.send(archivo.contenido.items[archivo.cantidad-1]);
})

app.post(dir_eliminar_producto, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_eliminar_producto}`));
    console.log(colors.green.bold(req.body));
    let datos=archivo.contenido;
    if (Object.entries(datos).length === 0) { 
        res.send(JSON.parse('{"error":"producto no encontrado"}'));
    }
    for (let i = 0; i < datos.items.length; i++) {
        if (datos.items[i].id==req.body.id) {
            datos.items.splice(i,1);
            archivo.cantidad=archivo.cantidad-1;
            archivo.contenido.items=datos.items;
            archivo.borrar();
        }
        
    }
    datos.items.forEach(element => {
        if (element.id==req.body.id) {
            console.log(element);
            res.send(element);
        }
    });
})





















