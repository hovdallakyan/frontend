// Base URL for the NestJS backend. In dev, '/api' is proxied to the backend
// by Vite (see vite.config.ts). In prod, override via VITE_API_URL.
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

/** Thin fetch wrapper that returns parsed JSON and throws on non-2xx. */
export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })

  if (!res.ok) {
    throw new Error(`Request failed (${res.status}): ${res.statusText}`)
  }

  // 204 No Content has no body to parse.
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T)
}
