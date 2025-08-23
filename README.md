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
  - Socket.IO updates for live todos across clients.

## Tech Stack

- **Frontend:** React, Vite, CSS, Socket.IO
- **Backend:** Flask, Flask-CORS
- **Deployment:** Railway (backend), Vercel (frontend)

## Getting Started

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py

Frontend
cd frontend
npm install
npm run dev


Folder Structure
frontend/
  src/
    components/
    pages/
    socket.js
backend/
  app.py

  Folder Structure
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

Enhanced API testing features (custom headers, auth, etc.)

Dark/light theme toggle

More modular API handling