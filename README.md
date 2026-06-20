# TaskFlow - Full Stack Task Management Application
TaskFlow is a full-stack task management application built with ASP.NET Core Web API, React, Entity Framework Core and PostgreSQL/SQL Server.
It allows users to register, authenticate using JWT, and manage personal tasks with CRUD functionality.

### Features

- User Registration
- JWT Authentication
- Login and Logout
- Create Tasks
- View Tasks
- Mark Tasks as Complete
- Edit Tasks
- Delete Tasks
- Protected APIs
- Protected Routes

## Architecture

React Frontend
        ↓
ASP.NET Core API
        ↓
Business Layer
        ↓
Repository Layer
        ↓
Database

## Tech Stack

### Backend
- ASP.NET Core 8
- Entity Framework Core
- JWT Authentication
- Repository Pattern

### Frontend
- React
- Axios
- React Router DOM

### Database
- PostgreSQL / SQL Server

### Deployment
- Render
- Vercel

### Folder Structure
backend/
frontend/

### API Endpoints
| Method | Endpoint                | Description   |
| ------ | ----------------------- | ------------- |
| POST   | /api/auth/register      | Register user |
| POST   | /api/auth/login         | Login user    |
| GET    | /api/task               | Get tasks     |
| POST   | /api/task               | Create task   |
| PUT    | /api/task/{id}/update   | Update task   |
| PUT    | /api/task/{id}/complete | Mark complete |
| DELETE | /api/task/{id}/remove   | Delete task   |


### To Run Locally
## Backend

cd backend/TaskFlow.API
dotnet restore
dotnet ef database update
dotnet run

### Frontend

cd frontend
npm install
npm run dev

###Environment Variables
ConnectionStrings__DefaultConnection=
Jwt__Key=
Jwt__Issuer=
Jwt__Audience=
