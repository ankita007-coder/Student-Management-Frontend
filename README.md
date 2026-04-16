# Student Management System (Full Stack)

## Overview

This is a full-stack **Student Management System** built using **React, Node.js, and PostgreSQL**.

It allows users to:

* Add, edit, delete students
* Upload and preview photos
* Search, filter, and paginate student data

---

## Repositories

* **Frontend Repo:** https://github.com/ankita007-coder/Student-Management-Frontend.git
* **Backend Repo:** https://github.com/ankita007-coder/Student-Management-Backend.git

---

## Live Links

* **Frontend:** https://sms-pillai.netlify.app/
* **Backend API:** https://student-management-backend-2f9p.onrender.com/

---

## Tech Stack

### Frontend

* React (Vite)
* Axios
* CSS (Dark Theme)

### Backend

* Node.js
* Express.js
* Sequelize ORM

### Database

* PostgreSQL (Supabase)

### File Upload

* Multer + Cloudinary

---

## Features

* Add Student (with validation)
* Edit / Update Student
* Delete Student
* View Students in table
* Upload & preview photo
* Search students
* Filter by course & year
* Pagination
* Responsive UI

---

## Setup Instructions

### Clone Both Repositories

```bash
git clone https://github.com/ankita007-coder/Student-Management-Backend.git
git clone https://github.com/ankita007-coder/Student-Management-Frontend.git
```

---

## Backend Setup

```bash
cd backend-repo
npm install
```

### Create `.env` file:

```env
DB_URI=your_postgresql_connection_string
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

### Run Backend:

```bash
npm run dev
```

Backend will run on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend-repo
npm install
```

### Update API Base URL

In `src/services/api.js`:

```js
baseURL: "http://localhost:5000"
```

### Run Frontend:

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## API Endpoints

* GET /students
* GET /students/:id
* POST /students
* PUT /students/:id
* DELETE /students/:id

---

## Database

### Student Table Fields

* id (UUID)
* admissionNumber (Unique)
* name
* course
* year
* dob
* email (Unique)
* mobile
* gender
* address
* photoUrl

---

## Notes

* Admission number is auto-generated
* Images are stored in Cloudinary
* Validation is implemented on frontend & backend

---

## Author

Ankita
Full Stack Developer

---
