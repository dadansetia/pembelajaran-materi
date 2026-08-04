import { verifyJWT } from '../jwt.js'
import bcrypt from 'bcryptjs'

async function checkAuth(request, env) {
  const cookieHeader = request.headers.get('Cookie') || ''
  const cookies = Object.fromEntries(cookieHeader.split(';').map(c => {
    const [k, v] = c.trim().split('=')
    return [k, v]
  }))
  const token = cookies['auth_session']
  if (!token) return null
  return await verifyJWT(token, env.JWT_SECRET)
}

// PUT /api/users/:id -> Update user
export async function onRequestPut(context) {
  const { request, env, params } = context
  const userId = params.id
  const auth = await checkAuth(request, env)
  
  if (!auth) return new Response('Unauthorized', { status: 401 })
  if (auth.role !== 'master') return new Response('Forbidden', { status: 403 })

  try {
    const body = await request.json()
    const { username, password, role } = body
    
    // Cek apakah user exist
    const existing = await env.DB.prepare("SELECT id_user as id FROM data_users WHERE id_user = ?").bind(userId).first()
    if (!existing) return new Response(JSON.stringify({ error: 'User tidak ditemukan' }), { status: 404 })

    // Jika username diubah, cek duplikasi
    if (username) {
      const checkName = await env.DB.prepare("SELECT id_user as id FROM data_users WHERE username = ? AND id_user != ?").bind(username, userId).first()
      if (checkName) return new Response(JSON.stringify({ error: 'Username sudah digunakan' }), { status: 400 })
    }

    let query = "UPDATE data_users SET "
    let bindings = []
    let updates = []

    if (username) { updates.push("username = ?"); bindings.push(username) }
    if (role) { updates.push("role_user = ?"); bindings.push(role) }
    if (password) { 
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
      updates.push("password = ?"); bindings.push(hash) 
    }

    if (updates.length === 0) return new Response(JSON.stringify({ success: true }))

    query += updates.join(", ") + " WHERE id_user = ?"
    bindings.push(userId)

    await env.DB.prepare(query).bind(...bindings).run()
    
    return new Response(JSON.stringify({ success: true, message: 'User diupdate' }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

// DELETE /api/users/:id -> Delete user
export async function onRequestDelete(context) {
  const { request, env, params } = context
  const userId = params.id
  const auth = await checkAuth(request, env)
  
  if (!auth) return new Response('Unauthorized', { status: 401 })
  if (auth.role !== 'master') return new Response('Forbidden', { status: 403 })

  // Jangan izinkan master menghapus dirinya sendiri
  if (auth.sub.toString() === userId.toString()) {
    return new Response(JSON.stringify({ error: 'Tidak dapat menghapus akun Anda sendiri' }), { status: 400 })
  }

  try {
    await env.DB.prepare("DELETE FROM data_users WHERE id_user = ?").bind(userId).run()
    
    return new Response(JSON.stringify({ success: true, message: 'User dihapus' }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
