//src/components/TodoPreview.jsx

import React, { useState, useEffect } from "react";
import "./TodoPreview.css";

export default function TodoPreview({ todos, fetchTodos, showNotification }) {
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filter, setFilter] = useState("All");
  const [feedback, setFeedback] = useState(null); // local animated feedback

  const showLocalFeedback = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 2000); // fade after 2s
  };

  const addTodo = async () => {
    if (!input.trim()) return showLocalFeedback("error", "Cannot add empty todo");
    try {
      const res = await fetch("http://127.0.0.1:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      if (!res.ok) throw new Error();
      setInput("");
      showLocalFeedback("success", "Todo added!");
      showNotification("success", "Todo added successfully");
      fetchTodos();
    } catch {
      showLocalFeedback("error", "Failed to add todo");
      showNotification("error", "Failed to add todo");
    }
  };

  const toggleDone = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/todos/${id}`, { method: "PATCH" });
      showLocalFeedback("success", "Todo updated!");
      showNotification("success", "Todo updated successfully");
      fetchTodos();
    } catch {
      showLocalFeedback("error", "Failed to update");
      showNotification("error", "Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://127.0.0.1:5000/api/todos/${id}`, { method: "DELETE" });
      showLocalFeedback("success", "Todo deleted!");
      showNotification("success", "Todo deleted successfully");
      fetchTodos();
    } catch {
      showLocalFeedback("error", "Failed to delete");
      showNotification("error", "Failed to delete todo");
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = async (id) => {
    if (!editingText.trim()) return showLocalFeedback("error", "Todo cannot be empty");
    try {
      await fetch(`http://127.0.0.1:5000/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: editingText }),
      });
      setEditingId(null);
      setEditingText("");
      showLocalFeedback("success", "Todo updated!");
      showNotification("success", "Todo updated successfully");
      fetchTodos();
    } catch {
      showLocalFeedback("error", "Failed to update");
      showNotification("error", "Failed to update todo");
    }
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "All") return true;
    if (filter === "Completed") return t.done;
    if (filter === "Pending") return !t.done;
    return true;
  });

  return (
    <div className="todo-preview">
      <h2>Todo Dashboard</h2>

      {feedback && <div className={`feedback ${feedback.type}`}>{feedback.message}</div>}

      <div className="input-container">
        <input
          type="text"
          value={input}
          placeholder="Add a task..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="filter-buttons">
        {["All", "Completed", "Pending"].map((f) => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id} className={`${todo.done ? "done" : ""} ${todo.animation}`}>
            {editingId === todo.id ? (
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onBlur={() => saveEdit(todo.id)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(todo.id)}
                autoFocus
              />
            ) : (
              <span
                onClick={() => toggleDone(todo.id)}
                onDoubleClick={() => startEditing(todo.id, todo.text)}
              >
                {todo.text}
              </span>
            )}
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
