# Student Records Management System (SRMS)

A full-stack web application for managing student academic records.

## Live Demo
- Frontend: [your-vercel-url]
- Backend API: [your-render-url]

## Features
- Admin login with JWT authentication
- Add, edit, delete student records
- Enter subject-wise marks
- Automatic grade and result calculation
- Protected routes — dashboard accessible only after login

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React, React Router, Axios |
| Backend | Spring Boot, Spring Security |
| Database | PostgreSQL |
| Auth | JWT (JSON Web Token) |
| Deploy | Vercel (frontend), Render (backend) |

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | Admin login |
| GET | /api/students | Get all students |
| POST | /api/students | Add student |
| PUT | /api/students/{id} | Update student |
| DELETE | /api/students/{id} | Delete student |
| GET | /api/subjects | Get all subjects |
| POST | /api/marks | Add marks |
| GET | /api/marks/student/{id} | Get marks by student |

## Local Setup

### Backend
```bash
cd srms-backend
mvn spring-boot:run
```

### Frontend
```bash
cd srms-frontend
npm start
```

## Login Credentials (Demo)
- Email: admin@srms.com
- Password: admin123

## Developer
Rampriya S — B.Sc CS (AI), Vellalar College for Women
