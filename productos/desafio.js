const colors=require('colors');

class Archivo {
    
    constructor(name) {
        this.fs=require('fs');
        this.name = name;
        this.cantidad=0;
        this.contenido={};

        console.log(`CREADO ${this.name}`);
    }

    async leer(){
        console.log(colors.red('LEYENDO...'))
        try {
            let lectura=await this.fs.readFileSync(this.name,'utf-8');
            //console.log(JSON.parse(lectura));
            this.contenido=JSON.parse(lectura);
            this.cantidad=this.contenido.productos.length;
            return this.contenido
        }catch (error) {
            console.log(error);
            return {};
        };
    };

}

module.exports= {
    Archivo:Archivo,
}
