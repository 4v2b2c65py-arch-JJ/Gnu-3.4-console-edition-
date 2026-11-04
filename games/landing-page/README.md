# Leviathan Game Landing Page
HoYoverse/Rockstar-inspired cinematic design with AI auto-updates.

## Live Portal
🌐 **Vercel:** https://leviathan.vercel.app (deploy via Vercel — see below)

## Quick start
npm install
npm run dev
# Open http://localhost:3001

## Environment
cp .env.example .env.local
# Set HF_MODEL_ID and optionally HF_TOKEN

## Image assets (drop these in)
public/hero.png                  — Hero / live render artwork
public/characters/placeholder.png — Character card images

## Tech stack
Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v3, Framer Motion, Lenis

## AI status
/api/ai-status reads HF_MODEL_ID from your environment (replaces the old Kimi API).
The bottom-left AI Core badge auto-updates every 15s.

## Deploy on Vercel
1. Push this repo to GitHub (done: https://github.com/4v2b2c65py-arch-JJ/Leviathan)
2. Go to https://vercel.com and click "Add New Project"
3. Import the `Leviathan` repository
4. Set **Root Directory** to `games/landing-page`
5. Framework preset: Next.js (auto-detected)
6. Add Environment Variables:
   - `HF_MODEL_ID` (e.g. `meta-llama/Llama-3.1-8B-Instruct`)
   - `HF_TOKEN` (optional, for gated models)
7. Click Deploy — your portal goes live on a `*.vercel.app` domain

## Routes
- `/` — Landing page (Hero, World, Characters, NPC Monitor, Server Status, Launcher)
- `/signup` — Account creation
- `/login` — Sign in
- `/launcher` — Launcher download
- `/api/ai-status` — AI core status (Hugging Face model)
