from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # enable CORS for frontend

todos = []  # in-memory store

@app.route("/api/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/api/todos", methods=["POST"])
def add_todo():
    data = request.get_json()
    if "text" in data:
        todo = {"text": data["text"], "done": False, "id": len(todos)}
        todos.append(todo)
        return jsonify(todo), 201
    return jsonify({"error": "Missing text"}), 400

@app.route("/api/todos/<int:todo_id>", methods=["PATCH"])
def toggle_todo(todo_id):
    for todo in todos:
        if todo["id"] == todo_id:
            todo["done"] = not todo["done"]
            return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404

@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    todos = [t for t in todos if t["id"] != todo_id]
    return jsonify({"message": "Deleted"})
