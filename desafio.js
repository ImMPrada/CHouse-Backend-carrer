const colors=require('colors');

class Archivo {
    
    constructor(name) {
        this.fs=require('fs');
        this.name = name;
        this.cantidad=0;
        this.contenido={};
    }

    leer(beautyffy=true){
        try {
            return this.contenido=JSON.parse('{"items":' + this.fs.readFileSync(this.name,'utf-8') + ',"cantidad":'+ this.fs.readFileSync(this.name,'utf-8').split('},').length +'}')
        }catch (error) {
            return {};
        }
    }

    async guardar(title,price,thumbnail){
        this.cantidad = this.contenido.length
        let cantidad=this.cantidad+1;
        let i=1;
        if (this.cantidad>0) {
            this.contenido[this.cantidad - 1]=this.contenido[this.cantidad - 1].replace('}','},')
        }
        this.contenido.push('\r\n' +
                            '{                                                                                                                                                    \r\n' +
                            "  title: '"+ title +"',\r\n" +
                            '  price: '+ price +',\r\n' +
                            "  thumbnail: '"+ thumbnail +"',\r\n" +
                            '  id: '+ cantidad.toString() +'\r\n' +
                            '}')
        try {
            await this.fs.promises.writeFile(this.name,this.contenido.join(''))
            console.log(colors.green.bold(`REGISTRADO EN EL ${this.name}`))
        } catch (error) {
            console.log(colors.red.bold(`SE PRESENTÓ, DURANTE EL REGISTRO, EL SIGUIENTE ERROR ${error}`))
        }
    }
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
