# Catalogo: E-commerce website

> ⚠️ **Note:** The backend is hosted on a free-tier service. The first request after inactivity may take **30–60 seconds** to wake up the server. Subsequent requests will perform normally. 🚀

![Catalogo Banner](https://img.shields.io/badge/Catalogo-Product%20Catalog-blue?style=for-the-badge\&logo=github)

A full-stack product catalog application that streamlines the process of managing products with features like CRUD operations, role-based access control, and secure authentication.

🌐 **[Live Demo](https://catalogo-seven-kappa.vercel.app)**

---

## ✨ Features

### ✅ Authentication & Authorization

* Secure user signup and login
* JWT-based authentication with **httpOnly cookies**
* Password hashing using **bcrypt**
* Role-based access control (RBAC) to manage user permissions

### ✅ Product Management

* **Create** new products with detailed information
* **Read** and view products with pagination
* **Update** product details efficiently
* **Delete** products with confirmation prompts

### ✅ Role-Based Access Control (RBAC)

* **Admin**: Full access to all product management features
* **User**: View products; cannot create, update, or delete
* **Custom Roles**: Define additional roles as needed

### ✅ Modern UI/UX

* Responsive and accessible UI using **React + Vite**
* **Redux Toolkit** for global state management
* **Tailwind CSS** for consistent styling
* Real-time UI updates after CRUD operations

---

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge\&logo=redux\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

### **Frontend**

* React (with Vite) for fast and optimized development
* Redux Toolkit for predictable state management
* React Router for navigation
* Tailwind CSS for styling

### **Backend**

* Node.js with Express for REST APIs
* MongoDB with Mongoose for data modeling
* JWT for authentication (httpOnly cookies)
* bcrypt for secure password hashing
* Joi for request validation
* CORS for cross-origin security

### **Deployment**

* Frontend: **Vercel**
* Backend: **Render**
* Database: **MongoDB Atlas**

---

## 📸 Screenshots

### Landing Page

![Landing Page](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1759339749/Screenshot_2025-10-01_at_22.50.27_jqdjhb.png)

### Home Page

![Home Page](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1759339751/Screenshot_2025-10-01_at_22.52.36_bujf9m.png)

### Product Details Page

![Product Details](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1759339750/Screenshot_2025-10-01_at_22.52.45_pf366j.png)

### Edit Product Page

![Edit Product](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1759339750/Screenshot_2025-10-01_at_22.52.54_ga4d9c.png)

### Create Product Page

![Create Product](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1759339750/Screenshot_2025-10-01_at_22.53.09_edruqa.png)


---

## 🔑 Role-Based Access Demo

You can use the following accounts to test role-based access in the application:

| Role  | Email                                     | Password | Access                                                                              |
| ----- | ----------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| Admin | [admin@gmail.com](mailto:admin@gmail.com) | 123456   | Full access: create, update, delete any product                                     |
| User  | [neha@gmail.com](mailto:neha@gmail.com)   | 123456   | Limited access: can view all products; can update/delete only products they created |
| User  | [test@gmail.com](mailto:test@gmail.com)   | 1234566  | Limited access: can view all products; can update/delete only products they created |

**Instructions:**

1. Go to the [live demo](https://catalogo-seven-kappa.vercel.app).
2. Log in with **Admin** credentials → full CRUD capabilities are enabled.
3. Log in with **User** credentials (**[neha@gmail.com](mailto:neha@gmail.com)** or **[test@gmail.com](mailto:test@gmail.com)**) → CRUD operations are restricted; unauthorized actions return **403 Access Denied**.
4. Try creating, editing, or deleting products with each account to see role-based permissions in action.

> 🔹 This demonstrates how **role-based access control (RBAC)** works in the system without needing a video.

---
## 🔗 API Endpoints

### **Authentication**

* `POST /api/v1/user/signup` → Register new user
* `POST /api/v1/user/login` → Login user
* `GET /api/v1/user/getUser` → Get logged-in user details

### **Products**

* `GET /api/v1/products` → Get products (with pagination)
* `GET /api/v1/products/:id` → Get single product
* `POST /api/v1/products` → Create new product
* `PATCH /api/v1/products/:id` → Update product
* `DELETE /api/v1/products/:id` → Delete product

---

## 🚀 Getting Started

### **Prerequisites**

* Node.js (v14+)
* npm or yarn
* MongoDB (local or cloud instance)

### **Setup**

```bash
# Clone repo
git clone https://github.com/yourusername/Catalogo.git
cd Catalogo
```

#### **Backend**

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=8000
MONGO_URI=your_mongodb_uri
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

Start server:

```bash
npm run dev
```

#### **Frontend**

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_BACKEND_URL=http://localhost:8000/api/v1
```

Run frontend:

```bash
npm run dev
```

---

## 🔒 Security Highlights

* JWT tokens stored in **httpOnly cookies** (prevents XSS attacks)
* Passwords hashed with **bcrypt**
* Validations with **Joi**
* Protected API routes
* CORS configured for secure cross-origin requests

---

## ✅ Key Learnings

* Core **CRM concepts**: product lifecycle, filtering, pagination
* Secure authentication using **JWT & cookies**
* State management using **Redux Toolkit**
* Handling **CORS and deployment** on Vercel & Render
* Implementing **server-side filtering and pagination**

---

Built with ❤️ using React, Node.js, and MongoDB




