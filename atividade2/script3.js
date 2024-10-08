function idade() {
    const nascimento = Number(window.prompt('Digite seu ano de nascimento:'));
    const idade = 2024 - nascimento;

    const res = document.querySelector('section#saida');
    res.innerHTML = `<p>Quem nasceu em ${nascimento} irá completar ${idade} anos em 2024.</p>`;
}
