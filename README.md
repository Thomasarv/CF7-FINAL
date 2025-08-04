# 📚 MERN LMS – Learning Management System

A full-featured Learning Management System built with the **MERN stack** (MongoDB, Express, React, Node.js) that supports user authentication, course management, and role-based access for students and instructors.

---

## 🚀 Features

### 🔐 Authentication
- Signup/Login with role selection: **Student** or **Instructor**
- JWT-based authentication
- Profile customization and user deletion

### 📘 Course Management
- Create, update, and manage courses and lectures (Instructor/Admin only)
- Add course details: title, subtitle, thumbnail, price, rating, reviews, etc.
- Students can enroll in courses and view their enrolled list

### 🧭 Navigation
- **Home**: Hero section + public courses display
- **Courses**: All available courses
- **About Us**: Linked in footer
- **Profile**: User dashboard (if authenticated)
- **Admin Dashboard**: Only for instructors to manage content

---

## 🏗️ Project Structure

### Backend (`/backend`)
- Built with Express and MongoDB using Mongoose
- User authentication with JWT and bcryptjs
- File uploads managed by Multer and Cloudinary
- RESTful API routes for courses and users
- Middleware for authentication and file handling
- Environment variables configured via .env

### Backend Folder Structure (`/backend`)
📁 controllers      - course & user controllers  
📁 middleware       - isAuthenticated, multer.js for file uploads  
📁 models           - course, lecture, user models
📁 routes           - course & user routes  
📁 utils            - cloudinary config, dataUri, MongoDB connection  
📄 index.js         - Entry point



### Frontend (`/frontend`)
- Built with **React**, styled with **TailwindCSS**, and componentized with **Shadcn UI**
- State management via **Redux + Redux-Persist**
- Animations via **Lottie-react**
- Routing with **react-router-dom**
- Environment variables configured via .env

### Frontend Folder Structure (`/frontend`)
📁 assets       - Images, animations, icons  
📁 components    - Reusable UI components (e.g. Navbar, Button, etc.)  
📁 lib         - Utility functions, API helpers  
📁 Pages  
  📁 admin      - Admin dashboard views  
  📁 auth       - Login & Signup pages  
  📄 AboutUs.jsx  - About Us page  
  📄 CourseDetails.jsx - Course detail view  
  📄 Courses.jsx   - All courses page  
  📄 Home.jsx    - Landing page  
  📄 MyCourses.jsx  - User-enrolled courses  
  📄 Profile.jsx   - User profile  
📁 redux       - Redux slices and store configuration  
📄 App.jsx       - App wrapper with routes  
📄 index.css      - Tailwind and global styles  
📄 main.jsx      - Entry point for rendering



---

## 🛠 Tech Stack & Libraries

### Backend
- Core: `express`, `mongoose`, `dotenv`
- Auth: `bcryptjs`, `jsonwebtoken`, `cookie-parser`
- File Uploads & Media: `multer`, `cloudinary`, `datauri`, `streamifier`
- Dev & Tools: `cors`, `nodemon`

### Frontend
- Core: `react`, `react-dom`, `react-router-dom`, `axios`
- Styling: `tailwindcss`, `tw-animate-css`
- State Management: `@reduxjs/toolkit`, `react-redux`, `redux-persist`
- UI/UX: `lucide-react`, `react-icons`, `framer-motion`, `lottie-react`, `sonner`
- Components: `shadcn/ui`, `@radix-ui/react-*` (e.g. `Avatar`, `Dialog`, `Select`, `Switch`)

---

## ⚙️ Getting Started

### 📦 Backend Setup

1. Go to the backend folder:
   ```bash
   cd backend
   ```

2. Create a `.env` file:
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_uri
   SECRET_KEY=your_secret_key

   # Cloudinary
   CLOUD_NAME=your_cloudinary_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

---

### 💻 Frontend Setup

1. Go to the frontend folder:
   ```bash
   cd frontend
   ```

2. Create a `.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the React app:
   ```bash
   npm run dev
   ```

5. App runs at:
   ```
   http://localhost:5173
   ```

---

## 📸 UI Overview

- **Home Page**: Hero section + view created courses
- **Navigation Bar**:
  - `Home` – homepage
  - `Courses` – browse all courses
  - `Profile Icon` - navigate to profile customization
  - `Signup / Login` – user access
- **Footer**: Includes a link to About Us page
- **User Dashboard**:
  - `Profile` – update or delete profile
  - `My Courses` –  view enrolled courses (for students)
  - `Admin Dashboard` – course/lecture creation and management (for instructors)
- **Instructor Flow**:
  - Create/update/delete courses
  - Add/update/delete lectures
  - Manage course details (title, thumbnail, price, etc.)
- **Student Flow**:
  - View course details
  - Enroll in courses
  - View lectures

---

## ✅ Roles & Permissions

| Feature                    | Student | Instructor |
|---------------------------|---------|------------|
| Browse courses            | ✅      | ✅         |
| Enroll in courses         | ✅      | ❌         |
| View My Courses           | ✅      | ❌         |
| Create/edit courses       | ❌      | ✅         |
| Add lectures              | ❌      | ✅         |
| Access Admin Dashboard    | ❌      | ✅         |
| Delete account            | ✅      | ✅         |