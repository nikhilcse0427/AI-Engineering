# Frontend — ReelSchema UI

React + Vite app for the movie schema extractor.

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Env

```text
VITE_API_URL=http://127.0.0.1:8000
```

## Structure

```text
src/
├── components/   # Reusable UI
├── pages/        # Landing, Extract, NotFound
├── layouts/      # App shell
├── context/      # Theme / toast providers
└── lib/          # API client + history helpers
```
