# MERN Authentication App with Tailwind CSS, Material-UI, and OAuth

## Overview

This project is a full-stack web application that implements user authentication using the MERN stack along with Tailwind CSS, Material-UI for styling, and OAuth for authentication.

### Technologies Used

- **Frontend**:
  - React
  - Axios
  - React Router
  - Tailwind CSS
  - Material-UI

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - JSON Web Tokens (JWT)
  - bcrypt for password hashing
  - OAuth libraries for authentication (e.g., Passport.js)

## Installation

1. **Client Setup**:
   - Clone the client directory and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. **Server Setup**:
   - Clone the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

## Configuration

- **OAuth Integration**:
  - To enable OAuth, obtain API keys from providers (Google, Facebook, etc.).
  - Place these keys in the designated files (e.g., `server/config/default.json`).
  - Refer to our OAuth integration guide [here](link) for detailed steps.

## Usage

1. **Local Development**:
   - Start the frontend:
   ```bash
   cd client
   npm start
   ```
   - Start the backend:
   ```bash
   cd server
   node server 
   ```

2. **Authentication Flow**:
   - Register a new user or authenticate via OAuth providers.
   - Login with registered user credentials or OAuth login.
   - Access the protected routes and update the user profile.

## Contributing

- Contributions are welcomed.
