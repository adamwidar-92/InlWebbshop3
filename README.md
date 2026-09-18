# InlWebbshop 3 – Snusbutik

En webbshop byggd med React, TypeScript och MUI i frontend, samt Express, Prisma och SQLite i backend.

Projektet är en gruppuppgift där vi skapat en komplett webbshop med produktsidor, kundvagn, checkout och admin-hantering av produkter.

## Gruppmedlemmar

- Adam Widar
- Marin P
- George L

## Teknikstack

### Frontend (`web/`)

- React + TypeScript
- Vite
- React Router
- MUI (Material UI)
- Kundvagn via React Context + localStorage

### Backend (`api/`)

- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite

## Designsystem

Vi använder **MUI (Material UI)** för nästan all UI.

Dokumentation: https://mui.com/

## Funktioner

- Startsida med produktlista
- Produktsida med detaljer
- Lägg i kundvagn (header + localStorage)
- Checkout med leveransuppgifter
- Bekräftelsesida med ordernummer
- Admin-sida med CRUD för produkter
- Validering i adminformulär
- Soft delete för produkter (bevarar order-historik)
- Responsiv layout (mobil, tablet, desktop)

## Sidstruktur

| Route                      | Beskrivning              |
| -------------------------- | ------------------------ |
| `/`                        | Startsida / produktlista |
| `/product/:id`             | Produktsida              |
| `/checkout`                | Kassasida                |
| `/confirmation/:orderNumber` | Orderbekräftelse         |
| `/admin`                   | Admin – lista produkter  |
| `/admin/products/new`      | Skapa produkt            |
| `/admin/products/edit/:id` | Redigera produkt         |

## Projektstruktur

```
InlWebbshop3/
├── api/                 # Backend
│   ├── prisma/          # Schema + seed + migrations
│   ├── src/
│   │   ├── index.ts
│   │   ├── db.ts
│   │   └── routes/
│   └── package.json
├── web/                 # Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── types/
│   │   ├── theme.ts
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Kom igång

### Förutsättningar

- Node.js (v16 eller högre)
- npm eller yarn

### 1. Backend (API)

```bash
cd api
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev
```

API:et körs på: `http://localhost:3000`

### 2. Frontend

Öppna en ny terminal:

```bash
cd web
npm install
npm run dev
```

Frontend körs på: `http://localhost:5173`

## Miljövariabler

### Backend (`.env`)

Skapa en `.env`-fil i `api/` mappen:

```env
DATABASE_URL="file:./dev.db"
NODE_ENV="development"
PORT=3000
```

- `DATABASE_URL` – Path till SQLite-databasen
- `NODE_ENV` – `development` eller `production`
- `PORT` – Vilken port API:et ska köra på (default: 3000)

### Frontend

Frontend använder `.env.local` för miljövariabler vid behov. Vite proxy är redan konfigurerad för API-anrop.

## Build för Produktion

### Frontend

```bash
cd web
npm run build
```

Skapar en optimerad `dist/` mapp som kan deployas.

### Backend

```bash
cd api
npm run build  # Om tillgängligt
npm start      # Startar i produktionsläge
```

## Databaskonfiguration

### Prisma Schema

Databasen hanteras via Prisma med SQLite. Migreringar finns i `api/prisma/migrations/`.

#### Seed-data

Seed-data körs automatiskt med `npx prisma db seed`. Det populerar databasen med exempel-produkter:
- Göteborgs Rapé Vit Portion
- Lundgrens Skåne
- G.3 No.02 Slim White Extra Strong
- VELO Guava Passionfruit
- LEWA Power Liquorice & Raspberries

#### För att återställa databasen

```bash
cd api
npx prisma migrate reset  # Varning: Raderar all data!
```

## Testa API:et

### Med curl

```bash
# Hämta alla produkter
curl http://localhost:3000/api/products

# Hämta en specifik produkt
curl http://localhost:3000/api/products/1

# Skapa en beställning (POST)
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com", ...}'
```

### Med Postman eller Thunder Client

1. Importera API-endpoints från sektion **API-endpoints** nedan
2. Testa POST/PUT/DELETE-operationer direkt i appen
3. Verifiera responses innan du integrera i frontend


### Backend-deployment

- Kan deployas på servrar med Node.js stöd (Heroku, Render, DigitalOcean, AWS, Azure, etc.)
- Kräver en produktions-databas (PostgreSQL, MySQL, el. hosting av SQLite)
- Environment variables måste sättas på servrn

### Frontend-deployment

- Bygg med `npm run build`
- Deployad som statiska filer (Vercel, Netlify, Firebase Hosting, etc.)
- Måste peka på production-API:et


### Prisma-migrering misslyckas

```bash
# Återställ databasen
npx prisma migrate reset

# Eller visa status
npx prisma migrate status
```

### CORS-errors från API

Verifiera att Vite-proxyn är konfigurerad i `vite.config.ts`. Bör automatiskt proxy `/api` till `http://localhost:3000`.

## API-endpoints

### Produkter

| Metod  | Endpoint              | Beskrivning          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/products`       | Hämta alla produkter (exkl. raderade) |
| GET    | `/api/products/:id`   | Hämta en produkt     |
| POST   | `/api/products`       | Skapa produkt        |
| PUT    | `/api/products/:id`   | Uppdatera produkt    |
| DELETE | `/api/products/:id`   | Ta bort produkt (soft delete) |

### Beställningar

| Metod | Endpoint                 | Beskrivning      |
| ----- | ------------------------ | ---------------- |
| POST  | `/api/orders`            | Skapa beställning |
| GET   | `/api/orders/:orderNumber` | Hämta beställning |

## Databas

### Prisma-modeller

- `Product` – Produkter i katalogen (med `isDeleted` för soft delete)
- `Order` – Placerade beställningar
- `OrderItem` – Raderna i varje beställning

### Seed-data

Exempel på snusprodukter:
- Göteborgs Rapé Vit Portion
- Lundgrens Skåne
- G.3 No.02 Slim White Extra Strong
- VELO Guava Passionfruit
- LEWA Power Liquorice & Raspberries

## Git & GitHub

Projektet versionshanteras med Git och GitHub. Arbete sker i branches per issue, följt av Pull Request in i `main`.

---

# Checklista – Krav för Godkänt

## Allmänt

- [x] Git & GitHub har använts
- [x] Projektmappen innehåller en README.md fil
- [x] Uppgiften lämnas in i tid!
- [x] Ett designsystem/komponentbibliotek används nästintill helt uteslutande för att bygga sidan (MUI)

## Home

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Startsidan ska lista samtliga produkter.
- [x] Det ska gå att lägga till produkter i kundvagnen (header + localStorage).
- [x] Det ska gå att klicka på en produkt och komma till en detaljsida.
- [x] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

## Produkt

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Detaljsidan ska visa all info om en produkt.
- [x] Det ska gå att lägga till produkten i kundvagnen (header + localStorage).
- [x] Sidan ska vara responsiv och gå att använda på mobil, tablet & desktop.

## Kundvagn & Checkout

- [x] Ska ha en övergripande layout med header, main & footer.
- [x] Det ska gå att gå till checkoutsidan och se innehållet i kundvagnen (knapp & url).
- [x] Det ska gå att se det totala priset i kundvagnen.
- [x] Det ska gå att ändra produkterna i kundvagnen (header + vyn + pris + localStorage).
- [x] Det ska gå att ange leveransuppgifter i ett formulär.
- [x] Samtliga fält för checkoutsidans formulär ska ha valideringsregler.
- [x] Formulären vid utcheckningen ska gå att automatiskt fyllas i.
- [x] Bekräftelsesidan ska visa orderdetaljer och leveransuppgifter.

## Admin

- [x] Det finns en admin-sida för produkthantering
- [x] Det ska gå att se alla produkter på admin sidan
- [x] Det går att lägga till produkter via admin sidan
- [x] Det går att ta bort produkter via admin sidan
- [x] Det går att redigera produkter via admin sidan
- [x] Samtliga fält för adminsidans formulär ska ha valideringsregler
