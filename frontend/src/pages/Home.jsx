// src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import TodoPreview from "../components/TodoPreview";
import Notification from "../components/Notification";
import socket from "../socket";
import "../components/Home.css";

export default function Home() {
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
      const res = await fetch("http://127.0.0.1:5000/api/todos");
      if (!res.ok) throw new Error("Failed to fetch todos");
      const data = await res.json();
      setTodos(data.map((t, i) => ({ ...t, animation: "stable", delay: i * 0.1 })));
    } catch {
      showNotification("error", "Failed to load todos");
    }
  };

  useEffect(() => {
    fetchTodos();

    // Listen to live updates
    socket.on("todos_updated", (updatedTodos) => {
      setTodos(updatedTodos.map((t, i) => ({ ...t, animation: "stable", delay: i * 0.1 })));
    });

    // Clean up listener
    return () => socket.off("todos_updated");
  }, []);

  const sendRequest = async (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:5000${requestData.endpoint}`;
    const options = {
      method: requestData.method,
      headers: { "Content-Type": "application/json" },
    };

    if (requestData.method !== "GET" && requestData.body) {
      try {
        options.body = JSON.stringify(JSON.parse(requestData.body));
      } catch {
        setResponse("Error: Invalid JSON body");
        showNotification("error", "Invalid JSON body");
        return;
      }
    }

    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
      showNotification("success", `Request ${requestData.method} successful`);
    } catch {
      setResponse("Error: Failed to fetch");
      showNotification("error", `Request ${requestData.method} failed`);
    }
  };

  return (
    <div className="home-container">
      <h1>Live API & Todo Dashboard</h1>

      {notification && <Notification type={notification.type} message={notification.message} />}

      <div className="dashboard">
        <div className="left-panel">
          <TodoPreview
            todos={todos}
            fetchTodos={fetchTodos}
            showNotification={showNotification}
          />
        </div>

        <div className="right-panel">
          <form className="request-form" onSubmit={sendRequest}>
            <label>
              HTTP Method:
              <select
                value={requestData.method}
                onChange={(e) => setRequestData({ ...requestData, method: e.target.value })}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PATCH</option>
                <option>DELETE</option>
              </select>
            </label>

            <label>
              Endpoint:
              <input
                type="text"
                value={requestData.endpoint}
                onChange={(e) => setRequestData({ ...requestData, endpoint: e.target.value })}
              />
            </label>

            {(requestData.method === "POST" || requestData.method === "PATCH") && (
              <label>
                JSON Body:
                <textarea
                  value={requestData.body}
                  onChange={(e) => setRequestData({ ...requestData, body: e.target.value })}
                  placeholder='{"text": "New todo"}'
                />
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
  );
}
