import { signJWT, hashPassword } from './jwt.js'

export async function onRequestPost(context) {
  const { request, env } = context
  
  try {
    const body = await request.json()
    const { username, password } = body
    
    if (!username || !password) {
      return new Response(JSON.stringify({ error: "Username and password required" }), { 
        status: 400, headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Hash password input
    const hashedInput = await hashPassword(password)
    
    // Query ke D1 Database
    const { results } = await env.DB.prepare(
      "SELECT id, username, role FROM users WHERE username = ? AND password_hash = ?"
    ).bind(username, hashedInput).all()
    
    if (!results || results.length === 0) {
      return new Response(JSON.stringify({ error: "Kredensial tidak valid" }), { 
        status: 401, headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const user = results[0]
    
    // Generate JWT Token (Expired in 24 hours)
    const exp = Math.floor(Date.now() / 1000) + (24 * 60 * 60)
    const token = await signJWT(
      { sub: user.id, username: user.username, role: user.role, exp },
      env.JWT_SECRET
    )
    
    // Set cookie HTTP Only
    const cookie = `auth_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${24 * 60 * 60}`
    
    return new Response(JSON.stringify({ success: true, user: { username: user.username, role: user.role } }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie
      }
    })
    
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { 
      status: 500, headers: { 'Content-Type': 'application/json' }
    })
  }
}
