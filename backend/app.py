# ./backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # enable WebSocket

todos = []

# --- API Routes ---
@app.route("/api/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/api/todos", methods=["POST"])
def add_todo():
    data = request.get_json()
    if "text" in data:
        todo = {"text": data["text"], "done": False, "id": len(todos)}
        todos.append(todo)
        socketio.emit("todos_updated", todos)  # notify all clients
        return jsonify(todo), 201
    return jsonify({"error": "Missing text"}), 400

@app.route("/api/todos/<int:todo_id>", methods=["PATCH"])
def toggle_todo(todo_id):
    for todo in todos:
        if todo["id"] == todo_id:
            todo["done"] = not todo["done"]
            socketio.emit("todos_updated", todos)
            return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404

@app.route("/api/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    global todos
    todos = [t for t in todos if t["id"] != todo_id]
    socketio.emit("todos_updated", todos)
    return jsonify({"message": "Deleted"})

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
