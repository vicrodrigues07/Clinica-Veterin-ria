// Dados mock
const animais = [
  { id: "1", nome: "Mingau", data_de_nascimento: "2020-05-10", raca: "Persa", createdAt: new Date("2023-01-01") },
  { id: "2", nome: "Frajola", data_de_nascimento: "2019-08-21", raca: "Siamês", createdAt: new Date("2023-03-15") },
];

const usuarios = [
  { id: "1", nome: "João Silva", email: "joao@email.com", senha: "123", data_de_nascimento: "1990-07-15", animal: animais[0], createdAt: new Date("2023-01-02") }
];

const doutores = [
  { id: "1", nome: "Dra. Ana", email: "ana@vet.com", senha: "vetana", createdAt: new Date("2023-01-03") }
];

const consultas = [];

// Funções CRUD simuladas
function getAllAnimais() { return animais; }
function postAnimal(novo) { animais.push(novo); return novo; }
function deleteAnimal(id) {
  const idx = animais.findIndex(a => a.id === id);
  if (idx !== -1) return animais.splice(idx, 1)[0];
  return null;
}
function getAllUsuarios() { return usuarios; }
function postUsuario(novo) { usuarios.push(novo); return novo; }
function getAllDoutores() { return doutores; }
function postDoutor(novo) { doutores.push(novo); return novo; }
function getAllConsultas() { return consultas; }
function postConsulta(novo) { consultas.push(novo); return novo; }

// Mostrar listas
function mostrarTodosAnimais() { mostrar(getAllAnimais()); }
function mostrarTodosUsuarios() { mostrar(getAllUsuarios()); }
function mostrarTodosDoutores() { mostrar(getAllDoutores()); }
function mostrarTodasConsultas() { mostrar(getAllConsultas()); }

// Modal Animal
const modalAnimal = document.getElementById('modalAnimal');
function abrirModalAnimal() {
  modalAnimal.style.display = 'block';
}
function fecharModalAnimal() {
  modalAnimal.style.display = 'none';
  document.getElementById('formAnimal').reset();
}
function enviarAnimal(event) {
  event.preventDefault();
  const nome = event.target.nomeAnimal.value.trim();
  const raca = event.target.racaAnimal.value.trim();
  const dataNascimento = event.target.dataNascimentoAnimal.value;

  if (!nome || !raca || !dataNascimento) {
    alert('Preencha todos os campos!');
    return false;
  }

  const novo = {
    id: String(animais.length + 1),
    nome,
    raca,
    data_de_nascimento: dataNascimento,
    createdAt: new Date()
  };

  mostrar(postAnimal(novo));
  fecharModalAnimal();
  atualizarSelects();
  return false;
}

// Modal Deletar Animal
const modalDeletarAnimal = document.getElementById('modalDeletarAnimal');
function abrirModalDeletarAnimal() {
  modalDeletarAnimal.style.display = 'block';
}
function fecharModalDeletarAnimal() {
  modalDeletarAnimal.style.display = 'none';
  document.getElementById('formDeletarAnimal').reset();
}
function enviarDeletarAnimal(event) {
  event.preventDefault();
  const id = event.target.idDeletarAnimal.value.trim();
  if (!id) {
    alert('Informe o ID do animal para deletar!');
    return false;
  }
  const removido = deleteAnimal(id);
  if (!removido) {
    alert('Animal não encontrado!');
    return false;
  }
  mostrar(removido);
  fecharModalDeletarAnimal();
  atualizarSelects();
  return false;
}

// Modal Usuário
const modalUsuario = document.getElementById('modalUsuario');
function abrirModalUsuario() {
  atualizarSelects();
  modalUsuario.style.display = 'block';
}
function fecharModalUsuario() {
  modalUsuario.style.display = 'none';
  document.getElementById('formUsuario').reset();
}
function enviarUsuario(event) {
  event.preventDefault();
  const nome = event.target.nomeUsuario.value.trim();
  const email = event.target.emailUsuario.value.trim();
  const senha = event.target.senhaUsuario.value.trim();
  const animalId = event.target.animalUsuario.value;

  if (!nome || !email || !senha || !animalId) {
    alert('Preencha todos os campos!');
    return false;
  }

  const animal = animais.find(a => a.id === animalId);
  if (!animal) {
    alert('Animal não encontrado!');
    return false;
  }

  const novo = {
    id: String(usuarios.length + 1),
    nome,
    email,
    senha,
    animal,
    createdAt: new Date()
  };

  mostrar(postUsuario(novo));
  fecharModalUsuario();
  atualizarSelects();
  return false;
}

// Modal Doutor
const modalDoutor = document.getElementById('modalDoutor');
function abrirModalDoutor() {
  modalDoutor.style.display = 'block';
}
function fecharModalDoutor() {
  modalDoutor.style.display = 'none';
  document.getElementById('formDoutor').reset();
}
function enviarDoutor(event) {
  event.preventDefault();
  const nome = event.target.nomeDoutor.value.trim();
  const email = event.target.emailDoutor.value.trim();
  const senha = event.target.senhaDoutor.value.trim();

  if (!nome || !email || !senha) {
    alert('Preencha todos os campos!');
    return false;
  }

  const novo = {
    id: String(doutores.length + 1),
    nome,
    email,
    senha,
    createdAt: new Date()
  };

  mostrar(postDoutor(novo));
  fecharModalDoutor();
  return false;
}

// Modal Consulta
const modalConsulta = document.getElementById('modalConsulta');
function abrirModalConsulta() {
  atualizarSelects();
  modalConsulta.style.display = 'block';
}
function fecharModalConsulta() {
  modalConsulta.style.display = 'none';
  document.getElementById('formConsulta').reset();
}
function enviarConsulta(event) {
  event.preventDefault();

  const usuarioId = event.target.usuarioConsulta.value;
  const animalId = event.target.animalConsulta.value;
  const doutorId = event.target.doutorConsulta.value;
  const motivo = event.target.motivoConsulta.value.trim();

  if (!usuarioId || !animalId || !doutorId || !motivo) {
    alert("Preencha todos os campos da consulta!");
    return false;
  }

  const usuario = usuarios.find(u => u.id === usuarioId);
  const animal = animais.find(a => a.id === animalId);
  const doutor = doutores.find(d => d.id === doutorId);

  if (!usuario || !animal || !doutor) {
    alert("Usuário, Animal ou Doutor não encontrado.");
    return false;
  }

  const novaConsulta = {
    id: String(consultas.length + 1),
    usuario,
    animal,
    doutor,
    motivo,
    createdAt: new Date()
  };

  mostrar(postConsulta(novaConsulta));
  fecharModalConsulta();
  return false;
}

// Atualiza selects dos modais
function atualizarSelects() {
  // Atualiza animais
  const selectAnimalUsuario = document.getElementById('animalUsuario');
  const selectUsuarioConsulta = document.getElementById('usuarioConsulta');
  const selectAnimalConsulta = document.getElementById('animalConsulta');
  const selectDoutorConsulta = document.getElementById('doutorConsulta');

  // Limpa selects
  selectAnimalUsuario.innerHTML = '';
  selectUsuarioConsulta.innerHTML = '';
  selectAnimalConsulta.innerHTML = '';
  selectDoutorConsulta.innerHTML = '';

  // Preenche animais para cadastro usuário
  animais.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a.id;
    opt.textContent = `${a.nome} (${a.raca})`;
    selectAnimalUsuario.appendChild(opt);
  });

  // Preenche usuários para consulta
  usuarios.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.id;
    opt.textContent = u.nome;
    selectUsuarioConsulta.appendChild(opt);
  });

  // Quando mudar usuário, atualiza animal da consulta
  selectUsuarioConsulta.onchange = function () {
    const usuarioSelecionado = usuarios.find(u => u.id === this.value);
    selectAnimalConsulta.innerHTML = '';
    if (usuarioSelecionado) {
      const opt = document.createElement('option');
      opt.value = usuarioSelecionado.animal.id;
      opt.textContent = `${usuarioSelecionado.animal.nome} (${usuarioSelecionado.animal.raca})`;
      selectAnimalConsulta.appendChild(opt);
    }
  };

  // Força disparar onchange para preencher na abertura
  if (selectUsuarioConsulta.options.length > 0) {
    selectUsuarioConsulta.value = selectUsuarioConsulta.options[0].value;
    selectUsuarioConsulta.onchange();
  }

  // Preenche doutores para consulta
  doutores.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = d.nome;
    selectDoutorConsulta.appendChild(opt);
  });
}

// Função mostrar para exibir dados no output
function mostrar(dado) {
  const output = document.getElementById("output");

  function formatarData(data) {
    const d = new Date(data);
    return d.toLocaleDateString("pt-BR");
  }

  function exibirUsuario(usuario) {
    return `
      <div>
        <h3>👤 ${usuario.nome}</h3>
        <p>📧 Email: ${usuario.email}</p>
        <p>🐾 Animal: ${usuario.animal?.nome} (${usuario.animal?.raca})</p>
        <p>📅 Cadastrado em: ${formatarData(usuario.createdAt)}</p>
      </div>
    `;
  }

  function exibirAnimal(animal) {
    return `
      <div>
        <h3>🐾 ${animal.nome}</h3>
        <p>📅 Nascimento: ${formatarData(animal.data_de_nascimento)}</p>
        <p>🐱 Raça: ${animal.raca}</p>
        <p>📅 Criado em: ${formatarData(animal.createdAt)}</p>
      </div>
    `;
  }

  function exibirDoutor(doutor) {
    return `
      <div>
        <h3>🩺 ${doutor.nome}</h3>
        <p>📧 Email: ${doutor.email}</p>
        <p>📅 Cadastrado em: ${formatarData(doutor.createdAt)}</p>
      </div>
    `;
  }

  function exibirConsulta(consulta) {
    return `
      <div>
        <h3>📅 Consulta ${consulta.id}</h3>
        <p>👤 Usuário: ${consulta.usuario?.nome}</p>
        <p>🐾 Animal: ${consulta.animal?.nome}</p>
        <p>🩺 Doutor: ${consulta.doutor?.nome}</p>
        <p>📝 Motivo: ${consulta.motivo}</p>
        <p>📅 Criado em: ${formatarData(consulta.createdAt)}</p>
      </div>
    `;
  }

  if (Array.isArray(dado)) {
    output.innerHTML = dado.map(item => {
      if (item.email && item.senha && item.animal) return exibirUsuario(item);
      if (item.raca && item.nome) return exibirAnimal(item);
      if (item.email && item.senha && !item.animal) return exibirDoutor(item);
      if (item.motivo) return exibirConsulta(item);
      return "<p>❓ Tipo desconhecido</p>";
    }).join("");
  } else {
    if (dado.email && dado.senha && dado.animal) {
      output.innerHTML = exibirUsuario(dado);
    } else if (dado.raca && dado.nome) {
      output.innerHTML = exibirAnimal(dado);
    } else if (dado.email && dado.senha && !dado.animal) {
      output.innerHTML = exibirDoutor(dado);
    } else if (dado.motivo) {
      output.innerHTML = exibirConsulta(dado);
    } else {
      output.innerHTML = "<p>❓ Tipo de dado não reconhecido</p>";
    }
  }
}

// Fecha modais clicando fora do conteúdo
window.onclick = function(event) {
  if (event.target === modalAnimal) fecharModalAnimal();
  if (event.target === modalDeletarAnimal) fecharModalDeletarAnimal();
  if (event.target === modalUsuario) fecharModalUsuario();
  if (event.target === modalDoutor) fecharModalDoutor();
  if (event.target === modalConsulta) fecharModalConsulta();
}

// Inicializa selects na carga da página
window.onload = atualizarSelects;
