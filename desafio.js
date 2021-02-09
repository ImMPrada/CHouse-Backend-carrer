const colors=require('colors');

class Archivo {
    
    constructor(name) {
        this.fs=require('fs');
        this.name = name;
        this.cantidad=0;
        this.contenido={};
    }

    async leer(){
        try {
            let lectura=await this.fs.readFileSync(this.name,'utf-8');
            console.log(lectura);
            return this.contenido=JSON.parse(lectura);
        }catch (error) {
            return {};
        };
    };

    async guardar(thePOST){
        console.log(colors.red(`EN GUARDAR:`));
        console.log(colors.red(thePOST));
        console.log(colors.red(this.contenido));
        if (Object.entries(this.contenido).length === 0) {
            console.log(colors.red('Dentro del condicional'));
            this.contenido.items=[];
            console.log(colors.red(this.contenido));
        }
        this.contenido.items.push(thePOST);
        this.cantidad=this.contenido.items.length;
        this.contenido.items[this.cantidad-1].id=this.cantidad;
        this.contenido.cantidad=this.cantidad;
        console.log(colors.red(this.contenido));
        try {
            await this.fs.promises.writeFile(this.name,JSON.stringify(this.contenido));
            console.log(colors.green.bold(`REGISTRADO EN EL ${this.name}`));
            return JSON.parse('{"error":"blbala"}')
        } catch (error) {
            console.log(colors.red.bold(`SE PRESENTÓ, DURANTE EL REGISTRO, EL SIGUIENTE ERROR ${error}`));
            return JSON.parse('{"error":"se presento un error al guardar el producto: ' + error +'}')
        };
    };

    async borrar(){
        try {
            await this.fs.promises.unlink(this.name);
            console.log(colors.green.bold.underline(`ELIMINADO: ${this.name}`))
        } catch (error) {
            console.log(colors.red.bold(`SE OBTUVO EL ERROR: ${error}`))
        }
    }
}

module.exports= {
    Archivo:Archivo,
}
