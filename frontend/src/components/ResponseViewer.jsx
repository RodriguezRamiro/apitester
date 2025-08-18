// src/components/ResponseViewer.jsx

import React from "react";
import "./ResponseViewer.css";


export default function ResponseViewer({ response }) {
  if (!response) {
    return (
      <div className="response-viewer">
        <h3>Response</h3>
        <pre>No response yet</pre>
      </div>
    );
  }

  const { data, status, error } = response;

  return (
    <div className="response-viewer">
      <h3>Response</h3>
      {error ? (
        <div className="response-error">
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <>
          {status && (
            <div className="response-status">
              <strong>Status:</strong> {status}
            </div>
          )}
          <pre className="response-json">
            {typeof data === "object" ? JSON.stringify(data, null, 2) : data}
          </pre>
        </>
      )}
    </div>
  );
}
