 const baseUrl = "http://localhost:3000";
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
              <b>${t.id}</b> - ${t.nome}
              <button class="btn-delete" onclick="deletarTurma('${t.id}')">Deletar</button>
              <button class="btn-edit" onclick="editarTurma('${t.id}')">Editar</button>
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

    function editarTurma(id) {
      const novoNome = prompt("Novo nome da turma:");
      if (!novoNome) return;
      fetch(baseUrl + "/turmas/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome })
      }).then(() => carregarTurmas());
    }

    document.getElementById("formTurma").addEventListener("submit", e => {
      e.preventDefault();
      const id = document.getElementById("turmaId").value;
      const nome = document.getElementById("turmaNome").value;
      fetch(baseUrl + "/turmas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, nome })
      }).then(() => {
        e.target.reset();
        carregarTurmas();
      });
    });

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
              <button class="btn-edit" onclick="editarAluno(${a.id})">Editar</button>
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

    function editarAluno(id) {
      const novoNome = prompt("Novo nome do aluno:");
      const novaTurma = prompt("Nova turma (id):");
      fetch(baseUrl + "/alunos/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome, id_turma: novaTurma })
      }).then(() => carregarAlunos());
    }

    document.getElementById("formAluno").addEventListener("submit", e => {
      e.preventDefault();
      const nome = document.getElementById("alunoNome").value;
      const protocolo = document.getElementById("alunoProtocolo").value;
      const id_turma = document.getElementById("alunoTurma").value;
      const email = document.getElementById("alunoEmail").value;
      fetch(baseUrl + "/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, protocolo, id_turma, email })
      }).then(() => {
        e.target.reset();
        carregarAlunos();
      });
    });

    carregarTurmas();
    carregarAlunos();
