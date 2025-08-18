# Apitester - React + Vite

Apitester is a full-stack React application built with Vite for fast development and HMR. It provides a live API dashboard, todo management, and request preview functionality.

## Features

- React 19 + Vite setup with Fast Refresh
- Live Todo Dashboard integrated with a Python/Flask backend
- Custom API Request Panel for GET, POST, PATCH, DELETE requests
- Live WebSocket updates for todos
- Animated notifications and feedback
- Automatic version display from `package.json`
- Ready for Railway deployment

## Frontend Plugins

We use [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) for fast refresh using SWC. Babel-based Fast Refresh is also available via [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react).

## ESLint

This project includes ESLint configuration with React hooks rules. For production applications, consider using TypeScript with type-aware lint rules via [`typescript-eslint`](https://typescript-eslint.io).

## Configuration

- Backend URL is automatically selected based on environment:

```js
import { BACKEND_URL } from "./config.js";


Local development uses http://127.0.0.1:5000

Railway production uses https://apitester-production.up.railway.app

App version is imported from package.json:

Running Locally

Clone the repo:

git clone https://github.com/RodriguezRamiro/apitester.git
cd apitester/frontend

Install dependencies:

npm install

Start development server:

npm run dev

The app will run at http://localhost:5173 by default.

Deployment

Deployed to Railway using GitHub integration

Railway automatically builds and runs the backend with Python 3.11

Automatic versioning displayed in footer

License

© 2025 Ramiro Rodriguez Alvarez — All rights reserved. Version is automatically updated from package.json.