import Numeros from './numeros'
const ops = './operation.ts';

const operation = async (num1: number, num2: number, op: string): Promise<number | undefined> => {
    try {
        const module = await import(ops);
        const result = await module.default.operation(num1, num2, op);
        return result
    } catch (error) {
        console.log(error)
    }
}

const operations = (func: Promise<number | undefined>) => {
    return func
}

const numeros1 = new Numeros(1, 2);
const numeros2 = new Numeros(5, 1);

operations(operation(numeros1.getNumeros()[0], numeros1.getNumeros()[1], 'suma')).then(res => console.log(res));
operations(operation(numeros2.getNumeros()[0], numeros2.getNumeros()[1], 'resta')).then(res => console.log(res));