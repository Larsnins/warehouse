export async function request(path, opts = {}) {
  const base = import.meta.env.VITE_API_BASE || '/api'
  const url = path.startsWith('http') ? path : `${base}${path}`
  const defaultHeaders = { 'Content-Type': 'application/json' }

  if (opts.body && typeof opts.body === 'object') {
    opts.body = JSON.stringify(opts.body)
  }

  opts.headers = { ...defaultHeaders, ...(opts.headers || {}) }

  const res = await fetch(url, opts)
  const text = await res.text()

  try {
    return text ? JSON.parse(text) : null
  } catch {
    return text
  }
}
