// Helper functions untuk JWT tanpa library eksternal (menggunakan Web Crypto API)
// Cloudflare Workers Native

function base64urlEncode(source) {
  let encoded = btoa(String.fromCharCode.apply(null, new Uint8Array(source)))
  return encoded.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function base64urlDecode(str) {
  let padded = str + '='.repeat((4 - (str.length % 4)) % 4)
  let base64 = padded.replace(/-/g, '+').replace(/_/g, '/')
  let binary = atob(base64)
  let bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}

export async function signJWT(payload, secret) {
  const encoder = new TextEncoder()
  
  const header = { alg: 'HS256', typ: 'JWT' }
  const encodedHeader = base64urlEncode(encoder.encode(JSON.stringify(header)))
  const encodedPayload = base64urlEncode(encoder.encode(JSON.stringify(payload)))
  
  const data = encoder.encode(`${encodedHeader}.${encodedPayload}`)
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  )
  
  const signature = await crypto.subtle.sign('HMAC', key, data)
  const encodedSignature = base64urlEncode(signature)
  
  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`
}

export async function verifyJWT(token, secret) {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  
  const [encodedHeader, encodedPayload, encodedSignature] = parts
  const encoder = new TextEncoder()
  const data = encoder.encode(`${encodedHeader}.${encodedPayload}`)
  const signature = base64urlDecode(encodedSignature)
  
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['verify']
  )
  
  const isValid = await crypto.subtle.verify('HMAC', key, signature, data)
  
  if (!isValid) return null
  
  try {
    const payloadStr = new TextDecoder().decode(base64urlDecode(encodedPayload))
    return JSON.parse(payloadStr)
  } catch {
    return null
  }
}

// Fungsi untuk hashing password menggunakan SHA-256
export async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
