# ShopPay

Full-stack ecommerce application.

| Folder     | Description                                    |
| ---------- | ---------------------------------------------- |
| `client/`  | React (Create React App) storefront + admin UI |
| `server/`  | Express + MongoDB (Mongoose) REST API          |

## Setup

```bash
npm run install:all
```

Configuration:

- `server/config.env` — database, JWT, Redis, Stripe/Paymob keys, `CORS_ORIGIN` (see `server/README.md` / `server/API_DOCUMENTATION.md`)
- `client/.env` — copy from `client/.env.example`; `REACT_APP_API_URL` points at the API (default `http://localhost:8000`)

## Development

Requires MongoDB and Redis running locally.

```bash
npm run dev
```

- Server: http://localhost:8000
- Client: http://localhost:3000

## Production

- `npm run build:client` — builds the SPA into `client/build/`, host it on any static host (Vercel/Netlify). Set `REACT_APP_API_URL` at build time and set `CORS_ORIGIN` in the server env to the frontend origin.
- `npm run start:server` — starts the API in production mode.
