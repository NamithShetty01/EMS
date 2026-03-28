# EMS (Employee Management System)

Full-stack Employee Management System with:
- React + Vite frontend
- Node.js + Express backend
- MongoDB database
- JWT-based authentication

## Features

- Admin and Employee role-based access
- Department management
- Employee management (with profile image upload)
- Leave requests and approval flow
- Salary records
- Attendance marking and report
- Password change settings

## Tech Stack

### Frontend
- React 19
- React Router
- Axios
- Tailwind CSS
- react-data-table-component

### Backend
- Node.js (ES modules)
- Express
- MongoDB + Mongoose
- JWT
- Multer (image upload)
- bcrypt

## Project Structure

- frontend: React client app
- server: Express API and MongoDB models

## Prerequisites

- Node.js 18+ (recommended 20+)
- npm
- MongoDB (local or Atlas)

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/ems
JWT_KEY=your_jwt_secret_here
```

## Installation

From project root:

```bash
npm install
cd frontend && npm install
cd ../server && npm install
```

## Run The App

Use two terminals.

### Terminal 1: Backend

```bash
cd server
npm start
```

Backend runs at `http://localhost:5000`.

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Seed Admin User

To create an initial admin account:

```bash
cd server
node --env-file=.env userSeed.js
```

Default admin credentials:
- Email: `admin@gmail.com`
- Password: `admin`

## Frontend Scripts

In `frontend`:

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview build
- `npm run lint` - run ESLint

## Backend Routes (Overview)

Base URL: `http://localhost:5000/api`

- Auth: `/auth`
- Department: `/department`
- Employee: `/employee`
- Salary: `/salary`
- Leave: `/leave`
- Setting: `/setting`
- Dashboard: `/dashboard`
- Attendance: `/attendence`

## Uploads

Employee images are stored in:

- `server/public/uploads`

Served statically from backend at:

- `/uploads/<filename>`

## Notes

- Keep `server/.env` out of version control.
- Make sure MongoDB is running before starting the backend.
- If login fails with "User Not Found", seed the admin user first.
