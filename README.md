# Account Recovery Dashboard

A full-stack account recovery management platform with a dark neon UI.

## Stack
- **Backend**: Node.js + Express
- **Frontend**: Vanilla HTML/CSS/JS (no build step)
- **Deploy**: Railway-ready

## Local Development

```bash
npm install
npm start
```

Open http://localhost:3000

## Deploy to Railway

### Option A — GitHub (recommended)
1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select your repo — Railway auto-detects Node.js and deploys

### Option B — Railway CLI
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Option C — Drag & Drop
Zip this folder and drag it into Railway's dashboard.

## Environment Variables
| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Server port (Railway sets this automatically) |

## Production Notes
- Currently uses in-memory storage — requests reset on redeploy
- To persist data, connect a Railway PostgreSQL or Redis plugin and update `server.js`
- Add a `DATABASE_URL` env var and swap the in-memory array for a proper DB client
