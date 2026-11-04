import { NextResponse } from "next/server"
import { removeSession } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete("leviathan_session")
  return response
}
