function media() {
    const nome = window.prompt("Digite o nome do aluno:");
    const disciplina = window.prompt("Digite o nome da disciplina:");
    const nota1 = Number(window.prompt('Digite a nota 1: '));
    const nota2 = Number(window.prompt('Digite a nota 1: '));

    const media = (nota1 + nota2) / 2;

    const res = document.querySelector('section#saida')

    res.innerHTML = `
        <p>Aluno: <strong>${nome}</strong></p>
        <p>Disciplina: <strong>${disciplina}</strong></p>
        <p>Nota 1: <strong>${nota1}</strong></p>
        <p>Nota 2: <strong>${nota2}</strong></p>
        <p>Média: <strong>${media}</strong></p>`;
}
