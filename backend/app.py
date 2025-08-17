# ./backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
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
def update_todo(todo_id):
    """Update text OR toggle done on a todo."""
    data = request.get_json(silent=True) or {}
    for todo in todos:
        if todo["id"] == todo_id:
            # If "text" provided, update text
            if "text" in data:
                todo["text"] = data["text"]
            # If "done" provided, update explicitly
            elif "done" in data:
                todo["done"] = bool(data["done"])
            # If neither, fallback toggle
            else:
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

# --- Socket.IO ---
@socketio.on("connect")
def handle_connect():
    emit("todos_updated", todos)

if __name__ == "__main__":
    socketio.run(app, debug=True, host="0.0.0.0", port=5000)
