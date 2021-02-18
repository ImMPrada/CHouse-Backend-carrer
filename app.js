const colors = require('colors');

var express =require('express');
const handelbars=require('express-handlebars');
var app=express();
var router=express.Router();

app.use(express.urlencoded({extended:true}))

app.use('/api', (req,res,next)=>{
    console.log(colors.red.bold('Middleware +'));
    next();
});

app.engine(
    "hbs",
    handelbars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDirc: __dirname + '/views/partials'
    })
);

app.set("view engine", "hbs");

app.set("views","./views");

app.use('/',express.static('public'));

app.use('/api',require('./routes/api'));
app.use('/productos',require('./routes/productos'));

const server=app.listen(8080, function(){
    console.log(colors.yellow.bold(`SERVIDOR INICIADO EN PUERTO: ${server.address().port}`))
    
});

server.on('error', (err) => { console.log(`Error de conexion: ${err}`)});


 
















