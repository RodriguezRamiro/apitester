// src/components/RequestForm.jsx

import React, { useState } from "react";

export default function RequestForm({ setResponse }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = endpoint.startsWith("http")
        ? endpoint
        : `${BACKEND_URL}${endpoint}`;

      const options = { method };

      if (method !== "GET" && body) {
        options.headers = { "Content-Type": "application/json" };
        try {
          options.body = JSON.stringify(JSON.parse(body)); // validate JSON
        } catch (err) {
          return setResponse({ error: "Invalid JSON body" });
        }
      }

      const res = await fetch(url, options);

      let data;
      try {
        data = await res.json();
      } catch {
        data = await res.text(); // fallback if not JSON
      }

      setResponse({ data, status: res.status });
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <input
        type="text"
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option>GET</option>
        <option>POST</option>
        <option>PATCH</option>
        <option>DELETE</option>
      </select>
      {method !== "GET" && (
        <textarea
          placeholder="Request body (JSON)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}
      <button type="submit">Send</button>
    </form>
  );
}