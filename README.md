# API Tester & Todo Dashboard

A full-stack interactive dashboard that allows you to test API endpoints live while managing a dynamic todo list. Built with **React** (frontend) and **Flask** (backend), featuring real-time updates and notifications.

## Features

- **API Tester**
  - Send GET, POST, PATCH, DELETE requests.
  - JSON body support for POST/PATCH.
  - Live response preview.
  - Success/error notifications for every request.

- **Todo Dashboard**
  - Add, edit, delete, and toggle todos.
  - Filter todos by All / Completed / Pending.
  - Live updates when todos are modified.
  - Animated feedback for actions.

- **Real-Time Integration**
  - Optional Socket.IO support for live updates across clients.

## Tech Stack

- **Frontend:** React, CSS, optionally Socket.IO
- **Backend:** Flask, Flask-CORS
- **Deployment:** Local development via Flask dev server, frontend via Vite/React dev server

## Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Open http://localhost:5173 to view the dashboard.

Folder Structure
css
Copy
Edit
frontend/
  src/
    components/
    pages/
    socket.js
backend/
  app.py
Future Improvements
Persistent database (SQLite/PostgreSQL)

User authentication

Enhanced API testing features (headers, auth, etc.)

Dark/light theme toggle