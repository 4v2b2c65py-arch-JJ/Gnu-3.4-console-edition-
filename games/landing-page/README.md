# Leviathan Game Landing Page
# HoYoverse/Rockstar-inspired cinematic design with AI auto-updates

## Quick start
npm install
npm run dev
# Open http://localhost:3000

## Environment
cp .env.example .env.local
# Set HF_MODEL_ID and optionally HF_TOKEN

## Image assets (drop these in)
public/hero.png                  — Hero / live render artwork
public/characters/placeholder.png — Character card images

## Tech stack
Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, GSAP, Lenis

## AI status
/api/ai-status reads HF_MODEL_ID from your environment (replaces the old Kimi API).
The bottom-left AI Core badge auto-updates every 15s.
