// Funções puras para manipular a lista de todos — sem efeitos colaterais.
// Isso facilita testes caixa-branca e unidade.


// Validação: campos obrigatórios -> borda: texto vazio / categoria vazia
export function addTodo(todos, { text, category }, idGenerator) {
  if (!text || !category) return todos;

  // Gera id (injetável para testes)
  const id = idGenerator ? idGenerator() : Math.floor(Math.random() * 10000);

  // Evita duplicar IDs já existentes (nunca sobrescreve)
  if (todos.some((t) => t.id === id)) {
    // Se houver colisão, gera um novo id simples incrementando o maior id atual + 1
    const maxId = todos.reduce((m, t) => (t.id > m ? t.id : m), 0);
    return [...todos, { id: maxId + 1, text, category, isCompleted: false }];
  }

  return [...todos, { id, text, category, isCompleted: false }];
}

// Remove pela id; se id não existir => retorna array sem alterar (borda)
export function removeTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}

// Marca/desmarca isCompleted; se id não existir => retorna sem alteração (borda)
export function completeTodo(todos, id) {
  return todos.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
}

// Filtra por status
export function filterAndSortTodos(todos, { filter = "All", search = "", sort = "Asc" } = {}) {
  const afterFilter = todos.filter((t) =>
    filter === "All" ? true : filter === "Completed" ? t.isCompleted : !t.isCompleted
  );

  // Filtra por busca (case-insensitive)
  const afterSearch = afterFilter.filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  // Ordena
  const sorted = afterSearch.sort((a, b) => (sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)));

  return sorted;
}

/*
Justificativa (refatoração):

Separar lógica facilita inspeção de caminhos internos (caixa-branca) e 
permite testar casos de borda (texto vazio, id inexistente, colisões).

idGenerator injetável permite controlar ids durante testes (determinismo).

Funções são puras (recebem array e retorno novo array), sem localStorage 
ou DOM — ideal para unit tests.
*/