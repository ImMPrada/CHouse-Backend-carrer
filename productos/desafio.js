const colors=require('colors');
const { json } = require('express');
const { stringify } = require('querystring');

class Archivo {
    
    constructor(name) {
        this.fs=require('fs');
        this.name = name;
        this.cantidad=0;
        this.contenido=JSON.parse('{"productos":[]}');

        console.log(`CREADO ${this.name}`);
    }

    async leer(id){
        console.group(colors.red.bold('(desde el objeto) LEYENDO...'))
        console.groupEnd()

        try {
            let lectura= this.fs.readFileSync(this.name, 'utf-8');
            //console.log(JSON.parse(lectura));
            this.contenido=JSON.parse(lectura);

            if (id) {
                console.log(colors.red('cumplpido condicional'))
                for (let index = 0; index < this.contenido.productos.length; index++) {
                    if (this.contenido.productos[index].id==id) {
                        return this.contenido.productos[index]
                    }
                }
                console.log(colors.red('bucle terminado'))
                return JSON.parse('{"error":"No se encuentra el id"}')
            }

            return this.contenido.productos
        } catch (error) {
            console.log(`SE HA GENERADO UN ERROR AL LEER: ${error}`);
            try {
                this.fs.writeFileSync(this.name, '{"productos":[]}', 'utf-8')
                this.cantidad=0;
            } catch (error) {
                console.log(`SE HA GENERADO UN ERROR AL LEER: ${error}`);
            }
            return this.contenido
        }

    };

    async agregar(title,price,thumb) {
        console.group(colors.red.bold('(desde el objeto) AGREGANDO...'))
        console.log(colors.red(this.contenido.productos.length))

        this.contenido.productos.length==0
            ? this.cantidad=1
            : this.cantidad=this.contenido.productos[this.contenido.productos.length-1].id + 1

        let nuevoProducto={
            title:title,
            price:price,
            thumbnail:thumb,
            id:this.cantidad
        };

        this.contenido.productos.push(nuevoProducto)

        console.group(colors.red.bold('PRODUCTO A AGREGAR:'))
        console.log(colors.red(nuevoProducto))
        console.groupEnd()

        try {
            this.fs.writeFileSync(this.name,JSON.stringify(this.contenido),'utf-8')
            console.group(colors.green.bold('SE AGREGÓ:'))
            console.log(colors.green(this.name))
            console.groupEnd()
            return nuevoProducto
        } catch (error) {
            console.group(colors.red.bold('SE PRESENTO UN ERROR:'))
            console.log(error)
            console.groupEnd()
            return JSON.parse('{"error":"Se ha presentado un error"}')
        }
        console.groupEnd()
    };

    async modificar(title,price,thumb, id ) {
        console.group(colors.red.bold('(desde el objeto) MODIFICANDO...'))
        let productoModificado={
            title:title,
            price:price,
            thumbnail:thumb,
            id:Number(id)
        };

        console.group(colors.red.bold('PRODUCTO CON VALORES ACTUALIZADOS:'))
        console.log(colors.yellow(productoModificado))
        console.groupEnd()
        
        for (let index = 0; index < this.contenido.productos.length; index++) {
            if (this.contenido.productos[index].id==id) {
                console.group(colors.red.bold('PRODUCTO A MODIFICAR:'))
                console.log(colors.yellow(this.contenido.productos[index]))
                console.groupEnd()
                this.contenido.productos.splice(index,1,productoModificado)
                console.group(colors.green.bold('PRODUCTO MODIFICADO:'))
                console.log(colors.white(this.contenido.productos[index]))
                console.groupEnd()

                try {
                    this.fs.writeFileSync(this.name,JSON.stringify(this.contenido),'utf-8')
                    console.group(colors.green.bold('SE MODIFICÓ:'))
                    console.log(colors.green(this.name))
                    console.groupEnd()
                    return productoModificado
                } catch (error) {
                    console.group(colors.red.bold('SE PRESENTO UN ERROR:'))
                    console.log(error)
                    console.groupEnd()
                    return JSON.parse('{¨error¨:¨Se ha presentado un error¨}')
                }
            } else {
                console.log(colors.red('NO ENCONTRADO'))
            }
            
        }

        console.groupEnd()
    };

    async eliminar(id ) {
        console.group(colors.red.bold('(desde el objeto) ELIMINANDO...'))
        let productoEliminado={}

        if (id) {
            
            for (let index = 0; index < this.contenido.productos.length; index++) {
                if (this.contenido.productos[index].id==id) {
                    console.group(colors.red.bold('PRODUCTO A ELIMINAR:'))
                    console.log(colors.yellow(this.contenido.productos[index]))
                    console.groupEnd()
                    productoEliminado=this.contenido.productos[index]
                    this.contenido.productos.splice(index,1)
                    console.group(colors.green.bold('NUEVO LISTADO:'))
                    console.log(colors.white(this.contenido.productos))
                    console.groupEnd()
    
                    try {
                        this.fs.writeFileSync(this.name,JSON.stringify(this.contenido),'utf-8')
                        console.group(colors.green.bold('SE MODIFICÓ:'))
                        return productoEliminado
                    } catch (error) {
                        console.group(colors.red.bold('SE PRESENTO UN ERROR:'))
                        console.log(error)
                        console.groupEnd()
                        return JSON.parse('{"error":"Se ha presentado un error"}')
                    }
                } else {
                    console.log(colors.red('NO ENCONTRADO'))
                }
                
            }
        }

        console.groupEnd()
    };
}

module.exports= {
    Archivo:Archivo,
}
