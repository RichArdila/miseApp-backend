# MiseApp Backend

Backend for **MiseApp** built with Node.js, Express, and PostgreSQL.

---

## Requirements

- Node.js
- PostgreSQL
- npm

---

## Installation

```bash
git clone <https://github.com/RichArdila/miseApp-backend.git>
cd miseApp-backend
npm install
```

Create a .env file with your database connection:
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
PORT=3001

Running the Backend

Development (auto-restart):
npm run dev

Production:
npm start

Stop server: Ctrl + C

Testing Endpoints

Use Postman or similar:

GET http://localhost:3001/users → list users
POST http://localhost:3001/users → create user (send JSON in body)

{
"username": "richard",
"password": "123456"
}
