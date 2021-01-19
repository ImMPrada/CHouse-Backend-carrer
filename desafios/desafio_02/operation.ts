
const ops = {
    operation(num1: number, num2: number, op: string) {
        switch (op.toLowerCase()) {
            case 'suma':
                return num1 + num2;
            case 'resta':
                 return num1 > num2 ? num1 - num2 : num2 - num1;
            default:
                break;
        }
    }
}

export default ops;