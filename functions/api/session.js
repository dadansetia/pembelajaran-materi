import { verifyJWT } from './jwt.js'

export async function onRequestGet(context) {
  const { request, env } = context
  
  const cookieHeader = request.headers.get('Cookie') || ''
  const cookies = Object.fromEntries(cookieHeader.split(';').map(c => {
    const [k, v] = c.trim().split('=')
    return [k, v]
  }))
  
  const token = cookies['auth_session']
  
  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { 
      status: 401, headers: { 'Content-Type': 'application/json' }
    })
  }
  
  const payload = await verifyJWT(token, env.JWT_SECRET)
  
  if (!payload) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { 
      status: 401, headers: { 'Content-Type': 'application/json' }
    })
  }
  
  // Check expiration
  if (payload.exp && Math.floor(Date.now() / 1000) > payload.exp) {
    return new Response(JSON.stringify({ error: "Token expired" }), { 
      status: 401, headers: { 'Content-Type': 'application/json' }
    })
  }
  
  return new Response(JSON.stringify({ success: true, user: { username: payload.username, role: payload.role } }), {
    status: 200, headers: { 'Content-Type': 'application/json' }
  })
}
