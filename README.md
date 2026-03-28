# CineArchive — Backend

Node.js + Express REST API that proxies OMDB movie requests and manages per-session favourites using an in-memory store.

---

## Tech Stack

Node.js + Express
Axios — OMDB API calls
dotenv — environment config

---

## Setup

npm install

Create a `.env` file:

OMDB_API_KEY=your_key_here
PORT=5000
CLIENT_URL=http://localhost:5173


> Get a free OMDB API key at [omdbapi.com](https://www.omdbapi.com/apikey.aspx)

Run the dev server:

npm run dev

Runs at http://localhost:5000

---

## API Endpoints


| `GET` | `/api/movies/search?q=inception&page=1` | Search movies |
| `GET` | `/api/movies/details?imdbID=tt1375666` | Get movie details |
| `GET` | `/api/movies/favorites?sessionId=abc` | Get favourites |
| `POST` | `/api/movies/favorites` | Add to favourites |
| `DELETE` | `/api/movies/favorites/:imdbID?sessionId=abc` | Remove from favourites |
| `GET` | `/health` | Health check |

---

## Structure

backend/
├── controllers/      # movieController.js — req/res handling
├── routes/           # movieRoutes.js — URL definitions
├── services/         # movieService.js — business logic + OMDB calls
├── store/            # favouriteStore.js — in-memory data layer
└── index.js          # Entry point

## Key Decisions

**No database** — favourites are stored in a plain JS object in memory, keyed by session ID. Resets on server restart. Easily swappable for MongoDB or file-based storage by only changing `favouriteStore.js`.

**Layered architecture** — routes → controllers → services → store. Each layer has one responsibility, making the code easy to follow and extend.

**Session separation** — each user's favourites are isolated by a session ID passed from the frontend. No authentication needed.

**ESM syntax** — consistent modern `import`/`export` throughout.