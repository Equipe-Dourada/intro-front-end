function parImpar() {
    const num = Number(window.prompt('Digite um número:'));
    const resultado = (num % 2 === 0) ? 'par' : 'ímpar';

    const res = document.querySelector('section#saida');
    res.innerHTML = `<p>O número ${num} que foi digitado é ${resultado}!</p>`;
}
