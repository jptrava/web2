const baseUrl = "http://localhost:3000/api";

function carregarTurmas() {
  fetch(baseUrl + "/turmas")
    .then(res => res.json())
    .then(data => {
      const div = document.getElementById("turmas");
      div.innerHTML = "";
      data.forEach(t => {
        const linha = document.createElement("div");
        linha.className = "item";
        linha.innerHTML = `
          <strong>${t.id}</strong> - ${t.nome} (Alunos: ${t.quantidade_alunos})
          <button class="btn-delete" onclick="deletarTurma('${t.id}')">Deletar</button>
          <a href="/criar-turma?id=${t.id}" class="btn-edit">Editar</a>
        `;
        div.appendChild(linha);
      });
    });
}

function deletarTurma(id) {
  fetch(baseUrl + "/turmas/" + id, { method: "DELETE" })
    .then(res => res.json())
    .then(() => carregarTurmas());
}

document.addEventListener("DOMContentLoaded", carregarTurmas);