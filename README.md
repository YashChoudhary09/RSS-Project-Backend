# RSS Project 🕉️

A simple user registration & authentication system using MERN stack with admin-controlled access.

---

## 🔧 Tech Stack

- MongoDB
- Express.js
- React.js
- Node.js
- JWT (Authentication)
- bcrypt (Password Hashing)

---

## 📌 Features

- User SignUp with admin key (regKey)
- JWT-based authentication
- Protected routes for logged-in users
- Admin-only regKey update feature
- Shakhaa and Task management modules

---

## 🔐 Authentication Flow

1. **Registration:**
   - User must enter correct `admin password` to register.
   - Password is hashed and saved in MongoDB.
   - JWT token is generated and sent to frontend.

2. **Login:**
   - User logs in using email and password.
   - If matched, token is sent to frontend and stored in `localStorage`.

3. **Protected Routes:**
   - React checks for token and its expiry.
   - Unauthorized users are redirected to `/login`.

4. **Admin Panel:**
   - Only users with role `"admin"` can update `adminPassword`.

---

## 🚀 How to Run

```bash
# Backend
cd backend
npm install
node app.js

# Manually seed Admin password and user (only once)
node seed.js

# Frontend
cd frontend
npm install
npm run dev
