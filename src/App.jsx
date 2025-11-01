// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import ToDo from "./components/ToDo";
import ToDoForm from "./components/ToDoForm";
import Search from "./components/Search";
import Filter from "./components/Filter";

// Mudança: importação de funções de serviço para lógica de todo
import {
  addTodo as addTodoService,
  removeTodo as removeTodoService,
  completeTodo as completeTodoService,
  filterAndSortTodos,
} from "./utils/todoService";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, text: "Estudar React", category: "Trabalho", isCompleted: false },
          { id: 2, text: "Fazer trabalho de Malu", category: "Universidade", isCompleted: false },
          { id: 3, text: "Estudar Computação Natural", category: "Universidade", isCompleted: false },
        ];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [theme, setTheme] = useState("day");

  useEffect(() => {
    document.body.className = theme; // Mantido igual: troca de tema
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // Mantido igual: salva no localStorage
  }, [todos]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "day" ? "night" : "day")); // Mantido igual
  };

  // Refatorado: lógica de addTodo movida para addTodoService
  const addTodo = (text, category) => {
    const newTodos = addTodoService(todos, { text, category }, () => Math.floor(Math.random() * 10000));
    setTodos(newTodos);
  };

  // Refatorado: lógica de remover todo movida para removeTodoService
  const removeToDo = (id) => {
    setTodos(removeTodoService(todos, id));
  };

  // Refatorado: lógica de completar todo movida para completeTodoService
  const completeToDo = (id) => {
    setTodos(completeTodoService(todos, id));
  };

  // Fundo com estrelas: mantido igual
  const stars = Array.from({ length: 100 }, (_, i) => {
    const size = Math.random() * 3 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const twinkleDuration = Math.random() * 3 + 2;
    const floatDuration = Math.random() * 20 + 10;
    return (
      <div
        key={i}
        className="star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}vh`,
          left: `${left}vw`,
          animationDuration: `${twinkleDuration}s, ${floatDuration}s`,
        }}
      ></div>
    );
  });

  // Nuvens: mantido igual
  const clouds =
    theme === "day"
      ? Array.from({ length: 10 }, (_, i) => {
          const size = Math.random() * 100 + 50;
          const top = Math.random() * 60;
          const left = Math.random() * 100;
          const duration = Math.random() * 30 + 20;
          return (
            <div
              key={i}
              className="cloud"
              style={{
                width: `${size}px`,
                height: `${size / 2}px`,
                top: `${top}vh`,
                left: `${left}vw`,
                animationDuration: `${duration}s`,
              }}
            ></div>
          );
        })
      : null;

  return (
    <>
      <div className="stars">
        {theme === "night" && stars}
        {theme === "night" && (
          <div
            className="shooting-star"
            style={{
              top: `${Math.random() * 50}vh`,
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 5 + 10}s`,
            }}
          ></div>
        )}
        {clouds}
      </div>

      <div className="app">
        <div className="title-container">
          <h1>To Do List</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "day" ? "🌞" : "🌚"}
          </button>
        </div>

        <Search search={search} setSearch={setSearch} />
        <Filter filter={filter} setFilter={setFilter} setSort={setSort} />

        <div className="todo-list">
          {/* Refatorado: filtro e ordenação movidos para filterAndSortTodos */}
          {filterAndSortTodos(todos, { filter, search, sort }).map((todo) => (
            <ToDo key={todo.id} todo={todo} removeToDo={removeToDo} completeToDo={completeToDo} />
          ))}
        </div>

        <ToDoForm addTodo={addTodo} />
      </div>

      <div className="creditos">
        <b>
          <a href="https://github.com/devrafaela" target="_blank" rel="noopener noreferrer">
            Rafaela Pereira Santos
          </a>
        </b>{" "}
        e{" "}
        <b>
          <a href="https://github.com/camillerodriguees" target="_blank" rel="noopener noreferrer">
            Camille Rodrigues Costa
          </a>
        </b>{" "}
        • baseado no tutorial de 'Matheus Battisti – Hora de Codar'
      </div>

    </>
  );
}

export default App;
