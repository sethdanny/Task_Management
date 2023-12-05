# Task Management API

Welcome to the Task Management API project!. This API provides functionality for managing tasks with user authentication using jsonwebtoken.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication
- Task CRUD operations
- MVC architecture
- MySQL database

## Getting Started

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn
- MySQL

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sethdanny/task_management.git

2. Install dependencies:
cd task_management
npm install

### Configuration
1. Create a .env file in the root directory and set the following variables:
- PORT=5000
- DB_HOST=localhost
- DB_USER=your_database_user
- DB_PASSWORD=your_database_password
- DB_NAME=task_manager

### Database Setup
1. Ensure that your MySQL server is running.
2. Run the following commands to set up the database and tables:

`npm run db:create`
`npm run db:migrate`

### Usage
1. Start the server:
npm run server
2. Access the API at `http://localhost:5000`

### API Endpoints
* GET /tasks: Get all tasks for a user.
* GET /tasks/:taskId: Get a specific task for a user.
* POST /tasks: Add a new task for a user.
* PUT /tasks/:taskId: Update a task for a user.
* DELETE /tasks/:taskId: Delete a task for a user.

### Authentication
* The API uses JSON Web Tokens (JWT) for user authentication.
* Register a new user using the /register endpoint.
* Obtain a JWT token by logging in with the /login endpoint.
* Include the obtained token in the Authorization header for protected endpoints.

### Contributing
Nadduli Daniel <naddulidaniel1994@gmail.com>

### API Documentation
https://documenter.getpostman.com/view/27746757/2s9YeLZVUL

### License
* This project is licensed under the `MIT License`