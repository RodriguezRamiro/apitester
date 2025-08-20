// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import TodoPreview from "../components/TodoPreview";
import Notification from "../components/Notification";
import socket from "../socket";
import { getTodos } from "../api";
import { BACKEND_URL } from "../config.js";
import "../components/Home.css";

export default function Home({ message, loading }) {
  const [response, setResponse] = useState("");
  const [requestData, setRequestData] = useState({
    method: "GET",
    endpoint: "/api/todos",
    body: "",
  });
  const [todos, setTodos] = useState([]);
  const [notification, setNotification] = useState(null);

  // Notification helper
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch todos once on mount
  const fetchTodos = async () => {
    try {
      const data = await getTodos();   // 👈 call api.js
      setTodos(data.map((t, i) => ({ ...t, animation: "stable", delay: i * 0.1 })));
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      showNotification("error", "Failed to load todos");
    }
  };

  useEffect(() => {
    fetchTodos();

    // Live updates with sockets
    socket.on("todos_updated", (updatedTodos) => {
      setTodos(updatedTodos.map((t, i) => ({ ...t, animation: "stable", delay: i * 0.1 })));
    });
    return () => socket.off("todos_updated");
  }, []);

  // API tester playground - raw fetch
  const sendRequest = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_BACKEND_URL}${requestData.endpoint}`;
    const options = {
      method: requestData.method,
      headers: { "Content-Type": "application/json" },
    };

    if (["POST", "PATCH"].includes(requestData.method)) {
      if (requestData.body.trim()) {
        try {
          options.body = JSON.stringify(JSON.parse(requestData.body));
        } catch {
          setResponse("Error: Invalid JSON body");
          showNotification("error", "Invalid JSON body");
          return;
        }
      } else {
        options.body = JSON.stringify({});
      }
    }

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response: expected JSON");
      }

      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));

      // Animate response viewer
      const viewer = document.querySelector(".response-viewer");
      if (viewer) {
        viewer.classList.remove("visible");
        void viewer.offsetWidth;
        viewer.classList.add("visible");
      }

      showNotification("success", `Request ${requestData.method} successful`);
    } catch (err) {
      console.error("Request error:", err);
      setResponse(`Error: ${err.message}`);
      showNotification("error", `Request ${requestData.method} failed`);
    }
  };

  return (
    <div className="home-container">
      {notification && <Notification type={notification.type} message={notification.message} />}
      <div className="page-content-wrapper page-visible">
        <div className="page-content">
          <h1>Live API & Todo Dashboard</h1>
          {loading && <p>Loading backend message: {message}</p>}
          <div className="dashboard">
            <div className="left-panel">
              <TodoPreview todos={todos} fetchTodos={fetchTodos} showNotification={showNotification} />
            </div>
            <div className="right-panel">
              <form className="request-form" onSubmit={sendRequest}>
                <label>
                  HTTP Method:
                  <select value={requestData.method} onChange={(e) =>
                    setRequestData({ ...requestData, method: e.target.value })}>
                    <option>GET</option>
                    <option>POST</option>
                    <option>PATCH</option>
                    <option>DELETE</option>
                  </select>
                </label>
                <label>
                  Endpoint:
                  <input type="text" value={requestData.endpoint} onChange={(e) =>
                    setRequestData({ ...requestData, endpoint: e.target.value })} />
                </label>
                {["POST", "PATCH"].includes(requestData.method) && (
                  <label>
                    JSON Body:
                    <textarea value={requestData.body} onChange={(e) =>
                      setRequestData({ ...requestData, body: e.target.value })}
                      placeholder='{"text": "New todo"}' />
                  </label>
                )}
                <button type="submit">Send Request</button>
              </form>
              <div className="response-viewer">
                <pre>{response}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
