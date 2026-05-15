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

## Deployment (Vercel + Render)

### Frontend (Vercel)
1. In Vercel, create a new project using the `client` folder as the root.
2. Set the build command to `npm install && npm run build`.
3. Set the output directory to `dist`.
4. Add environment variables in Vercel:
   - `VITE_API_URL=https://task-manager-ethara.onrender.com/api`
5. Deploy.

### Backend (Render)
1. In Render, create a new Web Service from this repo.
2. Set the root directory to `server` if you are deploying only the backend service.
3. Set the build command to `npm run build`.
4. Set the start command to `npm start`.
5. Add environment variables in Render:
   - `MONGODB_URI` - Your MongoDB connection string
   - `JWT_SECRET` - A secure random string
   - `CLIENT_URL=https://task-manager-ethara-psi.vercel.app`
6. Deploy.

> Use `VITE_API_URL` in Vercel so your frontend points to the Render backend.
> Use `CLIENT_URL` in Render so your backend accepts requests from the Vercel frontend.

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
