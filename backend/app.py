from flask import Flask, jsonify, request, send_from_directory, abort, make_response
from flask_cors import CORS
from typing import List, Dict, Any
from flasgger import Swagger
import os

# Serve the frontend build
app = Flask(__name__, static_folder="../frontend/dist", static_url_path="")
Swagger(app)
CORS(app)  # Allow frontend dev server to call API

# In-memory tasks
tasks: List[Dict[str, Any]] = [
    {"id": 1, "title": "Buy groceries", "description": "Milk, Cheese, Pizza", "done": False},
    {"id": 2, "title": "Learn Python", "description": "Follow a Python tutorial", "done": False}
]

# --- API routes ---

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    """
    Get all tasks
    ---
    responses:
      200:
        description: List of tasks
    """
    return jsonify(tasks)

@app.route("/api/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    if not data or "title" not in data:
        abort(400, description="Title is required")
    new_task = {
        "id": tasks[-1]["id"] + 1 if tasks else 1,
        "title": data["title"],
        "description": data.get("description", ""),
        "done": False
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route("/api/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id: int):
    task = next((t for t in tasks if t["id"] == task_id), None)
    if not task:
        abort(404, description="Task not found")
    data = request.get_json()
    task.update({
        "title": data.get("title", task["title"]),
        "description": data.get("description", task["description"]),
        "done": data.get("done", task["done"])
    })
    return jsonify(task)

@app.route("/api/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id: int):
    global tasks
    task = next((t for t in tasks if t["id"] == task_id), None)
    if not task:
        abort(404, description="Task not found")
    tasks = [t for t in tasks if t["id"] != task_id]
    return jsonify({"result": True})

# --- Serve React frontend for production ---
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

# --- Error handlers ---
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({"error": getattr(error, "description", "Not found")}), 404)

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({"error": getattr(error, "description", "Bad request")}), 400)

if __name__ == "__main__":
    app.run(debug=True)
