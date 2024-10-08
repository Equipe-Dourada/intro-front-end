function contagem() {
    const N = Number(window.prompt('Digite o valor de N:'));

    let msg = '';
    for (let i = 1; i <= N; i++) {
        msg += `${i}, `;
    }

    const res = document.querySelector('section#saida')
    res.innerHTML = `<p>Contagem de 1 até ${N}: ${msg.slice(0, -2)}</p>`;
}
