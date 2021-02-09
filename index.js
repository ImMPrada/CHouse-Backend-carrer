const {setTimeout} = require('timers');
const colors = require('colors');
var express = require('express');
const Archivo =require('./desafio');
const { notDeepEqual } = require('assert');
const { json } = require('express');

const app=express();
const archivo = new Archivo.Archivo('Productos.txt');
const PORT=8080;
const dir_a= '/api/productos';
const dir_b='/api/productos/:id';
const dir_c='/api/productos';

let visitas_a=0;
let visitas_b=0;

const server=app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
    archivo.leer();
});
server.on("error",error => console.log(`Se obtuvo un error: ${error}`));

app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get(dir_a, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_a}`));;
    let datos=archivo.contenido;
    console.log(colors.yellow(datos.items))
    if (Object.entries(datos).length === 0) { 
        res.send(JSON.parse('{"error":"no hay productos cargados"}'));
    };
    res.send(datos.items);
});

app.get(dir_b, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_b}`));
    console.log(colors.green.bold(`The request ${req.params.id}`));
    let datos=archivo.contenido;
    console.log(datos);
    if (Object.entries(datos).length === 0) { 
        res.send(JSON.parse('{"error":"producto no encontrado"}'));
    }
    datos.items.forEach(element => {
        if (element.id==req.params.id) {
            console.log(element);
            res.send(element);
        }
    });
})

app.post(dir_c, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_c}`));
    console.log(archivo.contenido)
    console.log(colors.green.bold(req.body));
    archivo.guardar(req.body);
    res.send(archivo.contenido.items[archivo.cantidad-1]);
})