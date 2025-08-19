// src/api.js

import axios from "axios";
import { BACKEND_URL } from "./config";

const api = axios.create({
  baseURL: BACKEND_URL,
  headers: { "Content-Type": "application/json" },
});

// Todo endpoints
export const getTodos = async () => {
  const res = await api.get("/api/todos");
  return res.data;
};

export const addTodo = async (text) => {
  const res = await api.post("/api/todos", { text });
  return res.data;
};

export const updateTodo = async (id, updates) => {
  const res = await api.patch(`/api/todos/${id}`, updates);
  return res.data;
};

export const deleteTodo = async (id) => {
  const res = await api.delete(`/api/todos/${id}`);
  return res.data;
};

export default api;
