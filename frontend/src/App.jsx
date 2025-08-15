import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://127.0.0.1:5000/api/tasks"
    : "/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get(API_URL);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTitle) return;
    await axios.post(API_URL, { title: newTitle, description: newDescription });
    setNewTitle("");
    setNewDescription("");
    fetchTasks();
  };

  const toggleDone = async (id, done) => {
    await axios.put(`${API_URL}/${id}`, { done: !done });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
        Task Manager
      </h1>

      {/* Task Form */}
      <form
        onSubmit={addTask}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl mb-6"
      >
        <input
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <textarea
          className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Task description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-600 transition-colors w-full">
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="w-full max-w-xl space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex justify-between items-center p-4 bg-white rounded-xl shadow-sm transition-opacity ${
              task.done ? "opacity-50" : "opacity-100"
            }`}
          >
            <div>
              <h2
                className={`text-lg font-semibold ${
                  task.done ? "line-through text-gray-400" : "text-gray-800"
                }`}
              >
                {task.title}
              </h2>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleDone(task.id, task.done)}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                {task.done ? "Undo" : "Done"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
