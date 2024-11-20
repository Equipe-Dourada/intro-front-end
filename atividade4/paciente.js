
const pacienteApiUrl = 'http://localhost:3333/stp/pacientes';
let isSending = true;

async function listarPacientes() {
    try {
        const response = await fetch(pacienteApiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const pacientes = await response.json();

        const pacienteTable = document.getElementById('paciente-table');
        pacienteTable.innerHTML = '';

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>CPF</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Ações</th>
        `;
        pacienteTable.appendChild(headerRow);

        pacientes.forEach(paciente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.cpf}</td>
                <td>${paciente.nome}</td>
                <td>${paciente.idade}</td>
                <td>
                    <button class="action-btn">
                        <img src="pencil-square.svg" alt="Editar">
                    </button>
                    <button class="action-btn" onclick="excluirPaciente(${paciente.cpf})">
                        <img src="trash.svg" alt="Excluir">
                    </button>
                </td>
            `;

            row.querySelector('.action-btn').addEventListener('click', () => editarPaciente(paciente));
            pacienteTable.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao listar pacientes:', error);
    }
}

document.getElementById('pacienteForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cpf = document.getElementById('pacienteId').value;
    const nome = document.getElementById('nomePaciente').value;
    const idade = +document.getElementById('idadePaciente').value;
    const paciente = { cpf, nome, idade };

    try {
        let response;
        if (!isSending) {
            response = await fetch(`${pacienteApiUrl}/${cpf}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paciente)
            });
            isSending = true;
        } else {
            response = await fetch(pacienteApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paciente)
            });
        }

        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        listarPacientes();
        document.getElementById('pacienteForm').reset();
    } catch (error) {
        console.error('Erro ao salvar paciente:', error);
    }
});

async function excluirPaciente(id) {
    try {
        const response = await fetch(`${pacienteApiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        listarPacientes();
    } catch (error) {
        console.error('Erro ao excluir paciente:', error);
    }
}

function editarPaciente(paciente) {
    document.getElementById('pacienteId').value = paciente.cpf;
    document.getElementById('nomePaciente').value = paciente.nome;
    document.getElementById('idadePaciente').value = paciente.idade;
    isSending = false;
}

listarPacientes();
