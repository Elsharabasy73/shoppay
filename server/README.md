---
# shoppay

A simple **Node.js + Express** e‑commerce backend that demonstrates CRUD operations for users, brands, categories, sub‑categories, and products, with image upload handling, validation, and basic authentication (signup / login).

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Brands](#brands)
  - [Categories & Sub‑categories](#categories--sub‑categories)
  - [Products](#products)
- [Project Structure](#project-structure)
- [License](#license)

---

## Prerequisites
- **Node.js** >= 18
- **npm** (comes with Node) or **yarn**
- **MongoDB** instance (local or remote). The app uses Mongoose for data persistence.

---

## Installation
```bash
# Clone the repository (skip if you already have the code)
git clone <repo-url>
cd shoppay

# Install dependencies
npm install
```

---

## Configuration
Create a `.env` file in the project root (or copy the provided `config.env` template) with the following keys:
```dotenv
PORT=5000                # Port the server will listen on
MONGO_URI=mongodb://localhost:27017/shoppay   # Your MongoDB connection string
JWT_SECRET=your_jwt_secret_here               # Secret for signing JWT tokens
```
> **Note**: The `config` folder already contains `database.js` which reads `process.env.MONGO_URI`.

---

## Running the Server

The project defines two npm scripts in `package.json`:

```json
"scripts": {
  "start:dev": "NODE_ENV=development nodemon server.js",
  "start:prod": "NODE_ENV=production node server.js"
}
```

- **Development** – `npm run dev` (or `npm run start:dev`) sets `NODE_ENV` to `development` and starts **nodemon**, which automatically restarts the server when source files change. This is convenient for active development.
- **Production** – `npm start` runs the `start:prod` script (the default `npm start` alias). It sets `NODE_ENV` to `production` and launches the server with plain `node server.js`. No hot‑reloading is performed, making it suitable for deployment environments.

> **Tip:** The `NODE_ENV` variable is used throughout the codebase (e.g., in logging, error handling, and configuration) to adjust behavior based on the environment.

You can start the server with:

```bash
# Development mode (auto‑restart)
npm run dev

# Production mode (clean start)
npm start
```

The API will be available at `http://localhost:<PORT>/api` (default `http://localhost:5000/api`).

---

## API Documentation
All routes are prefixed with `/api`.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | Authenticate and receive a JWT |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/users` | List all users |
| GET    | `/api/users/:id` | Get user by ID |
| PUT    | `/api/users/:id` | Update user (protected) |
| DELETE | `/api/users/:id` | Delete user (protected) |

### Brands
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/brands` | List brands |
| POST   | `/api/brands` | Create brand (image upload) |
| GET    | `/api/brands/:id` | Get brand |
| PUT    | `/api/brands/:id` | Update brand |
| DELETE | `/api/brands/:id` | Delete brand |

### Categories & Sub‑categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/categories` | List categories |
| POST   | `/api/categories` | Create category |
| GET    | `/api/categories/:id` | Get category |
| PUT    | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |
| GET    | `/api/categories/:categoryId/subcategories` | List sub‑categories |
| POST   | `/api/categories/:categoryId/subcategories` | Create sub‑category |
| GET    | `/api/subcategories/:id` | Get sub‑category |
| PUT    | `/api/subcategories/:id` | Update sub‑category |
| DELETE | `/api/subcategories/:id` | Delete sub‑category |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/products` | List products (supports filtering, pagination) |
| POST   | `/api/products` | Create product (image upload) |
| GET    | `/api/products/:id` | Get product |
| PUT    | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

---

## Project Structure
```
shoppay/
├── config/                # Configuration (e.g., database connection)
├── middlewares/           # Express middlewares (error handling, validation, upload)
├── models/                # Mongoose models (User, Brand, Category, Product, etc.)
├── routes/                # API route definitions
├── services/              # Business logic for each domain
├── utils/validators/      # Request validators (express‑validator)
├── server.js              # Entry point – sets up Express app
├── package.json           # Scripts, dependencies
└── README.md              # You are reading it!
```

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.
