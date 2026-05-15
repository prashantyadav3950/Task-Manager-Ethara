# Team Task Manager

A full-stack collaborative task management application built with React, Node.js, Express, and MongoDB.

## Features

- **User Authentication** - Signup/Login with JWT-based auth
- **Project Management** - Create projects, add/remove team members
- **Task Management** - Create, assign, and track tasks with status, priority, and due dates
- **Dashboard** - Overview of tasks by status, overdue tasks, and per-user breakdown
- **Role-Based Access** - Admin (full control) and Member (view/update assigned tasks)

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Axios
- **Backend**: Node.js, Express, Mongoose, JWT, bcryptjs
- **Database**: MongoDB Atlas

## Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Installation

```bash
# Install all dependencies
npm run install:all

# Create server/.env
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret
```

> The first user who signs up is automatically assigned the Admin role.

### Development

```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend
npm run dev:client
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

### Production Build

```bash
npm run build   # Builds frontend and installs server dependencies
npm start       # Starts the backend service
```

## Deployment (Railway)

1. Push code to GitHub.
2. Create a new project on [Railway](https://railway.app).
3. Add a MongoDB service or connect to MongoDB Atlas.
4. Add a new service from GitHub using this repo.
5. Set environment variables:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string
   - `CLIENT_URL` - `https://task-manager-ethara-psi.vercel.app`
   - `VITE_API_URL` - `https://<your-railway-backend-url>/api` when frontend and backend are separate
6. Set build command: `npm run build`
7. Set start command: `npm start`

> If you deploy frontend and backend in the same Railway service, the backend serves the built React app from `client/dist` and the frontend API uses `window.location.origin + '/api'` by default. If you deploy the frontend separately on Vercel, set `VITE_API_URL` in Vercel and `CLIENT_URL` in Railway.

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |
| GET | `/api/projects` | List user's projects | Yes |
| POST | `/api/projects` | Create project | Yes |
| GET | `/api/projects/:id` | Get project details | Yes |
| POST | `/api/projects/:id/members` | Add member | Admin |
| DELETE | `/api/projects/:id/members/:userId` | Remove member | Admin |
| DELETE | `/api/projects/:id` | Delete project | Admin |
| GET | `/api/tasks/project/:projectId` | Get project tasks | Yes |
| POST | `/api/tasks` | Create task | Admin |
| PUT | `/api/tasks/:id` | Update task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Admin |
| GET | `/api/dashboard` | Overall dashboard | Yes |
| GET | `/api/dashboard/project/:projectId` | Project dashboard | Yes |
