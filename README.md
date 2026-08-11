# Tieera Shop

This is a fullstack e-commerce project with two main folders:
- `client-tieera`: frontend app built with Next.js, React, Tailwind CSS, and Redux.
- `server-tieera`: backend API built with Node.js, Express, MySQL, MongoDB, Redis, Stripe, and Cloudinary.

## Project Overview

The project includes:
- user interface for customers and admin
- authentication and registration
- product management, orders, reviews, and favorites
- Stripe payment integration
- real-time support chat with Socket.IO
- image upload and storage with Cloudinary
- session handling with access token and refresh token

## Folder Structure

- `client-tieera/`
  - `src/app/`: Next.js app layout, pages, and configuration
  - `src/components/`: UI components
  - `src/hook/`: custom hooks
  - `src/redux/`: Redux Toolkit state management

- `server-tieera/`
  - `src/app/`: Express app configuration
  - `src/controllers/`: API controllers
  - `src/databases/`: MySQL, MongoDB, Redis, Cloudinary connections
  - `src/middlewares/`: authentication and middleware logic
  - `src/models/`: MySQL and MongoDB schema definitions
  - `src/routes/`: API route definitions
  - `src/socket/`: Socket.IO setup

## Environment Requirements

### Required Software
- Node.js 18+ or compatible
- MySQL
- MongoDB
- Redis
- Cloudinary account (for image uploads)
- Stripe account (for payment processing)

### Environment Variables for `server-tieera`

Create a `.env` file inside `server-tieera/` with the following values:

```env
MYSQL_NAME=...
MYSQL_USER=...
MYSQL_PASSWORD=...
MYSQL_HOST=...
MYSQL_PORT=3306

MONGO_CONNECT_STRING=...

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

JWT_SECRET_KEY=...
REFRESH_SECRET_KEY=...

EMAIL_USER=...
EMAIL_PASS=...

CLOUDINARY_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_SECRET=...

STRIPE_SECRET_KEY=...

GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALLBACK_URL=...
```

### Environment Variables for `client-tieera`

Create a `.env.local` file inside `client-tieera/` if needed:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

If not configured, the frontend defaults to `http://localhost:8000`.

## Installation and Running

### 1. Start the backend server

```bash
cd server-tieera
npm install
npm run dev
```

The server runs on port `8000` by default.

### 2. Start the frontend app

```bash
cd client-tieera
npm install
npm run dev
```

The Next.js frontend runs on port `3000` by default.

## Important Scripts

### `client-tieera/package.json`
- `npm run dev`: start the development server
- `npm run build`: build the production app
- `npm run start`: start the production server
- `npm run lint`: run ESLint checks

### `server-tieera/package.json`
- `npm run dev`: start the server with `nodemon`
- `npm start`: start the server with `node server.js`

## Notes

- Make sure MySQL, MongoDB, and Redis are running before starting the backend.
- Configure Cloudinary correctly if you use image upload.
- Set `GOOGLE_CALLBACK_URL` properly if you use Google login.

## Development Tips

- Open `http://localhost:3000` to access the frontend.
- Use `http://localhost:8000` to test the API directly.
- With `nodemon`, the backend reloads automatically on file changes.

---

Good luck with the project! If you want, I can also create separate focused READMEs for `client-tieera` and `server-tieera`.