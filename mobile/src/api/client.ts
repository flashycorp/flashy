// REST API client for the mobile app. Auth: Bearer session token (see docs/swagger.yaml).
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8080/v1';

export async function request<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }
  return res.json() as Promise<T>;
}
