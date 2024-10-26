class IMCCalc {
    constructor() {
        this.heightInput = document.getElementById("height");
        this.weightInput = document.getElementById("weight");
        this.resultDiv = document.getElementById("result");
        this.imcValueSpan = document.getElementById("imcValue");
        this.situationSpan = document.getElementById("situation");
        this.obesityLevelSpan = document.getElementById("obesityLevel");

        document.getElementById("calculateBtn").addEventListener("click", () => this.calculateIMC());
        document.getElementById("clearBtn").addEventListener("click", () => this.clearFields());
    }

    formatInput(value) {
        return value.trim().replace(",", ".");
    }

    validateInputs() {
        const height = parseFloat(this.formatInput(this.heightInput.value));
        const weight = parseFloat(this.formatInput(this.weightInput.value));

        if (isNaN(height) || height <= 0) {
            alert("Insira uma altura válida.");
            return false;
        }

        if (isNaN(weight) || weight <= 0) {
            alert("Insira um peso válido.");
            return false;
        }

        return { height, weight };
    }

    calculateIMC() {
        const inputs = this.validateInputs();
        if (!inputs) return;

        const { height, weight } = inputs;
        const imc = weight / (height * height);
        this.displayResult(imc);
    }

    classifyIMC(imc) {
        if (imc < 16) return { situation: "Magreza Grave", obesityLevel: "III" };
        if (imc < 17) return { situation: "Magreza Moderada", obesityLevel: "II" };
        if (imc < 18.5) return { situation: "Magreza Leve", obesityLevel: "I" };
        if (imc < 25) return { situation: "Peso Normal", obesityLevel: "0" };
        if (imc < 30) return { situation: "Sobrepeso", obesityLevel: "I" };
        if (imc < 35) return { situation: "Obesidade Grau I", obesityLevel: "I" };
        if (imc < 40) return { situation: "Obesidade Grau II", obesityLevel: "II" };
        return { situation: "Obesidade Grau III", obesityLevel: "III" };
    }

    displayResult(imc) {
        const { situation, obesityLevel } = this.classifyIMC(imc);

        this.imcValueSpan.textContent = imc.toFixed(2);
        this.situationSpan.textContent = situation;
        this.obesityLevelSpan.textContent = obesityLevel;
        this.resultDiv.classList.remove("hidden");
    }

    clearFields() {
        this.heightInput.value = "";
        this.weightInput.value = "";
        this.resultDiv.classList.add("hidden");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new IMCCalc();
});
