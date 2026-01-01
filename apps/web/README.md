# Horizon TMS (Frontend) — React + Vite

Este ZIP contiene un frontend profesional para **Horizon TMS** con:
- Landing corporativa (Horizon Truck Line LLC)
- Layout App: Sidebar fija (240px), Topbar fija
- Dashboard tipo TMS (KPIs) consumiendo `GET /dashboard`
- Rutas base para módulos: Clients, Drivers, Trucks, Loads, Trips, Invoices
- Tema corporativo: #0A0F24, #1B2A4A, blanco, acentos #F4C542
- Listo para desplegar en Netlify (incluye `netlify.toml` y `_redirects`)

## Requisitos
- Node.js 18+ recomendado

## Instalar y correr
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Variables de entorno
Crea un `.env` en la raíz:
```env
VITE_API_URL=http://localhost:3000
```

## API esperada
- `GET {VITE_API_URL}/dashboard` retorna:
```json
{
  "activeLoads": 12,
  "availableDrivers": 7,
  "revenueThisMonth": 58400,
  "tripsInProgress": 5
}
```

## Deploy (Netlify)
Este proyecto incluye:
- `netlify.toml` (build base)
- `public/_redirects` (SPA routing)
