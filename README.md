# MiseApp - Backend

Backend of the **Mise en place** system for proffessional kitchens.
This API manages users, items, stations, locations, checklists, verified items, times, and signatures.Developed with **Node.js**, **Express** y **PostgreSQL**.

---

## Technologies Used

- **Node.js** – Runtime environment for server-side JavaScript.
- **Express.js** – Web framework for building the RESTful API.
- **PostgreSQL** – Relational database system.
- **pg** – PostgreSQL client for Node.js.
- **bcryptjs** – For password hashing.
- **jsonwebtoken (JWT)** – For secure user authentication.
- **dotenv** – For environment variable management.
- **cors** – Enables secure communication between backend and frontend.

---

## Authentication

The backend uses **JWT (JSON Web Token)** for secure authentication.  
After logging in, the client receives a token that must be included in the header of every protected request:

Authorization: Bearer <your_token_here>

### Auth Flow

1. **User Registration** – Creates a new user with encrypted password.
2. **User Login** – Returns a JWT upon successful authentication.
3. **Protected Routes** – Access allowed only with a valid token.

---

## ⚙️ Environment Variables (.env)

Create a `.env` file in the root directory with the following keys:

DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
PORT=3001

## Installation & Setup

```bash
git clone <https://github.com/RichArdila/miseApp-backend.git>
cd miseApp-backend
npm install
```

Make sure your database URL in .env is correct.

Running the Backend

Development (auto-restart):

```bash
npm run dev
```

Production:

```bash
npm start
```

Stop server: Ctrl + C

Testing Endpoints

Use Postman or similar:

```bash
GET http://localhost:3001/users → list users
POST http://localhost:3001/users → create user (send JSON in body)
```

```bash
{
"username": "Richard Ardila",
"password": "123456"
}
```

---

### Core Functionalities

1. User registration and login with hashed passwords.
2. JWT-based authentication and role-based authorization.
3. Management of stations, items, and locations.
4. Creation and verification of checklists per user and station.
5. Secure connection to a PostgreSQL database.

---

## API Overview

1. User Management:
   Base route: /users

   | Method   | Endpoint | Description                    |
   | -------- | -------- | ------------------------------ |
   | `POST`   | `/`      | Create a new user (admin only) |
   | `GET`    | `/`      | Get all users (admin only)     |
   | `PATCH`  | `/:id`   | Update user by ID (admin only) |
   | `DELETE` | `/:id`   | Delete user (admin only)       |

2. Authentition:
   Base route: /auth

   | Method | Endpoint | Description                    |
   | ------ | -------- | ------------------------------ |
   | `POST` | `/login` | Log in and receive a JWT token |

3. Items:
   Base route: /items

   | Method   | Endpoint | Description                    |
   | -------- | -------- | ------------------------------ |
   | `POST`   | `/`      | Create a new item (admin only) |
   | `GET`    | `/`      | Retrieve all items             |
   | `PATCH`  | `/:id`   | Update an item (admin only)    |
   | `DELETE` | `/:id`   | Delete an item (admin only)    |

4. Stations:
   Base route: /stations

   | Method   | Endpoint | Description                       |
   | -------- | -------- | --------------------------------- |
   | `POST`   | `/`      | Create a new station (admin only) |
   | `GET`    | `/:id`   | Get a station by ID               |
   | `PATCH`  | `/:id`   | Update a station (admin only)     |
   | `DELETE` | `/:id`   | Delete a station (admin only)     |

5. Locations:
   Base route: /locations

   | Method   | Endpoint | Description                        |
   | -------- | -------- | ---------------------------------- |
   | `POST`   | `/`      | Create a new location (admin only) |
   | `GET`    | `/`      | Retrieve all locations             |
   | `PATCH`  | `/:id`   | Update an location (admin only)    |
   | `DELETE` | `/:id`   | Delete an location (admin only)    |

6. Station Items:
   Base route: /stationItems

   | Method   | Endpoint       | Description                       |
   | -------- | -------------- | --------------------------------- |
   | `POST`   | `/`            | Create a new station (admin only) |
   | `GET`    | `/`            | Get all stations                  |
   | `GET`    | `/:station_id` | Get a station by ID               |
   | `PATCH`  | `/:id`         | Update a station (admin only)     |
   | `DELETE` | `/:id`         | Delete a station (admin only)     |

7. Checklists:
   Base route: /checklist

   | Method  | Endpoint      | Description                                |
   | ------- | ------------- | ------------------------------------------ |
   | `POST`  | `/`           | Create a new checklist (by user & station) |
   | `GET`   | `/`           | Retrieve active checklists                 |
   | `PATCH` | `/:id/verify` | Mark an item as verified                   |
   | `PATCH` | `/:id/finish` | To complete a checklist                    |

## Architecture Overview

This backend is built with a modular and layered architecture following best practices for scalability and maintainability:

- Routes — Define HTTP endpoints for each resource.
- Controllers — Handle business logic, validation, and responses.
- Middleware — Manages JWT authentication and role-based authorization.
- Database Layer — Securely executes parameterized queries against PostgreSQL.
- Config & Environment — Centralized environment variables with dotenv.

### Design Principles

- Separation of Concerns — Each module has a single responsibility.
- Scalability — New features or entities can be added easily.
- Error Handling — Consistent API responses and proper logging.
- Security — Password hashing, JWT, and environment variable protection.

## License & Usage

This project is **developed by Richard Ardila Zapata**.

It is intended for **educational, portfolio, and professional demonstration purposes**.
All rights are reserved. Unauthorized use, copying, or distribution of this code for commercial purposes is prohibited without the author's explicit permission.

> **Note:** This backend code is a working demonstration of the Mise en Place system for professional kitchens.
> Any commercial use or distribution requires explicit authorization from the author.
