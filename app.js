const colors = require('colors');

var express =require('express');
var app=express();
var router=express.Router();

app.use(express.urlencoded({extended:true}))

app.use('/api', (req,res,next)=>{
    console.log(colors.red.bold('Middleware +'));
    next();
});

app.use('/api',require('./routes/api'));

app.use('/api/html',express.static('public'));

const server=app.listen(8080, function(){
    console.log(colors.yellow.bold(`SERVIDOR INICIADO EN PUERTO: ${server.address().port}`))
});


 
















