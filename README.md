# ⚡ URL Shortener

A full-stack URL shortener with click analytics and custom aliases, built with React, Node.js/Express, and PostgreSQL.

## 🔗 Live Demo

- **Frontend:** https://url-shortener-ruddy-tau.vercel.app
- **Backend:** https://url-shortener-kxak.onrender.com

---

## ✨ Features

- Shorten any long URL into a compact link
- Custom aliases (e.g. `/my-link`)
- Click analytics — track how many times each link is visited
- Delete links
- Redirects instantly to the original URL

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | PostgreSQL (Neon) |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## 📁 Project Structure

```
url-shortener/
├── server/
│   ├── index.js          ← Express entry point
│   ├── db.js             ← PostgreSQL connection
│   ├── routes/
│   │   └── links.js      ← API routes
│   └── .env              ← Environment variables (git ignored)
└── client/
    └── src/
        ├── App.jsx
        ├── api.js
        └── components/
            ├── ShortenForm.jsx
            └── Analytics.jsx
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL (local) or a Neon account

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2. Set up the database

Run this SQL on your PostgreSQL instance:

```sql
CREATE TABLE links (
  id          SERIAL PRIMARY KEY,
  original    TEXT        NOT NULL,
  slug        VARCHAR(20) NOT NULL UNIQUE,
  clicks      INTEGER     DEFAULT 0,
  created_at  TIMESTAMP   DEFAULT NOW()
);

CREATE INDEX idx_links_slug ON links(slug);
```

### 3. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/urlshortener
PORT=4000
BASE_URL=http://localhost:4000
```

Start the server:

```bash
npm run dev
```

### 4. Set up the frontend

```bash
cd client
npm install
```

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:4000
```

Start the frontend:

```bash
npm run dev
```

The app will be running at **http://localhost:5173**

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/links` | Create a new short link |
| `GET` | `/api/links` | Get all links with analytics |
| `GET` | `/:slug` | Redirect to original URL + track click |
| `DELETE` | `/api/links/:slug` | Delete a link |

### Example — Create a short link

```bash
curl -X POST http://localhost:4000/api/links \
  -H "Content-Type: application/json" \
  -d '{"original": "https://google.com", "alias": "goog"}'
```

Response:
```json
{
  "id": 1,
  "original": "https://google.com",
  "slug": "goog",
  "clicks": 0,
  "created_at": "2026-04-08T10:00:00.000Z"
}
```

---

## 🌍 Deployment

### Backend — Render

1. Create a new Web Service on Render
2. Connect your GitHub repo
3. Set Root Directory to `server`
4. Set Start Command to `node index.js`
5. Add environment variable: `DATABASE_URL` = your Neon connection string

### Frontend — Vercel

1. Create a new project on Vercel
2. Connect your GitHub repo
3. Set Root Directory to `client`
4. Add environment variable: `VITE_API_URL` = your Render backend URL

---

## 📄 License

MIT
