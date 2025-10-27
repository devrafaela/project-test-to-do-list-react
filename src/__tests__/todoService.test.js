import { 
  addTodo, 
  removeTodo, 
  completeTodo, 
  filterAndSortTodos 
} from "../utils/todoService.js";

describe("todoService - unit tests", () => {

  // Base de dados para os testes
  const baseTodos = [
    { id: 1, text: "Alpha", category: "Gen", isCompleted: false },
    { id: 2, text: "Bravo", category: "Gen", isCompleted: true },
    { id: 3, text: "charlie", category: "Gen", isCompleted: false },
  ];



  
  // ----------------------------
  // Testes da função addTodo
  // ----------------------------

  test("addTodo adiciona item quando texto e categoria válidos (caso comum)", () => {
    // Id generator para controle determinístico
    const idGen = () => 10;
    const result = addTodo(baseTodos, { text: "Delta", category: "Gen" }, idGen);

    // Verifica se o array aumentou 1 item
    expect(result).toHaveLength(baseTodos.length + 1);

    // Verifica se o item correto foi adicionado
    expect(result.some((t) => t.text === "Delta" && t.id === 10)).toBe(true);
    // Comentário: caso comum (caminho feliz), valor válido
  });

  test("addTodo ignora quando texto vazio (borda)", () => {
    const idGen = () => 11;
    const result = addTodo(baseTodos, { text: "", category: "Gen" }, idGen);

    // Array não deve ser alterado
    expect(result).toHaveLength(baseTodos.length);
    // Comentário: valor de borda, evita criar tarefa sem título
  });

  test("addTodo ignora quando categoria vazia (borda)", () => {
    const idGen = () => 12;
    const result = addTodo(baseTodos, { text: "Echo", category: "" }, idGen);

    expect(result).toHaveLength(baseTodos.length);
    // Comentário: valor de borda, evita criar tarefa sem categoria
  });




  // ----------------------------
  // Testes da função removeTodo
  // ----------------------------

  test("removeTodo remove corretamente (caso comum)", () => {
    const result = removeTodo(baseTodos, 2);

    // O item removido não deve existir
    expect(result.find((t) => t.id === 2)).toBeUndefined();
    // O tamanho do array deve diminuir
    expect(result).toHaveLength(2);
    // Comentário: caminho feliz, valor comum
  });

  test("removeTodo com id inexistente não altera (borda)", () => {
    const result = removeTodo(baseTodos, 999);

    // O array permanece igual
    expect(result).toHaveLength(3);
    // Comentário: valor de borda, garante que não crasha se ID não encontrado
  });




  // ----------------------------
  // Testes da função completeTodo
  // ----------------------------

  test("completeTodo alterna isCompleted (caso comum)", () => {
    const result = completeTodo(baseTodos, 1);
    const changed = result.find((t) => t.id === 1);

    // Verifica se o toggle ocorreu
    expect(changed.isCompleted).toBe(true);
    // Comentário: caminho feliz, alterna status da tarefa
  });

  test("completeTodo com id inexistente não altera (borda)", () => {
    const result = completeTodo(baseTodos, 9999);

    // Array não deve mudar
    expect(result).toEqual(baseTodos);
    // Comentário: valor de borda, garante robustez
  });




  // ----------------------------
  // Testes da função filterAndSortTodos
  // ----------------------------

  test("filterAndSortTodos filtra por Completed e ordena Desc (caso comum)", () => {
    const filtered = filterAndSortTodos(baseTodos, { filter: "Completed", search: "", sort: "Desc" });

    // Deve retornar apenas os completos
    expect(filtered).toHaveLength(1);
    expect(filtered[0].isCompleted).toBe(true);
    // Comentário: caminho funcional, teste do comportamento esperado
  });

  test("filterAndSortTodos busca case-insensitive (borda/caracteres)", () => {
    const filtered = filterAndSortTodos(baseTodos, { filter: "All", search: "CHAR", sort: "Asc" });

    // Deve encontrar 'charlie' mesmo com maiúsculas
    expect(filtered.some((t) => t.text === "charlie")).toBe(true);
    // Comentário: valor de borda, busca insensível a maiúsculas/minúsculas
  });
});

/*
Justificativas (cada teste):

addTodo adiciona item — garante que adiciona quando campos válidos (caminho feliz). Valor comum.

addTodo ignora texto vazio — borda: validação. Evita tarefas sem título.

addTodo ignora categoria vazia — borda: validação de categoria.

removeTodo remove corretamente — caminho feliz.

removeTodo com id inexistente — borda: não crashar se id não encontrado.

completeTodo alterna — garante toggle.

completeTodo com id inexistente — borda: não crashar.

filterAndSortTodos filtra por Completed — caminho funcional de filtro + ordenação.

filterAndSortTodos busca case-insensitive — borda: tratamento de caixa (case).



*/