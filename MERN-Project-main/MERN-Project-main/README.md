# MERN Authentication Project

A simplified MERN (MongoDB, Express, React, Node.js) authentication app with user registration, login, logout, and a protected dashboard.

## Project Structure

```text
B:\MERNProject\MERNProject\
|-- BackEnd/
|   |-- index.js
|   |-- User.js
|   |-- package.json
|   |-- package-lock.json
|   |-- .env
|   |-- .env.example
|   `-- .gitignore
`-- FrontEnd/
    `-- project/
        |-- package.json
        `-- src/
            |-- App.js
            |-- AuthContext.js
            |-- index.js
            |-- styles.css
            `-- Auth/
                |-- LoginComp.js
                |-- RegisterComp.js
                `-- Dashboard.js
```

## Simplified Architecture

### Backend

- `index.js` starts the Express server, connects MongoDB, defines auth routes, and protects the profile route
- `User.js` defines the Mongoose user schema and password hashing logic
- `.env` stores runtime configuration such as MongoDB URI, JWT secret, and port

### Frontend

- `App.js` defines the main routes
- `AuthContext.js` handles login, register, logout, token storage, and shared auth state
- `src/Auth/LoginComp.js` renders the login form
- `src/Auth/RegisterComp.js` renders the registration form
- `src/Auth/Dashboard.js` fetches the protected profile and shows user details
- `styles.css` contains the app styling

## Features

- User registration with validation
- User login with JWT authentication
- Password hashing with `bcryptjs`
- Protected profile route
- MongoDB integration with Mongoose
- Token storage in `localStorage`
- Responsive auth UI

## API Endpoints

### Public

- `POST /api/auth/register`
  - Body: `{ firstName, lastName, email, password, confirmPassword }`
- `POST /api/auth/login`
  - Body: `{ email, password }`
- `POST /api/auth/logout`

### Protected

- `GET /api/auth/profile`
  - Header: `Authorization: Bearer <token>`

## Prerequisites

- Node.js
- npm
- MongoDB local server or MongoDB Atlas

## Setup

Current workspace root on disk:

```text
B:\MERNProject\MERNProject
```

### 1. Backend

```bash
cd B:\MERNProject\MERNProject\BackEnd
npm install
```

Create or update `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/mern-auth
JWT_SECRET=your_jwt_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

Start backend:

```bash
cd B:\MERNProject\MERNProject\BackEnd
npm start
```

Backend runs at `http://localhost:5000`

### 2. Frontend

```bash
cd B:\MERNProject\MERNProject\FrontEnd\project
npm install
npm start
```

Frontend runs at `http://localhost:3000`

## How It Works

1. The user opens the frontend on port `3000`
2. The user registers or logs in
3. The frontend sends requests to `/api/auth/...`
4. The frontend proxy forwards requests to the backend on port `5000`
5. The backend validates data and reads/writes users in MongoDB
6. The backend returns a JWT token after successful login or registration
7. The frontend stores the token in `localStorage`
8. The dashboard sends the token to fetch the protected profile

## Request/Response Diagram

```text
Register
Frontend -> POST /api/auth/register -> Backend -> MongoDB
Frontend <- token + user data      <- Backend

Login
Frontend -> POST /api/auth/login -> Backend -> MongoDB
Frontend <- token + user data   <- Backend

Profile
Frontend -> GET /api/auth/profile + Bearer token -> Backend -> MongoDB
Frontend <- user profile                           <- Backend
```

## Frontend Flow

- `App.js` loads routes
- `AuthContext.js` manages auth actions and token state
- `LoginComp.js` and `RegisterComp.js` submit forms
- `Dashboard.js` fetches `/api/auth/profile` using the stored token

## Backend Flow

- `index.js` receives API requests
- It validates token access for the profile route
- `User.js` handles schema rules, password hashing, and password comparison
- MongoDB stores the user records

## Available Scripts

### Backend

- `npm start` - start the backend server
- `npm run dev` - start backend with watch mode

### Frontend

- `npm start` - start the React dev server
- `npm run build` - create a production build

## Troubleshooting

### MongoDB connection issues

- Make sure MongoDB is running locally
- Or update `MONGODB_URI` to a valid Atlas connection string

### Port 5000 already in use

- Stop the old process using port `5000`
- Or change `PORT` in `BackEnd/.env`

### Frontend cannot reach backend

- Make sure backend is running on port `5000`
- Make sure frontend is running on port `3000`
- Check the `proxy` field in `FrontEnd/project/package.json`

## Notes

- The project was intentionally simplified to reduce file count and make the flow easier to understand
- Unused CRA starter files such as `App.test.js`, `reportWebVitals.js`, `setupTests.js`, and `logo.svg` were removed

## Author

Sujit Pawar
