// src/pages/about.jsx

import React from "react";
import TodoPreview from "../components/TodoPreview";

const mockTodos = [
  { id: 1, text: "Sample todo", done: false, animation: "stable"},
  { id: 2, text: "Completed task", done: true, animation: "stable" },
];

export default function About() {
  return (
    <div className="page-content">
      <h1 className="staggered">About Pulse Board</h1>
      <p className="staggered">
        Pulse Board is an interactive API testing and Todo dashboard. Add, update, or
        complete tasks and watch live updates happen instantly.
      </p>
      <p className="staggered">
        Built with a Flask backend, React frontend, and live WebSocket updates, it demonstrates
        real-time full-stack functionality.
      </p>
      <p className="staggered">
        Use this page to explore the app’s core features and interact with a sample todo list.
      </p>

      {/* Embed live TodoPreview component */}
      <div className="todo-demo-section">
        <h2 className="staggered">Try a Sample Todo</h2>
        <TodoPreview todos={mockTodos} />
      </div>
    </div>
  );
}