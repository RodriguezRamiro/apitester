//src/pages/about.jsx

import React from "react";
import TodoPreview from "../components/TodoPreview";

export default function About() {
  return (
    <div className="page-content">
      <h1 className="staggered">About This API Tester</h1>
      <p className="staggered">
        This page is a simple API testing tool. You can interact with backend endpoints,
        send requests, and see responses in real-time. It started as a small Todo List
        tester, but now serves as a playground for experimenting with APIs and practicing
        React + Flask integration.
      </p>
      <p className="staggered">
        Use it to try out GET, POST, PATCH, and DELETE requests, or to preview JSON responses
        from your backend. This helps you quickly validate endpoints while developing.
      </p>

      {/* Embed live TodoPreview component */}
      <TodoPreview />
    </div>
  );
}
