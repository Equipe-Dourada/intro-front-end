class Calculator {
    constructor() {
        this.number1 = document.getElementById('number1');
        this.number2 = document.getElementById('number2');
        this.operator = document.getElementById('operator');
        this.result = document.getElementById('result');
        this.calculateBtn = document.getElementById('calculateBtn');

        this.calculateBtn.addEventListener('click', () => this.calculate());
    }

    validateInputs(num1, num2) {
        if (!num1 || isNaN(num1)) {
            alert('Número 1 Inválido :(');
            return false;
        }
        if (!num2 || isNaN(num2)) {
            alert('Número 2 Inválido :(');
            return false;
        }
        if (this.operator.value === '/' && parseFloat(num2) === 0) {
            alert('Divisão por zero!!!');
            return false;
        }
        return true;
    }

    calculate() {
        const num1 = this.number1.value.trim().replace(',', '.');
        const num2 = this.number2.value.trim().replace(',', '.');

        if (!this.validateInputs(num1, num2)) return;

        let result;
        switch (this.operator.value) {
            case '+':
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case '-':
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case '*':
                result = parseFloat(num1) * parseFloat(num2);
                break;
            case '/':
                result = parseFloat(num1) / parseFloat(num2);
                break;
            default:
                alert('Operador inválido.');
                return;
        }

        this.result.value = result;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});
