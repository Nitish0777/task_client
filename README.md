# Task Management Client

This is the client-side implementation of a Task Management application built with React. It interacts with a Node.js and Express server to provide a user-friendly interface for managing tasks.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [API Integration](#api-integration)
- [Installation](#installation)


## Features

- View, create, update, and delete tasks
- Mark tasks as completed or pending
- User authentication (login and logout)
- Responsive design for a better user experience

## Technologies Used

- React.js
- React Router for routing
- Axios for API calls
- CSS for styling (inline styles used in this project)

## Getting Started

To get a local copy up and running, follow these steps.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nitish0777/task_client.git

2. Navigate to the project directory:
   ```bash
   cd task_client

3. Install the required packages:
   ```bash
   npm install

## API Integration

This client connects to the following API endpoints provided by the Task Management Server:

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.

### Tasks

- **GET** `/api/tasks`: Retrieve all tasks.
- **POST** `/api/tasks`: Create a new task.
- **GET** `/api/tasks/:id`: Retrieve a task by ID.
- **PUT** `/api/tasks/:id`: Update an existing task.
- **DELETE** `/api/tasks/:id`: Delete a task.

