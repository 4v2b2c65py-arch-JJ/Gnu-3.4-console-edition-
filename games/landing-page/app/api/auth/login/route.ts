import { NextRequest, NextResponse } from "next/server"
import { findUserByEmail, hashPassword, createSession } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password, rememberMe } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = findUserByEmail(email)
    if (!user || !(await hashPassword(password)) || user.passwordHash !== (await hashPassword(password))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const session = createSession(user.id, user.email, !!rememberMe)

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, username: user.username },
    })

    response.cookies.set("leviathan_session", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: session.rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60,
    })

    return response
  } catch (e: any) {
    return NextResponse.json({ error: "Login failed", detail: e?.message }, { status: 500 })
  }
}
