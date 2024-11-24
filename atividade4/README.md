
Projeto: Sistema de Gestão de Médicos e Pacientes

Este projeto é um sistema que gerencia informações de médicos, pacientes e usuários. Ele foi desenvolvido utilizando HTML, CSS, JavaScript e Bootstrap para a interface e comunicação com uma API.

Estrutura do Projeto
Arquivos Principais:
1. HTML
index.html: Tela de login para usuários do sistema, conectando ao cadastro de novos usuários ou ao sistema principal após autenticação​(index).
usuario.html: Tela de cadastro de novos usuários, com validação de formulário​(usuario).
crud.html: Interface principal para gestão de médicos e pacientes, com formulários e tabelas interativas​(crud).

2. JavaScript:
medico.js:
Gerencia operações de CRUD para médicos.
Comunica-se com a API para listar, adicionar, editar e excluir médicos.
Inclui validações no formulário de entrada e manipulação de DOM para exibir dados na tabela​(medico).
paciente.js:
Semelhante ao medico.js, mas dedicado à gestão de pacientes.
Permite operações CRUD e manipulação da tabela de pacientes​(paciente).
CSS:

3. CSS
styles.css: Estiliza o sistema com layout responsivo.
Define a aparência de elementos como tabelas, botões e cartões​(styles).

FUNCIONALIDADES
Login: Autenticação de usuários com validação de campos.
Redirecionamento para a interface principal (crud.html).

Cadastro: Tela para criar novos usuários com campos validados.

Gestão de Médicos:
Cadastro de médicos com informações de CRM, Nome e Especialidade.
Listagem de médicos em tabela.
Atualização de registros existentes.
Exclusão de médicos por meio de interação com ícones.

Gestão de Pacientes:
Cadastro de pacientes com CPF, Nome e Idade.
Listagem e gerenciamento de dados de pacientes.
Atualizações e exclusões realizadas diretamente pela tabela.

Tecnologias Utilizadas
HTML5
CSS3 (com Bootstrap)
JavaScript ES6+


## Video Demonstrativo
https://drive.google.com/drive/folders/1RemDlDCMd2me7BSVx4NNmw58JpLBvzEM?usp=sharing

