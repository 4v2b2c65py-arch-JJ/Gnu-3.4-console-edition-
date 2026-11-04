import { NextRequest, NextResponse } from "next/server"
import { findUserByEmail, getUsers, saveUsers, hashPassword, createSession } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const text = await req.text()
    let body: any
    try {
      body = JSON.parse(text)
    } catch {
      return NextResponse.json({ error: "Invalid JSON body", detail: text?.slice(0, 200) }, { status: 400 })
    }
    const { email, password, username } = body

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Email, password, and username are required" }, { status: 400 })
    }

    if (findUserByEmail(email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)

    const user = {
      id: generateTokenId(),
      email,
      username,
      passwordHash,
      createdAt: new Date().toISOString(),
    }

    const users = getUsers()
    users.push(user)
    saveUsers(users)

    const session = createSession(user.id, user.email, false)

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, username: user.username },
    })

    response.cookies.set("leviathan_session", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60,
    })

    return response
  } catch (e: any) {
    return NextResponse.json({ error: "Signup failed", detail: e?.message }, { status: 500 })
  }
}

function generateTokenId(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("")
}
