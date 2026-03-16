<div align="center">

```
 ██████╗ █████╗ ████████╗ █████╗ ██╗      ██████╗  ██████╗  ██████╗
██╔════╝██╔══██╗╚══██╔══╝██╔══██╗██║     ██╔═══██╗██╔════╝ ██╔═══██╗
██║     ███████║   ██║   ███████║██║     ██║   ██║██║  ███╗██║   ██║
██║     ██╔══██║   ██║   ██╔══██║██║     ██║   ██║██║   ██║██║   ██║
╚██████╗██║  ██║   ██║   ██║  ██║███████╗╚██████╔╝╚██████╔╝╚██████╔╝
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝  ╚═════╝  ╚═════╝
```

**Full-stack e-commerce platform — JWT auth, RBAC, cart engine, checkout pipeline**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

🌐 **[Live Demo](https://catalogo-seven-kappa.vercel.app)** · 🎥 **[Demo Video](https://youtu.be/qt7saA_NRGI)**

> ⚠️ Backend on Render free tier — first request after inactivity may take 30–60 seconds.

</div>

---

## `$ cat overview.txt`

Catalogo is a full-stack e-commerce platform with **Role-Based Access Control at the controller level**. Admin and User roles are checked before business logic executes — unauthorized requests return 403 before touching any data.

```
  Request → Auth Middleware (JWT Bearer) → Controller Role Check
                                                  │
                                     ┌────────────┴────────────┐
                                   ADMIN                     USER
                                POST /products            GET /products
                                PATCH /products/:id       GET /cart
                                DELETE /products/:id      POST /cart
                                                          POST /cart/checkout
                                Unauthorized  →  403 Access Denied
```

---

## `$ cat features.txt`

### 🔐 Authentication (JWT Bearer)
```
POST /api/v1/user/signup   →  register + bcrypt hash
POST /api/v1/user/login    →  validate + return JWT (Bearer token)
GET  /api/v1/user/getUser  →  get logged-in user details

Auth middleware → verifies Bearer token on protected routes
Role check     → validated at controller level
Unauthorized   → 403 Access Denied
```

### 📦 Product Management
```
GET    /api/v1/products      →  fetch all products         [public]
GET    /api/v1/products/:id  →  get product by ID          [public]
POST   /api/v1/products      →  create product             [ADMIN]
PATCH  /api/v1/products/:id  →  update product             [ADMIN]
DELETE /api/v1/products/:id  →  delete product             [ADMIN]
```

### 🛒 Cart & Checkout Engine
```
GET    /api/v1/cart          →  get shared cart
POST   /api/v1/cart          →  add item to cart
DELETE /api/v1/cart/:id      →  remove item from cart
POST   /api/v1/cart/checkout →  mock checkout → returns bill/receipt
```

### 🔑 Test Credentials
| Role | Email | Password | Permissions |
|---|---|---|---|
| Admin | admin@gmail.com | 123456 | Full CRUD on products |
| User | neha@gmail.com | 123456 | Browse, cart, checkout |
| User | test@gmail.com | 1234566 | Same as above |

---

## `$ cat stack.txt`

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  BACKEND                                                        │
│  Node.js · Express    →  REST API                              │
│  MongoDB + Mongoose   →  data modeling                         │
│  JWT (Bearer token)   →  stateless auth                        │
│  bcrypt               →  password hashing                      │
│  CORS                 →  cross-origin security                 │
│                                                                 │
│  FRONTEND                                                       │
│  React + Vite         →  fast dev build                        │
│  Redux Toolkit        →  global state (cart, auth)             │
│  React Router         →  client-side navigation                │
│  Tailwind CSS         →  styling                               │
│                                                                 │
│  DEPLOYMENT                                                     │
│  Frontend  →  Vercel                                           │
│  Backend   →  Render                                           │
│  Database  →  MongoDB Atlas                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## `$ ls -la screenshots/`

### Home Page
![Home](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.00.06_uqnzr1.png)

### Product Page
![Product](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.00.15_vhfyym.png)

### Cart
![Cart](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.00.34_ifxm5l.png)

### Checkout
![Checkout](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.01.08_eqppt2.png)

### Receipt
![Bill](https://res.cloudinary.com/dqz5xgr5v/image/upload/v1762608838/Screenshot_2025-11-08_at_19.01.20_ghhvv5.png)

---

## `$ cat security.txt`

```
✓  JWT Bearer token auth       →  stateless, validated on every request
✓  bcrypt password hashing     →  no plaintext storage
✓  RBAC at controller level    →  role checked before any data access
✓  CORS configured             →  secure cross-origin requests
```

---

## `$ cat setup.txt`

### Prerequisites
```
Node.js v16+
MongoDB Atlas or local MongoDB
npm or yarn
```

### Clone
```bash
git clone https://github.com/rakesh-mahapatro-456/Catalogo.git
cd Catalogo
```

### Backend
```bash
cd backend && npm install
```

Create `.env`:
```env
PORT=8000
MONGO_URI=your_mongodb_uri
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret
```

```bash
npm run dev
# API at http://localhost:8000
```

### Frontend
```bash
cd frontend && npm install
```

Create `.env`:
```env
VITE_BACKEND_URL=http://localhost:8000/api/v1
```

```bash
npm run dev
# App at http://localhost:5173
```

---

<div align="center">

```
$ echo $BUILT_WITH
  React · Node.js · MongoDB
  Built with ❤️
```

</div>
