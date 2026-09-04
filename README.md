# InlWebbshop

Webbshop-projekt med React + TypeScript frontend och TypeScript backend.

## Struktur

```
├── web/              # React frontend (Vite + TypeScript + MUI)
├── api/              # Express backend (TypeScript)
└── README.md
```

## Frontend (web/)

- React 19 + TypeScript
- Vite
- Material-UI (MUI)
- React Router v7

### Sidor
- `/` - Hem
- `/products` - Produkter
- `/checkout` - Kassa
- `/confirmation` - Bekräftelse

### Köra frontend
```bash
cd web
npm install
npm run dev
```

## Backend (api/)

- Express
- TypeScript
- CORS enabled

### Köra backend
```bash
cd api
npm install
npm run dev
```

Server startar på `http://localhost:3000`

## Databas

Rekommendation: **PostgreSQL** eller **MongoDB**
- PostgreSQL: Bättre för strukturerad data (produkter, ordrar, användare)
- MongoDB: Flexiblare schema, bra för snabb utveckling

Välj under första utvecklingssessionen tillsammans.

## GitHub

Projekt är redo att pushas till GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Project skeleton"
git remote add origin <repo-url>
git push -u origin main
```
