import { request } from './http.js';

export function login(credentials) {
  return request('/auth/login', { method: 'POST', body: credentials });
}

export function logout() {
  return request('/auth/logout', { method: 'POST' });
}

export function me() {
  return request('/auth/me');
}
