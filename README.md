# TaskManager

A full-stack task management application built with **React** and **Spring Boot**. The application provides user authentication, JWT-based authorization, task CRUD operations, PostgreSQL persistence, Docker containerization, CI/CD, and cloud deployment.

## Features

* User registration and login
* JWT-based authentication
* Protected routes
* Create tasks
* View tasks
* Update tasks
* Delete tasks
* Mark tasks as completed
* Search and filter tasks
* PostgreSQL database
* RESTful backend APIs
* Dockerized application
* Automated CI/CD using GitHub Actions
* Production deployment
* Responsive React frontend

## Tech Stack

### Frontend

* React
* JavaScript
* HTML5
* CSS3
* React Router
* Fetch API

### Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* REST APIs
* JWT

### Database

* PostgreSQL

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* CI/CD

## Architecture

```text
                    ┌──────────────────┐
                    │   React Frontend │
                    └────────┬─────────┘
                             │
                         REST API
                             │
                    ┌────────▼─────────┐
                    │ Spring Boot API  │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │    Service Layer │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │ Repository Layer │
                    └────────┬─────────┘
                             │
                    ┌────────▼─────────┐
                    │    PostgreSQL    │
                    └──────────────────┘
```

## Authentication Flow

The application uses JWT for authentication.

```text
User
 │
 ├── Register
 │       │
 │       ▼
 │   Spring Boot
 │       │
 │       ▼
 │   PostgreSQL
 │
 └── Login
         │
         ▼
    Authentication
         │
         ▼
      JWT Token
         │
         ▼
   React localStorage
         │
         ▼
 Protected API Requests
```

The backend validates the JWT before allowing access to protected resources.

## Project Structure

```text
taskmanager/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── Component/
│   │   ├── Pages/
│   │   ├── Service/
│   │   ├── Security/
│   │   └── styles/
│   ├── package.json
│   └── Dockerfile
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── docker-compose.yml
├── package.json
└── README.md
```

## API Endpoints

### Authentication / Users

| Method | Endpoint            | Description                       |
| ------ | ------------------- | --------------------------------- |
| POST   | `/auth/register`    | Register a new user               |
| POST   | `/auth/login`       | Authenticate user and receive JWT |
| GET    | `/user/{id}`        | Get user by ID                    |
| PUT    | `/user/update`      | Update user                       |
| DELETE | `/user/delete/{id}` | Delete user                       |

### Tasks

| Method | Endpoint                | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/task/create`          | Create a task            |
| GET    | `/task/{taskId}`        | Get a task               |
| GET    | `/task/user/{userId}`   | Get all tasks for a user |
| PUT    | `/task/update`          | Update a task            |
| DELETE | `/task/delete/{taskId}` | Delete a task            |

> Update the endpoints above if your current deployed API uses different paths.

## Running Locally

### Prerequisites

Make sure you have:

* Java 21
* Node.js
* npm
* PostgreSQL
* Docker (optional)

### Clone the Repository

```bash
git clone https://github.com/Sidhant738/taskmanager.git
cd taskmanager
```

## Backend Setup

Navigate to the backend:

```bash
cd backend
```

Configure the required environment variables:

```text
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
JWT_SECRET
FRONTEND_URL
```

Then run:

```bash
./mvnw spring-boot:run
```

The backend will start on the configured Spring Boot port.

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start using the Vite development server.

## Running with Docker

The project includes Docker configuration for running the application using containers.

From the project root:

```bash
docker compose up --build
```

To stop the containers:

```bash
docker compose down
```

## CI/CD

GitHub Actions is used to automate the build and verification process.

The CI pipeline includes:

* Backend build and tests
* Frontend build
* Docker build
* Automated execution on repository changes

```text
Git Push
   │
   ▼
GitHub Actions
   │
   ├── Backend Build
   │
   ├── Backend Tests
   │
   ├── Frontend Build
   │
   └── Docker Build
```

This ensures that changes are validated automatically before deployment.

## Deployment

The application is deployed using a containerized architecture.

### Frontend

Production frontend:

`YOUR_FRONTEND_URL`

### Backend

Production backend API:

`YOUR_BACKEND_URL`

Replace the URLs above with your actual deployed URLs.

## Screenshots

Add screenshots of the major application screens here.

### Login

Add your login screenshot here.

### Dashboard

Add your dashboard screenshot here.

### Task Management

Add your task creation/editing screenshot here.

## Security

The application uses:

* JWT-based authentication
* Spring Security
* Protected API endpoints
* Environment variables for sensitive configuration
* Authentication-based frontend route protection

Sensitive credentials and secrets are not committed to the repository.

## Future Improvements

Potential improvements include:

* Password hashing and stronger credential security
* Refresh token implementation
* Role-based authorization
* Pagination and sorting
* Task categories and priorities
* Due dates and reminders
* Automated backend integration tests
* Improved error handling
* API documentation using Swagger/OpenAPI
* Monitoring and logging

## Learning Objectives

This project was developed to gain practical experience with:

* React frontend development
* Spring Boot backend development
* REST API design
* Spring Security
* JWT authentication
* PostgreSQL
* Spring Data JPA
* Hibernate
* Docker
* GitHub Actions
* CI/CD
* Full-stack application deployment

## License

This project is for educational and portfolio purposes.

## Live Demo

[Open TaskManager](https://taskmanager-1-62vr.onrender.com/)
