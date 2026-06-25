const BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

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

  return res.status === 204 ? (undefined as T) : ((await res.json()) as T)
}
