// Teste de integração: simula um fluxo completo do app (add -> complete -> filter -> remove)
import { 
  addTodo, 
  completeTodo, 
  filterAndSortTodos, 
  removeTodo 
} from "../utils/todoService.js";

test("integração: add -> complete -> filter -> remove", () => {
  // Estado inicial: uma tarefa simples
  let todos = [
    { id: 1, text: "Alpha", category: "G", isCompleted: false }
  ];




  // ---------------------------------------------
  // 1) Adicionar duas tarefas (caminho comum)
  // ---------------------------------------------
  let idCounter = 100;               // gerador de ID controlado para determinismo
  const idGen = () => ++idCounter;
  todos = addTodo(todos, { text: "Bravo", category: "G" }, idGen);   // id 101
  todos = addTodo(todos, { text: "Charlie", category: "G" }, idGen); // id 102

  // Verifica se o array possui 3 tarefas (1 inicial + 2 adicionadas)
  expect(todos).toHaveLength(3);
  // Comentário: teste caminho feliz (valores comuns), valida a função addTodo




  // --------------------------------------------------------
  // 2) Marcar como completa a primeira adicionada (id 101)
  // --------------------------------------------------------
  todos = completeTodo(todos, 101);
  const completed = todos.find((t) => t.id === 101);

  // Verifica se isCompleted foi alterado para true
  expect(completed.isCompleted).toBe(true);
  // Comentário: caminho comum, valida toggle do status de uma tarefa existente




  // --------------------------------------
  // 3) Filtrar apenas tarefas completas
  // --------------------------------------
  const filtered = filterAndSortTodos(todos, { filter: "Completed", search: "", sort: "Asc" });

  // Deve retornar apenas 1 tarefa (a completa)
  expect(filtered).toHaveLength(1);
  expect(filtered[0].id).toBe(101);
  // Comentário: integração entre add + complete + filter; verifica comportamento correto combinado





  // ----------------------------
  // 4) Remover a tarefa completa
  // ----------------------------
  todos = removeTodo(todos, 101);
  const afterRemoveFiltered = filterAndSortTodos(todos, { filter: "Completed", search: "", sort: "Asc" });

  // Verifica se não existem mais tarefas completas
  expect(afterRemoveFiltered).toHaveLength(0);
  // Comentário: integração final, valida remove e filtro juntos
});



/*
Justificativa geral do teste de integração:

- Verifica se as funções puras combinadas se comportam corretamente em um fluxo real do app:
  adicionar -> completar -> filtrar -> remover.
- Testa interações entre unidades (addTodo, completeTodo, filterAndSortTodos, removeTodo).
- Inclui valores comuns (tarefas válidas) e borda (nenhuma tarefa retornada após remoção).
- Ajuda a garantir que a lógica do app seja consistente quando as funções são encadeadas.
*/
