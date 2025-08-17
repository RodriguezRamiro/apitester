// src/components/ResponseViewer.jsx

import React from "react";

export default function ResponseViewer({ response }) {
  return (
    <div className="response-viewer">
      <h3>Response</h3>
      <pre>{response ? JSON.stringify(response, null, 2) : "No response yet"}</pre>
    </div>
  );
}
