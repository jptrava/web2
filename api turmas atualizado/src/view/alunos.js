const baseUrl = "http://localhost:3000/api";

function carregarAlunos() {
  fetch(baseUrl + "/alunos")
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById("alunos");
      div.innerHTML = "";
      data.forEach(a => {
        const linha = document.createElement("div");
        linha.className = "item";
        linha.innerHTML = `
          <b>${a.id}</b> - ${a.nome} (Turma: ${a.id_turma})
          <button class="btn-delete" onclick="deletarAluno(${a.id})">Deletar</button>
          <a href="/criar-aluno?id=${a.id}" class="btn-edit">Editar</a>
        `;
        div.appendChild(linha);
      });
    });
}

function deletarAluno(id) {
  fetch(baseUrl + "/alunos/" + id, { method: "DELETE" })
    .then(res => res.json())
    .then(() => carregarAlunos());
}

document.addEventListener("DOMContentLoaded", carregarAlunos);