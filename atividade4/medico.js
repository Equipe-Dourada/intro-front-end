
const medicoApiUrl = 'http://localhost:3333/stp/medicos';
let isUpdating = false;

async function listarMedicos() {
    try {
        const response = await fetch(medicoApiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const medicos = await response.json();

        const medicoTable = document.getElementById('medico-table');
        medicoTable.innerHTML = '';

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>CRM</th>
            <th>Nome</th>
            <th>Especialidade</th>
            <th>Ações</th>
        `;
        medicoTable.appendChild(headerRow);

        medicos.forEach(medico => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${medico.crm}</td>
                <td>${medico.nome}</td>
                <td>${medico.especialidade}</td>
                <td>
                    <button class="action-btn">
                        <img src="pencil-square.svg" alt="Editar">
                    </button>
                    <button class="action-btn" onclick="excluirMedico(${medico.crm})">
                        <img src="trash.svg" alt="Excluir">
                    </button>
                </td>
            `;

            row.querySelector('.action-btn').addEventListener('click', () => editarMedico(medico));
            medicoTable.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao listar médicos:', error);
    }
}

document.getElementById('medicoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const crm = document.getElementById('medicoId').value;
    const nome = document.getElementById('nomeMedico').value;
    const especialidade = document.getElementById('especialidadeMedico').value;
    const medico = { crm, nome, especialidade };

    try {
        let response;
        if (isUpdating) {
            response = await fetch(`${medicoApiUrl}/${crm}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medico)
            });
            isUpdating = false;
        } else {
            response = await fetch(medicoApiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(medico)
            });
        }

        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        listarMedicos();
        document.getElementById('medicoForm').reset();
    } catch (error) {
        console.error('Erro ao salvar médico:', error);
    }
});

async function excluirMedico(id) {
    try {
        const response = await fetch(`${medicoApiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        listarMedicos();
    } catch (error) {
        console.error('Erro ao excluir médico:', error);
    }
}

function editarMedico(medico) {
    document.getElementById('medicoId').value = medico.crm;
    document.getElementById('nomeMedico').value = medico.nome;
    document.getElementById('especialidadeMedico').value = medico.especialidade;
    isUpdating = true;
}

listarMedicos();
