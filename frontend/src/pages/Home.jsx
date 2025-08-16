//src/pages/home.jsx

import React from "react";

export default function Home({ message }) {
  return (
    <div className="page-content">
      <h1>{message || "Loading..."}</h1>
      <p>Welcome to your React + Vite + Flask app!</p>
    </div>
  );
}