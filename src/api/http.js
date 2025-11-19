export async function request(path, opts = {}) {
  const base = import.meta.env.VITE_API_BASE || '/api'
  const url = path.startsWith('http') ? path : `${base}${path}`

  const defaultHeaders = { 'Content-Type': 'application/json' }

  if (opts.body && typeof opts.body === 'object') {
    opts.body = JSON.stringify(opts.body) // convert JS object to JSON string
  }

  opts.headers = { ...defaultHeaders, ...(opts.headers || {}) }

  const res = await fetch(url, opts) // make API call
  const text = await res.text()

  try {
    return text ? JSON.parse(text) : null // parse JSON response
  } catch {
    return text // fallback if not JSON
  }
}
