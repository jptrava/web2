const lista = document.querySelector('#lista-tarefas');
const formNovo = document.querySelector('#form-criar');
const mensagemCriar = document.querySelector('#mensagem-criar');
const formBuscaId = document.querySelector('#form-busca-id');
const formEditarTarefaDiv = document.querySelector('#form-editar-tarefa');
const mensagemEditar = document.querySelector('#mensagem-editar');

async function exibirTarefas() {
  try {
    const resposta = await fetch('/tarefas');
    const dados = await resposta.json();

    lista.innerHTML = '';
    dados.forEach(item => {
      lista.insertAdjacentHTML(
        'beforeend',
        `<li>ID ${item.id}: ${item.titulo} - ${item.feito ? 'Feito' : 'Não feito'}</li>`
      );
    });
  } catch (erro) {
    lista.innerHTML = '<li>Erro ao carregar tarefas.</li>';
  }
}

formNovo.onsubmit = async (evento) => {
  evento.preventDefault();
  const dadosForm = new FormData(formNovo);

  try {
    const resposta = await fetch('/tarefas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: dadosForm.get('titulo'),
        feito: dadosForm.get('feito') === 'true'
      })
    });

    if (resposta.ok) {
      mensagemCriar.textContent = 'Tarefa adicionada com sucesso!';
      mensagemCriar.style.color = 'green';
      formNovo.reset();
      exibirTarefas();
    } else {
      mensagemCriar.textContent = 'Erro ao adicionar tarefa.';
      mensagemCriar.style.color = 'red';
    }
  } catch (erro) {
    mensagemCriar.textContent = 'Erro ao adicionar tarefa.';
    mensagemCriar.style.color = 'red';
  }
};

formBuscaId.onsubmit = async (evento) => {
  evento.preventDefault();
  mensagemEditar.textContent = '';
  formEditarTarefaDiv.innerHTML = '';

  const id = formBuscaId['id-editar'].value;
  if (!id) return;

  try {
    const resposta = await fetch('/tarefas');
    const tarefas = await resposta.json();
    const tarefa = tarefas.find(t => t.id === Number(id));

    if (!tarefa) {
      mensagemEditar.textContent = 'Tarefa não encontrada.';
      mensagemEditar.style.color = 'red';
      return;
    }

    // Formulário de edição
    const formEditar = document.createElement('form');
    formEditar.innerHTML = `
      <label for="titulo-editar">Título:</label>
      <input type="text" id="titulo-editar" name="titulo" value="${tarefa.titulo}" required />
      <label for="feito-editar">Status:</label>
      <select id="feito-editar" name="feito">
        <option value="true" ${tarefa.feito ? 'selected' : ''}>Concluída</option>
        <option value="false" ${!tarefa.feito ? 'selected' : ''}>Pendente</option>
      </select>
      <button type="submit">Salvar</button>
    `;

    formEditar.onsubmit = async (e) => {
      e.preventDefault();
      const dadosForm = new FormData(formEditar);
      try {
        const resposta = await fetch(`/tarefas/${tarefa.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            titulo: dadosForm.get('titulo'),
            feito: dadosForm.get('feito') === 'true'
          })
        });
        if (resposta.ok) {
          mensagemEditar.textContent = 'Tarefa atualizada com sucesso!';
          mensagemEditar.style.color = 'green';
          formEditarTarefaDiv.innerHTML = '';
          exibirTarefas();
        } else {
          mensagemEditar.textContent = 'Erro ao atualizar tarefa.';
          mensagemEditar.style.color = 'red';
        }
      } catch (erro) {
        mensagemEditar.textContent = 'Erro ao atualizar tarefa.';
        mensagemEditar.style.color = 'red';
      }
    };

    // Botão de remover tarefa
    const botaoRemover = document.createElement('button');
    botaoRemover.textContent = 'Remover Tarefa';
    botaoRemover.type = 'button';
    botaoRemover.style.marginLeft = '10px';
    botaoRemover.onclick = async () => {
      try {
        const resposta = await fetch(`/tarefas/${tarefa.id}`, { method: 'DELETE' });
        if (resposta.ok) {
          mensagemEditar.textContent = 'Tarefa removida com sucesso!';
          mensagemEditar.style.color = 'green';
          formEditarTarefaDiv.innerHTML = '';
          exibirTarefas();
        } else {
          mensagemEditar.textContent = 'Erro ao remover tarefa.';
          mensagemEditar.style.color = 'red';
        }
      } catch (erro) {
        mensagemEditar.textContent = 'Erro ao remover tarefa.';
        mensagemEditar.style.color = 'red';
      }
    };

    formEditarTarefaDiv.appendChild(formEditar);
    formEditarTarefaDiv.appendChild(botaoRemover);
  } catch (erro) {
    mensagemEditar.textContent = 'Erro ao buscar tarefa.';
    mensagemEditar.style.color = 'red';
  }
};