function tabuada() {
    const num = Number(window.prompt('Digite um número:'));
    
    let msg = '';
    for (let i = 1; i <= 10; i++) {
        msg += `${num} x ${i} = ${num * i}<br>`; 
    }

    const res = document.querySelector('section#saida');
    res.innerHTML = `<p>Tabuada de ${num}:</p><p>${msg}</p>`;
}
