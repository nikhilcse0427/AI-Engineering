# ReelSchema — Deploy Guide (Vercel + Render)

## Project layout

```text
pydanticProject/
├── backend/          ← Render root directory
├── frontend/         ← Vercel root directory = pydanticProject/frontend
├── docs/
└── render.yaml
```

---

## Part A — Deploy API (Render)

1. Open [render.com](https://render.com) → **New Web Service**
2. Connect GitHub repo `AI-Structured-Data-Extractor`
3. Settings:

| Setting | Value |
|---------|-------|
| Root Directory | `pydanticProject/backend` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |

4. Environment variables:

```text
GROQ_API_KEY=your_key
ALLOWED_ORIGINS=http://localhost:5173
PYTHON_VERSION=3.11.9
```

5. Deploy and test:

```text
https://YOUR-API.onrender.com/health
```

---

## Part B — Deploy frontend (Vercel)

1. Open [vercel.com](https://vercel.com) → **New Project**
2. Settings:

| Setting | Value |
|---------|-------|
| Root Directory | `pydanticProject/frontend` |
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |

3. Environment variable:

```text
VITE_API_URL=https://YOUR-API.onrender.com
```

4. Deploy and copy your Vercel URL.

---

## Part C — Connect CORS

On Render, update:

```text
ALLOWED_ORIGINS=https://YOUR-APP.vercel.app,http://localhost:5173
```

Redeploy/restart the API.

---

## Local development

```powershell
# Backend
cd pydanticProject\backend
..\venv\Scripts\python.exe -m pip install -r requirements.txt
..\venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000

# Frontend
cd pydanticProject\frontend
npm run dev
```

API docs: http://127.0.0.1:8000/docs
