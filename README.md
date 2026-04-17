# Mood2Food API Developer Portal

Standalone React + Vite frontend for the Mood2Food AI API.

## Local development

```bash
npm install
npm run dev
```

## Live API

- Base URL: https://mood2food-api.onrender.com
- Endpoint: `POST /recommend`

Note: the first request can be slow (cold start). The UI shows a “Waking up AI model…” message if a request takes longer than 5 seconds.
