---
# API Documentation for shoppay

All endpoints are prefixed with `/api` and respond with JSON. Errors are returned with appropriate HTTP status codes and a message field.

## Authentication
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/auth/signup` | Register a new user and receive a JWT token. | `{ "name": "string", "email": "string", "password": "string" }` |
| POST | `/auth/login` | Authenticate an existing user and receive a JWT token. | `{ "email": "string", "password": "string" }` |

> The returned token must be included in the `Authorization` header for protected routes: `Authorization: Bearer <token>`.

## Users
| Method | Endpoint | Description | Protected? | Request Body |
|--------|----------|-------------|------------|--------------|
| GET | `/users` | Retrieve a list of all users. | ✅ | – |
| GET | `/users/:id` | Retrieve a single user by its MongoDB ID. | ✅ | – |
| PUT | `/users/:id` | Update user fields (name, email, password). | ✅ | `{ "name?": "string", "email?": "string", "password?": "string" }` |
| DELETE | `/users/:id` | Delete a user account. | ✅ | – |

## Brands
| Method | Endpoint | Description | Protected? | Request Body |
|--------|----------|-------------|------------|--------------|
| GET | `/brands` | List all brands. | – | – |
| POST | `/brands` | Create a brand with optional image upload. | ✅ | `multipart/form-data` with fields `name` (string) and `image` (file). |
| GET | `/brands/:id` | Get a single brand. | – | – |
| PUT | `/brands/:id` | Update brand details and/or image. | ✅ | `multipart/form-data` with optional `name` and `image`. |
| DELETE | `/brands/:id` | Remove a brand. | ✅ | – |

## Categories & Sub‑categories
### Categories
| Method | Endpoint | Description | Protected? | Request Body |
|--------|----------|-------------|------------|--------------|
| GET | `/categories` | List all categories. | – | – |
| POST | `/categories` | Create a category (image optional). | ✅ | `multipart/form-data` with `name` and optional `image`. |
| GET | `/categories/:id` | Retrieve a category. | – | – |
| PUT | `/categories/:id` | Update a category. | ✅ | `multipart/form-data` with optional `name` and `image`. |
| DELETE | `/categories/:id` | Delete a category. | ✅ | – |

### Sub‑categories (nested under a category)
| Method | Endpoint | Description | Protected? | Request Body |
|--------|----------|-------------|------------|--------------|
| GET | `/categories/:categoryId/subcategories` | List sub‑categories for a parent category. | – | – |
| POST | `/categories/:categoryId/subcategories` | Create a sub‑category under the given category. | ✅ | `multipart/form-data` with `name` and optional `image`. |
| GET | `/subcategories/:id` | Retrieve a sub‑category by its own ID. | – | – |
| PUT | `/subcategories/:id` | Update a sub‑category. | ✅ | `multipart/form-data` with optional `name` and `image`. |
| DELETE | `/subcategories/:id` | Delete a sub‑category. | ✅ | – |

## Products
| Method | Endpoint | Description | Protected? | Request Body |
|--------|----------|-------------|------------|--------------|
| GET | `/products` | List products. Supports query parameters for filtering, sorting, and pagination (e.g., `?page=2&limit=10&brand=abc`). | – | – |
| POST | `/products` | Create a product with image upload. | ✅ | `multipart/form-data` with fields: `name`, `price`, `description`, `brand`, `category`, `subCategory`, `image`. |
| GET | `/products/:id` | Retrieve a single product. | – | – |
| PUT | `/products/:id` | Update product data and/or replace the image. | ✅ | `multipart/form-data` with any of the above fields. |
| DELETE | `/products/:id` | Delete a product. | ✅ | – |

---

## Common Error Format
```json
{
  "error": "Message describing the problem",
  "status": 400
}
```

## Validation Middleware
Each route uses express‑validator middleware (`utils/validators/*Validator.js`). Validation errors are returned with a 422 status and a `errors` array detailing the failed fields.

---

## Notes
- Image handling is performed by `multer` and stored in the `uploads/` directory.
- All protected routes expect a valid JWT token; the `auth` middleware extracts the user ID and attaches it to `req.user`.
- Pagination uses `page` (default 1) and `limit` (default 10) query parameters.
- Filtering on products can be done via query strings: `brand`, `category`, `price[gte]`, `price[lte]`, `keyword` (searches name/description).

---

# License
MIT – see the `LICENSE` file.
