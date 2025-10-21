const baseUrl = "http://localhost:3000/api";

const form = document.getElementById("formAluno");
const alunoId = document.getElementById("alunoId");
const alunoNome = document.getElementById("alunoNome");
const alunoProtocolo = document.getElementById("alunoProtocolo");
const alunoTurma = document.getElementById("alunoTurma");
const alunoEmail = document.getElementById("alunoEmail");

// Verifica se há um ID na URL para preencher o formulário
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (id) {
  // Modo de edição
  fetch(baseUrl + "/alunos/" + id)
    .then(res => res.json())
    .then(data => {
      alunoId.value = data.id;
      alunoNome.value = data.nome;
      alunoProtocolo.value = data.prontuario;
      alunoTurma.value = data.id_turma;
      alunoEmail.value = data.email;
    });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const idValue = alunoId.value;
  const nomeValue = alunoNome.value;
  const prontuarioValue = alunoProtocolo.value;
  const turmaValue = alunoTurma.value;
  const emailValue = alunoEmail.value;

  if (idValue) {
    // Atualizar aluno (PUT)
    fetch(baseUrl + "/alunos/" + idValue, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeValue, prontuario: prontuarioValue, id_turma: turmaValue, email: emailValue })
    }).then(() => {
      window.location.href = "/alunos";
    });
  } else {
    // Criar novo aluno (POST)
    fetch(baseUrl + "/alunos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeValue, protocolo: prontuarioValue, id_turma: turmaValue, email: emailValue })
    }).then(() => {
      window.location.href = "/alunos";
    });
  }
});