# Node.js Microservices – Order Service

This is the **Order Service** microservice in a Node.js + MySQL microservices architecture.
It communicates with:

- **User Service (Port 3001)** → To validate users
- **Product Service (Port 3002)** → To validate products

---

## 🚀 Features

- Create Order (`POST /api/orders`)
- Get All Orders (`GET /api/orders`)
- Get Order by ID (`GET /api/orders/:id`)
- Update Order Status (`PATCH /api/orders/:id`)

---

## ⚙️ Setup Instructions

1️⃣ Install dependencies:

```
npm install
```

2️⃣ Create database:

```
CREATE DATABASE order_service_db;
```

3️⃣ Run migration:

```
npx sequelize-cli db:migrate
```

4️⃣ Start service:

```
nodemon src/app.js
```

Service runs on **http://localhost:3003**

---

## 🔗 API Endpoints

- **Create Order**
```
POST /api/orders
Content-Type: application/json

{
  "userId": 1,
  "productId": 1,
  "quantity": 2
}
```

- **Get All Orders**
```
GET /api/orders
```

- **Get Order by ID**
```
GET /api/orders/1
```

- **Update Order Status**
```
PATCH /api/orders/1
Content-Type: application/json

{
  "status": "CONFIRMED"
}
```

---

## ✅ Next Steps

- Add **JWT authentication**
- Implement **stock validation**
- Integrate **Docker Compose** for all microservices
