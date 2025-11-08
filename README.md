# 🛍️ **Catalogo: E-Commerce Website**

> ⚠️ **Note:** The backend is hosted on a free-tier service. The first request after inactivity may take **30–60 seconds** to wake up the server. Subsequent requests perform normally. 🚀

![Catalogo Badge](https://img.shields.io/badge/Catalogo-Full%20Stack%20E--Commerce-blue?style=for-the-badge\&logo=github)

A complete **full-stack e-commerce application** that combines **product management**, **role-based access control**, and a fully functional **shopping cart and checkout system**.

🌐 **[Live Demo](https://catalogo-seven-kappa.vercel.app)**
🎥 **[Demo Video — Coming Soon](#)**

---

## ✨ **Features**

### 🧑‍💼 **Authentication & Authorization**

* Secure **user signup & login** with JWT (httpOnly cookies)
* Role-based access:

  * **Admin:** Full CRUD on products
  * **User:** Browse, add to cart, checkout
* Passwords hashed using **bcrypt**

---

### 🛒 **Cart & Checkout System**

* Add products to cart directly from catalog
* Update or remove items dynamically
* Real-time total calculation via Redux
* Mock checkout with name/email form
* Generates order summary (bill/receipt)

---

### 🧾 **Product Management (Admin Only)**

* **Create**, **Read**, **Update**, and **Delete** products
* **RBAC:** Only Admins can access CRUD routes
* Real-time UI updates after product operations

---

### 💎 **Modern UI/UX**

* Responsive and accessible design using **Tailwind CSS**
* Smooth navigation with **React Router**
* Global state via **Redux Toolkit**
* Minimal and intuitive checkout flow

---

## 🛠️ **Tech Stack**

**Frontend**

* ⚛️ React (Vite)
* 🧭 React Router
* 🎛️ Redux Toolkit
* 💅 Tailwind CSS

**Backend**

* 🟢 Node.js + Express
* 🍃 MongoDB + Mongoose
* 🔐 JWT + bcrypt + Joi
* 🌐 CORS + dotenv

**Deployment**

* 🖥️ Frontend → **Vercel**
* ⚙️ Backend → **Render**
* ☁️ Database → **MongoDB Atlas**

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge\&logo=redux\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge\&logo=vercel\&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)

---

## 📸 **Screenshots**

### 🏠 Home Page

![Home](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.00.06_uqnzr1.png)

### 📦 Product Description

![Product](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.00.15_vhfyym.png)

### 🛒 Cart Page

![Cart](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.00.34_ifxm5l.png)

### 💳 Checkout Modal

![Checkout](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.01.08_eqppt2.png)

### 🧾 Bill / Receipt

![Bill](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.01.20_ghhvv5.png)

🎥 **[Watch Demo Video (Coming Soon)](#)**

---

## 🔑 **Roles & Access**

| Role      | Email                                     | Password | Permissions                          |
| --------- | ----------------------------------------- | -------- | ------------------------------------ |
| **Admin** | [admin@gmail.com](mailto:admin@gmail.com) | 123456   | Full CRUD on products                |
| **User**  | [neha@gmail.com](mailto:neha@gmail.com)   | 123456   | View products, add to cart, checkout |
| **User**  | [test@gmail.com](mailto:test@gmail.com)   | 1234566  | Same as above                        |

**Instructions:**

1. Log in as **Admin** → Access full CRUD options.
2. Log in as **User** → Browse catalog, add to cart, and mock checkout.
3. Unauthorized actions return `403 Access Denied`.

---

## 🔗 **API Endpoints**

### 👥 Authentication

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| `POST` | `/api/v1/user/signup`  | Register a new user        |
| `POST` | `/api/v1/user/login`   | Login and get JWT token    |
| `GET`  | `/api/v1/user/getUser` | Get logged-in user details |

---

### 📦 Products

| Method   | Endpoint               | Description                       |
| -------- | ---------------------- | --------------------------------- |
| `GET`    | `/api/v1/products`     | Fetch all products                |
| `GET`    | `/api/v1/products/:id` | Get product by ID                 |
| `POST`   | `/api/v1/products`     | Create new product *(Admin only)* |
| `PATCH`  | `/api/v1/products/:id` | Update product *(Admin only)*     |
| `DELETE` | `/api/v1/products/:id` | Delete product *(Admin only)*     |

---

### 🛒 Cart

| Method   | Endpoint                | Description                |
| -------- | ----------------------- | -------------------------- |
| `GET`    | `/api/v1/cart`          | Get user’s cart            |
| `POST`   | `/api/v1/cart`          | Add item to cart           |
| `DELETE` | `/api/v1/cart/:id`      | Remove item from cart      |
| `POST`   | `/api/v1/cart/checkout` | Mock checkout, return bill |

---

## 🚀 **Getting Started**

### **Prerequisites**

* Node.js ≥ 16
* MongoDB Atlas (or local MongoDB)
* npm / yarn

### **Setup**

```bash
# Clone repository
git clone https://github.com/yourusername/Catalogo.git
cd Catalogo
```

#### Backend

```bash
cd backend
npm install
```

Create `.env`:

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

#### Frontend

```bash
cd frontend
npm install
```

Create `.env`:

```env
VITE_BACKEND_URL=http://localhost:8000/api/v1
```

Run frontend:

```bash
npm run dev
```

---

## 🔒 **Security Highlights**

* **JWT tokens** stored in httpOnly cookies
* **Password hashing** via bcrypt
* **Input validation** with Joi
* **Protected routes** for admin actions
* **CORS configured** for secure frontend-backend communication

---

## ✅ **Key Learnings**

* Implementing **RBAC** in a real-world e-commerce system
* Integrating **Redux Toolkit** with Express APIs
* Managing secure authentication flows
* Building **dynamic cart and checkout systems**
* Handling deployment and CORS with Vercel + Render

---

### 💖 Built with Passion using React, Node.js & MongoDB

