const baseUrl = "http://localhost:3000/api";

const form = document.getElementById("formTurma");
const turmaId = document.getElementById("turmaId");
const turmaNome = document.getElementById("turmaNome");

// Verifica se há um ID na URL para preencher o formulário
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
if (id) {
  // Modo de edição
  fetch(baseUrl + "/turmas/" + id)
    .then(res => res.json())
    .then(data => {
      turmaId.value = data.id;
      turmaNome.value = data.nome;
    });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const idValue = turmaId.value;
  const nomeValue = turmaNome.value;

  if (idValue) {
    // Atualizar turma (PUT)
    fetch(baseUrl + "/turmas/" + idValue, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: nomeValue })
    }).then(() => {
      window.location.href = "/turmas";
    });
  } else {
    // Criar nova turma (POST)
    fetch(baseUrl + "/turmas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: nomeValue.toLowerCase().replace(/\s/g, ''), nome: nomeValue }) // Exemplo simples de ID
    }).then(() => {
      window.location.href = "/turmas";
    });
  }
});