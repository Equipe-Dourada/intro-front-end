function fatorial() {
    const num = Number(window.prompt('Digite um número:'));

    let fat = 1;
    for (let i = 1; i <= num; i++) {
        fat *= i;
    }

    const res = document.querySelector('section#saida');
    res.innerHTML = `<p>O fatorial de ${num} é ${fat}.</p>`;
}
