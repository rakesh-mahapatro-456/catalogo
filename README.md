# Catalogo – Product Management System

> ⚠️ **Note:** The backend is hosted on a free-tier service.
> The first request after inactivity may take **30–60 seconds** to wake up the server. Subsequent requests will perform normally. 🚀

<div align="center">

![Catalogo Banner](https://img.shields.io/badge/Catalogo-Product%20Management-blue?style=for-the-badge\&logo=github)

**A full-stack product management application to manage products with CRUD operations, role-based access, and a modern UI.**

🌐 **[Live Demo](https://your-frontend-link.vercel.app)**

</div>

---

## ✨ Features

### ✅ Authentication

* Secure user registration and login
* JWT-based authentication
* Password hashing with **bcrypt**
* Role-based access: **User vs Admin**
* Protected API routes

### ✅ Product Management

* **Create** products with name, description, price, stock, and image URL
* **Read** products (all or by ID)
* **Update** product details (admin or owner)
* **Delete** products (admin or owner only)
* Role-based access for secure operations

### ✅ Modern UI/UX

* Responsive UI built with **React + Vite**
* **Redux Toolkit** for global state management
* **shadcn/ui** for reusable components
* **Tailwind CSS** for styling
* Real-time UI updates after CRUD operations

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge\&logo=redux\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

</div>

---

## 📸 Screenshots / Demo

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

## 🔗 API Endpoints

### **Authentication**

* `POST /api/v1/user/signup` → Register new user
* `POST /api/v1/user/login` → Login user
* `GET /api/v1/user/getUser` → Get logged-in user info (protected)

### **Products**

* `GET /api/v1/products` → Get all products
* `GET /api/v1/products/:id` → Get product by ID
* `POST /api/v1/products` → Create new product (admin or owner)
* `PUT /api/v1/products/:id` → Update product (admin or owner)
* `DELETE /api/v1/products/:id` → Delete product (admin or owner)

---

## 🚀 Getting Started

### **Prerequisites**

* Node.js (v14+)
* npm or yarn
* MongoDB (local or cloud instance)

### **Setup**

```bash
# Clone repo
git clone https://github.com/your-username/catalogo.git
cd catalogo
```

#### **Backend**

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_database_uri
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

Start backend:

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
VITE_BACKEND_URL=http://localhost:5000/api/v1
```

Run frontend:

```bash
npm run dev
```

---

## 🔒 Security Highlights

* JWT tokens securely handled
* Passwords hashed with **bcrypt**
* Role-based route protection
* Input validation
* CORS configured

---

## ✅ Key Learnings

* Building full-stack applications with **React + Node.js + MongoDB**
* JWT authentication & role-based access control
* Redux Toolkit for state management
* Modern UI with **shadcn/ui + Tailwind CSS**
* Deploying backend on Render & frontend on Vercel

---

<div align="center">

**Built with ❤️ using React, Node.js, and MongoDB**

</div>


