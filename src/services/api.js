const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://idcard-backend-urie.onrender.com";
const TOKEN_KEY = "smarttrack_token";
const SESSION_KEY = "smarttrack_session";

export function getToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function saveSession(session) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, session.token);
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function readSession() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(SESSION_KEY);
}

function toQuery(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.set(key, value);
  });
  const text = query.toString();
  return text ? `?${text}` : "";
}

export async function apiRequest(path, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...options.headers
  };
  const token = getToken();
  if (token && options.auth !== false) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_URL}${path}${toQuery(options.query)}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  });

  if (response.status === 204) return null;
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.message || data?.error || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}
