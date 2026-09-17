# ReelSchema

Professional AI app that turns free-form **movie descriptions** into **validated structured JSON** using Groq, LangChain, and Pydantic.

```text
Landing page  →  Extract workspace  →  REST API  →  Groq + Pydantic schema
```

---

## Architecture

```text
pydanticProject/
├── backend/                 # FastAPI REST API
│   ├── app/
│   │   ├── main.py          # App factory + middleware
│   │   ├── api/routes/      # HTTP endpoints
│   │   ├── core/            # Settings / config
│   │   ├── models/          # Domain / response models
│   │   ├── schemas/         # Request DTOs
│   │   └── services/        # Business logic (extractor)
│   ├── scripts/             # CLI utilities
│   ├── requirements.txt
│   └── .env.example
├── frontend/                # React + Vite UI
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── context/
│       └── lib/
├── docs/
│   └── DEPLOY.md
├── render.yaml
└── README.md
```

### Backend layers

| Layer | Responsibility |
|-------|----------------|
| `api/routes` | HTTP only (request/response) |
| `schemas` | Incoming request validation |
| `models` | Domain / outgoing Movie schema |
| `services` | AI extraction + parsing logic |
| `core` | Config and shared settings |

### REST API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | API info |
| `GET` | `/health` | Health check |
| `POST` | `/parse` | Extract movie schema from text |

Interactive docs: `http://127.0.0.1:8000/docs`

---

## Quick start (local)

### 1. Backend

```powershell
cd backend
copy .env.example .env
# Add GROQ_API_KEY to .env

..\venv\Scripts\python.exe -m pip install -r requirements.txt
..\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

### 2. Frontend

```powershell
cd frontend
copy .env.example .env
npm install
npm run dev
```

Open http://127.0.0.1:5173

---

## Deploy

See [docs/DEPLOY.md](docs/DEPLOY.md)

- **Frontend** → Vercel (`pydanticProject/frontend`)
- **Backend** → Render (`pydanticProject/backend`)

---

## Tech stack

- **Backend:** FastAPI, Pydantic, LangChain, Groq
- **Frontend:** React 19, Vite, Tailwind CSS, Axios, Framer Motion
