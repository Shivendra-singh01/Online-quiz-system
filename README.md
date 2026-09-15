# Online Quiz System

A RESTful backend API for an online quiz platform built with Node.js, Express, MongoDB, JWT authentication, and role-based authorization.

The system allows administrators to create quizzes and questions, while users can attempt quizzes, receive scores, view their result history, and access quiz results.

---

## 🚀 Features

### Authentication
- User registration
- Secure password hashing using bcryptjs
- User login
- JWT-based authentication
- Protected API routes

### Authorization
- User and Admin roles
- Role-based access control
- Admin-only quiz creation
- Admin-only question creation
- Quiz ownership validation

### Quiz Management
- Create quizzes
- Add questions to quizzes
- Retrieve available quizzes
- Retrieve quiz questions

### Quiz Submission
- Submit answers
- Validate submitted questions
- Validate selected options
- Prevent duplicate question answers
- Automatic score calculation
- Percentage calculation

### Results
- Save quiz results
- View personal result history
- Admin access to quiz results
- Results sorted by score

### Security & Validation
- JWT verification
- Protected routes
- Role-based authorization
- MongoDB ObjectId validation
- Input validation
- Correct answers are never exposed to students

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Backend runtime |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| Nodemon | Development server |

---

## 🏗️ Architecture

```text
Client / Postman
       |
       v
   Express API
       |
       v
     Routes
       |
       v
   Middleware
       |
       v
   Controllers
       |
       v
     Models
       |
       v
    MongoDB
