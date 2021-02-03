const {setTimeout} = require('timers');
const colors = require('colors');
var express = require('express');
const Archivo =require('./desafio');

const app=express();
const archivo = new Archivo.Archivo('Productos.txt');
const PORT=8080;
const dir_a= '/items';
const dir_b='/item-random';
const dir_c='/visitas';

let visitas_a=0;
let visitas_b=0;

const server=app.listen(PORT, ()=>{
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error",error => console.log(`Se obtuvo un error: ${error}`));

app.get(dir_a, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_a}`));;
    let datos=archivo.leer();
    visitas_a++;
    res.send(datos);
});

app.get(dir_b, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_b}`));
    let datos=archivo.leer();
    let i=Math.floor(Math.random()*(datos.cantidad-1));
    visitas_b++;
    res.send(datos.items[i]);
})

app.get(dir_c, (req,res)=>{
    console.log(colors.green.bold(`Request recibido en ${dir_c}`));
    res.send(JSON.parse('{"visitas":{"items":'+visitas_a.toString()+',"item":'+visitas_b.toString()+'}}'));
})