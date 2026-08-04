import { signJWT } from './jwt.js'
import bcrypt from 'bcryptjs'

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
    
    // Query ke D1 Database berdasarkan username
    const { results } = await env.DB.prepare(
      "SELECT id_user as id, username, password as password_hash, role_user as role FROM data_users WHERE username = ?"
    ).bind(username).all()
    
    if (!results || results.length === 0) {
      return new Response(JSON.stringify({ error: "Kredensial tidak valid" }), { 
        status: 401, headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const user = results[0]
    
    // Verifikasi password dengan bcrypt
    const isValid = await bcrypt.compare(password, user.password_hash)
    
    if (!isValid) {
      return new Response(JSON.stringify({ error: "Kredensial tidak valid" }), { 
        status: 401, headers: { 'Content-Type': 'application/json' }
      })
    }
    
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
