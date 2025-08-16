import React, { useState, useEffect } from "react";
import "./TodoPreview.css";

export default function TodoPreview() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/todos")
      .then((res) => res.json())
      .then(setTodos);
  }, []);

  const addTodo = () => {
    if (!input.trim()) return;
    fetch("http://127.0.0.1:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    })
      .then((res) => res.json())
      .then((newTodo) => setTodos([...todos, newTodo]));
    setInput("");
  };

  const toggleDone = (id) => {
    fetch(`http://127.0.0.1:5000/api/todos/${id}`, { method: "PATCH" })
      .then((res) => res.json())
      .then((updatedTodo) =>
        setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)))
      );
  };

  const deleteTodo = (id) => {
    fetch(`http://127.0.0.1:5000/api/todos/${id}`, { method: "DELETE" }).then(
      () => setTodos(todos.filter((t) => t.id !== id))
    );
  };

  return (
    <div className="todo-preview">
      <h2>Quick Todo Preview</h2>
      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="Add a task..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.done ? "done" : ""}>
            <span onClick={() => toggleDone(todo.id)}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
