import fs from "fs"
import path from "path"

const DATA_DIR = path.join(process.cwd(), "data")
const USERS_FILE = path.join(DATA_DIR, "users.json")
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json")

export type User = {
  id: string
  email: string
  username: string
  passwordHash: string
  createdAt: string
}

export type Session = {
  token: string
  userId: string
  email: string
  expiresAt: string
  rememberMe: boolean
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function readJSON<T>(file: string, fallback: T): T {
  try {
    if (!fs.existsSync(file)) return fallback
    return JSON.parse(fs.readFileSync(file, "utf-8")) as T
  } catch {
    return fallback
  }
}

function writeJSON(file: string, data: unknown) {
  ensureDir()
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8")
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export function getUsers(): User[] {
  return readJSON<User[]>(USERS_FILE, [])
}

export function getSessions(): Session[] {
  return readJSON<Session[]>(SESSIONS_FILE, [])
}

export function saveUsers(users: User[]) {
  writeJSON(USERS_FILE, users)
}

export function saveSessions(sessions: Session[]) {
  writeJSON(SESSIONS_FILE, sessions)
}

export function findUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase())
}

export function findUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id)
}

export function pruneExpiredSessions(): Session[] {
  const sessions = getSessions()
  const now = new Date()
  const valid = sessions.filter((s) => new Date(s.expiresAt) > now)
  if (valid.length !== sessions.length) saveSessions(valid)
  return valid
}

export function findSessionByToken(token: string): Session | undefined {
  const sessions = pruneExpiredSessions()
  return sessions.find((s) => s.token === token)
}

export function createSession(userId: string, email: string, rememberMe: boolean): Session {
  const sessions = pruneExpiredSessions()
  const token = generateToken()
  const expiresAt = rememberMe
    ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  const session: Session = { token, userId, email, expiresAt, rememberMe }
  sessions.push(session)
  saveSessions(sessions)
  return session
}

export function removeSession(token: string) {
  const sessions = getSessions().filter((s) => s.token !== token)
  saveSessions(sessions)
}
