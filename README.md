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
- Responsiv layout (mobil, tablet, desktop)

## Sidstruktur

| Route                      | Beskrivning              |
| -------------------------- | ------------------------ |
| `/`                        | Startsida / produktlista |
| `/product/:id`             | Produktsida              |
| `/checkout`                | Kassasida                |
| `/confirmation/:orderId`   | Orderbekräftelse         |
| `/admin`                   | Admin – lista produkter  |
| `/admin/products/new`      | Skapa produkt            |
| `/admin/products/edit/:id` | Redigera produkt         |

## Projektstruktur

```text
InlWebbshop3/
├── api/                 # Backend
│   ├── prisma/          # Schema + seed
│   ├── src/
│   │   ├── index.ts
│   │   └── routes/
│   └── package.json
├── web/                 # Frontend
│   ├── public/bilder/   # Produktbilder
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── types/
│   └── package.json
└── README.md



### Backend (`api/`)
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite

Kom igång
Förutsättningar

Node.js
npm

1. Backend (API)
cd api
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev

API:et körs på: http://localhost:3000


2. Frontend
Öppna en ny terminal:
cd web
npm install
npm run dev
Frontend körs på: http://localhost:5173

Proxy
Frontend använder Vite-proxy så att anrop till /api skickas till backend (
API-endpoints (produkter)

Metod     Endpoint              Beskrivning
GET   /api/products           Hämta alla produkter
GET   /api/products/:id.      Hämta en produkt
POST  /api/products           Skapa produkt
PUT    /api/products/:id      Uppdatera produkt
DELETE  /api/products/:id      Ta bort produkt


Databas
Prisma-modeller:

Product
Order
OrderItem

Seed-data finns bland annat för:

Göteborgs Rapé Vit Portion
Lundgrens Skåne
G.3 No.02 Slim White Extra Strong
VELO Guava Passionfruit
LEWA Power Liquorice & Raspberries
Après Raspberry Liqorice Extra Strong

Git & GitHub
Projektet versionshanteras med Git och GitHub.

Arbete sker i branches per issue, följt av Pull Request in i main.

Checklista – krav

Allmänt

 [x]Git & GitHub har använts
 [x]README.md finns
 [x]Designsystem (MUI) används

Home

 [x]Layout med header, main & footer
 [x]Listar produkter
 [x]Lägg i kundvagn (header + localStorage)
 [x]Klickbara produkter till detaljsida
 [x]Responsiv

Produkt

 [x]Layout med header, main & footer
 [x]Visar all produktinfo
 [x]Lägg i kundvagn
 [x]Responsiv

Kundvagn & Checkout

 [x]Checkout via knapp & URL
 [x]Totalpris
 [x]Uppdatera/ta bort i kundvagn
 [x]Leveransformulär
 [x]Validering
 [x]Bekräftelsesida med orderdetaljer

Admin

 [x]Admin-sida finns
 [x]Lista produkter
 [x]Skapa produkt
 [x]Ta bort produkt
 [x]Redigera produkt
 [x]Validering i formulär