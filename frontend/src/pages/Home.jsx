// src/pages/Home.jsx

// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import TodoPreview from "../components/TodoPreview";
import Notification from "../components/Notification";
import socket from "../socket";
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

  // Base URL
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


  // Notification helper
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch todos from backend

  const getTodos = async () => {
    const res = await fetch(`${BASE_URL}/api/todos`, { headers: { "Content-Type": "application/json" } });
    return await res.json();
  };

  const addTodo = async (text) => {
    const res = await fetch(`${BASE_URL}/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    return await res.json();
  };

  const updateTodo = async (id, updates) => {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return await res.json();
  };


  const deleteTodo = async (id) => {
    const res = await fetch(`${BASE_URL}/api/todos/${id}`, { method: "DELETE" });
    return await res.json();
  };


  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data.map((t, i) => ({ ...t, animation: "stable", delay: i * 0.1 })));
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      showNotification("error", "Failed to load todos");
    }
  };

  // Socket.io initialization & live updates
  useEffect(() => {
    fetchTodos(); // initial load

    socket.on("init", (initTodos) => {
      setTodos(initTodos.map((t, i) => ({ ...t, animation: "stable", delay: i * 0.1 })));
    });

    socket.on("todos_updated", (updatedTodos) => {
      setTodos(updatedTodos.map((t, i) => ({ ...t, animation: "stable", delay: i * 0.1 })));
    });

    return () => {
      socket.off("init");
      socket.off("todos_updated");
    };
  }, []);

  // API tester playground
  const sendRequest = async (e) => {
    e.preventDefault();

    const url = `${BASE_URL}${requestData.endpoint}`;

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
      const data = contentType?.includes("application/json") ? await res.json() : await res.text();

      setResponse(JSON.stringify(data, null, 2));
      fetchTodos(); // Refresh dashboard todos

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
      {notification && (
      <Notification type={notification.type} message={notification.message} /> )}
      <div className="page-content-wrapper page-visible">
        <div className="page-content">
          <h1>Live API & Todo Dashboard</h1>
          {loading && <p>Loading backend message: {message}</p>}
          <div className="dashboard">
            <div className="left-panel">
              <TodoPreview
                todos={todos}
                fetchTodos={fetchTodos}
                showNotification={showNotification}
                addTodo={addTodo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            </div>
            <div className="right-panel">
              <form className="request-form" onSubmit={sendRequest}>
                <label>
                  HTTP Method:
                  <select
                    value={requestData.method}
                    onChange={(e) =>
                      setRequestData({ ...requestData, method: e.target.value })
                    }
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
                    onChange={(e) =>
                      setRequestData({ ...requestData, endpoint: e.target.value })
                    }
                  />
                </label>
                {["POST", "PATCH"].includes(requestData.method) && (
                  <label>
                    JSON Body:
                    <textarea
                      value={requestData.body}
                      onChange={(e) =>
                        setRequestData({ ...requestData, body: e.target.value })
                      }
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
      </div>
    </div>
  );
}
