# InlWebbshop 3 – Snusbutik

En webbshop byggd med React, TypeScript och MUI i frontend, samt Express, Prisma och SQLite i backend.

Projektet är en gruppuppgift där vi skapat en komplett webbshop med produktsidor, kundvagn, checkout och admin-hantering av produkter.

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

- Node.js
- npm

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

### Proxy

Frontend använder Vite-proxy så att anrop till `/api` skickas till backend.

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
