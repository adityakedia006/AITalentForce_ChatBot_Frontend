# Anya — Weather & Fashion Chatbot (Frontend codebase)

By Aditya Kedia

## About the Bot
Anya is a fashion assistant that uses real‑time weather and generative AI to suggest what to wear or pack for your plans. It supports Japanese voice input so you can speak naturally and get tailored, weather‑aware outfit advice.

## Tech Stack Used
- React + TypeScript (Vite)
- TailwindCSS + Radix UI + Shadcn UI
- React Router, TanStack Query
- Lucide icons
- Backend (expected): FastAPI or similar with LLM, ASR (Japanese), and a free Weather API

## Features Available
- Japanese voice input (browser recording → backend transcription)
- Weather‑aware outfit suggestions (backend fetches weather and conditions the prompt)
- Generative AI responses with conversation history
- EN/JA UI toggle and translation of assistant replies
- Text‑to‑Speech playback for assistant messages
- Theme toggle and chat history download and clear.

## How to Setup
1) Prerequisites
	 - Node.js 18+ and npm
	 - A running backend exposing `/api/assist`, `/api/chat`, `/api/text-to-speech`, `/api/translate`
	 - Microphone permission enabled in your browser

2) Install dependencies
```pwsh
npm install
```

3) Configure environment
Create a `.env` in the project root:
```env
VITE_API_BASE_URL=http://localhost:8000
#Optional
VITE_API_FALLBACK_URL=https://your-backup-backend.example.com
```

4) Run locally
```pwsh
npm run dev
```
Open http://localhost:5173 in your browser.

5) Build & preview (optional)
```pwsh
npm run build
npm run preview
```

## Note
- This is a frontend‑only codebase. You need to have a compatible backend running to use the features.
- Please speak in loud and clear for both English and Japanese inputs to get accurate transcriptions.