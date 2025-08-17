// src/pages/about.jsx

import React from "react";
import TodoPreview from "../components/TodoPreview";

export default function About() {
  return (
    <div className="page-content">
      <h1 className="staggered">About Pulse Board</h1>
      <p className="staggered">
        Pulse Board is an interactive API testing and Todo dashboard. It allows you to
        manage todos, send GET, POST, PATCH, and DELETE requests, and see responses
        in real-time.
      </p>
      <p className="staggered">
        This project showcases full-stack capabilities with a Flask backend, React frontend,
        and live WebSocket updates for a polished, real-time user experience.
      </p>
      <p className="staggered">
        Use it to experiment with API endpoints, test data workflows, or simply explore
        modern frontend-backend integration in action.
      </p>

      {/* Embed live TodoPreview component */}
      <TodoPreview />
    </div>
  );
}
