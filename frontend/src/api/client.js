import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // cookie flashy_session
})

const get = (url, params) => api.get(url, { params }).then((r) => r.data)
const post = (url, data) => api.post(url, data).then((r) => r.data)
const patch = (url, data) => api.patch(url, data).then((r) => r.data)
const put = (url, data) => api.put(url, data).then((r) => r.data)
const del = (url) => api.delete(url).then((r) => r.data)

export const authApi = {
  login: (data) => post('/auth/login', data),
  register: (data) => post('/auth/register', data),
  logout: () => post('/auth/logout'),
  me: () => get('/users/me'),
  googleUrl: `${import.meta.env.VITE_API_URL}/auth/google`,
  createQr: () => post('/auth/qr/sessions'),
  checkQr: (token) => get(`/auth/qr/sessions/${token}`),
}

export const decksApi = {
  list: (params) => get('/decks', params),
  get: (id) => get(`/decks/${id}`),
  create: (data) => post('/decks', data),
  update: (id, data) => patch(`/decks/${id}`, data),
  remove: (id) => del(`/decks/${id}`),
  cards: (deckId, params) => get(`/decks/${deckId}/cards`, params),
  addCard: (deckId, data) => post(`/decks/${deckId}/cards`, data),
  updateCard: (cardId, data) => patch(`/cards/${cardId}`, data),
  removeCard: (cardId) => del(`/cards/${cardId}`),
  publish: (id) => post(`/decks/${id}/publish`),
}

export const studyApi = {
  start: (deckId, mode) => post('/study/sessions', { deckId, mode }),
  queue: (deckId, mode) => get(`/decks/${deckId}/study/queue`, { mode }),
  review: (sessionId, data) => post(`/study/sessions/${sessionId}/reviews`, data),
  finish: (sessionId) => post(`/study/sessions/${sessionId}/finish`),
  choices: (cardId) => get(`/cards/${cardId}/choices`),
}

export const catalogApi = {
  list: (params) => get('/catalog/decks', params),
  get: (id) => get(`/catalog/decks/${id}`),
  copy: (id) => post(`/catalog/decks/${id}/copy`),
  rate: (id, value) => put(`/catalog/decks/${id}/rating`, { value }),
  favorite: (id) => put(`/catalog/decks/${id}/favorite`),
  unfavorite: (id) => del(`/catalog/decks/${id}/favorite`),
}

export const statsApi = {
  overview: () => get('/stats/overview'),
  activity: (from, to) => get('/stats/activity', { from, to }),
}

export const adminApi = {
  users: (params) => get('/admin/users', params),
  setStatus: (userId, status) => patch(`/admin/users/${userId}/status`, { status }),
  stats: () => get('/admin/stats/platform'),
}

export default api