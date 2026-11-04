import { NextRequest, NextResponse } from "next/server"
import { findSessionByToken } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const token = req.cookies.get("leviathan_session")?.value
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  const session = findSessionByToken(token)
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({
    authenticated: true,
    user: { id: session.userId, email: session.email },
  })
}
