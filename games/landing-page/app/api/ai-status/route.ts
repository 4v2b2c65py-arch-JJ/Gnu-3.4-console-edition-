import { NextRequest, NextResponse } from "next/server"

const MODEL = process.env.HF_MODEL_ID || "meta-llama/Llama-3.1-8B-Instruct"
const HF_TOKEN = process.env.HF_TOKEN

export async function GET(req: NextRequest) {
  const assets = Math.floor(Math.random() * 80) + 412
  return NextResponse.json({
    model: MODEL,
    provider: HF_TOKEN ? "huggingface" : "local",
    lastUpdate: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    assets,
    source: "huggingface_hub",
  })
}

export const dynamic = "force-dynamic"
