import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { findSessionByToken } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("leviathan_session")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized", detail: "no token" }, { status: 401 })
    }

    const session = findSessionByToken(token)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized", detail: "no session" }, { status: 401 })
    }

  const filePath = path.join(process.cwd(), "public", "LeviathanSetup.exe")
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Installer not found" }, { status: 404 })
  }

  const stat = fs.statSync(filePath)
  const fileBuffer = fs.readFileSync(filePath)

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="LeviathanSetup.exe"`,
      "Content-Length": stat.size.toString(),
      "Cache-Control": "no-store",
    },
  })
  } catch (e: any) {
    return NextResponse.json({ error: "Download failed", detail: e?.message }, { status: 500 })
  }
}
