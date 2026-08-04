import { verifyJWT } from '../jwt.js'
import bcrypt from 'bcryptjs'

// Helper untuk mengecek JWT
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

// GET /api/users -> Ambil daftar user
export async function onRequestGet(context) {
  const { request, env } = context
  const auth = await checkAuth(request, env)
  
  if (!auth) return new Response('Unauthorized', { status: 401 })

  try {
    const { results } = await env.DB.prepare(
      "SELECT id_user as id, username, role_user as role, created_at FROM data_users ORDER BY created_at DESC"
    ).all()
    
    return new Response(JSON.stringify({ success: true, data: results }), {
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

// POST /api/users -> Buat user baru
export async function onRequestPost(context) {
  const { request, env } = context
  const auth = await checkAuth(request, env)
  
  if (!auth) return new Response('Unauthorized', { status: 401 })
  
  // Hanya master yang boleh menambah user baru
  if (auth.role !== 'master') return new Response('Forbidden', { status: 403 })

  try {
    const body = await request.json()
    const { username, password, role = 'admin' } = body
    
    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username dan password dibutuhkan' }), { status: 400 })
    }
    
    // Cek apakah username sudah ada
    const existing = await env.DB.prepare("SELECT id_user as id FROM data_users WHERE username = ?").bind(username).first()
    if (existing) {
      return new Response(JSON.stringify({ error: 'Username sudah digunakan' }), { status: 400 })
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    const { success } = await env.DB.prepare(
      "INSERT INTO data_users (username, password, role_user, nama_pengguna) VALUES (?, ?, ?, ?)"
    ).bind(username, hash, role, username).run()
    
    if (success) {
      return new Response(JSON.stringify({ success: true, message: 'User berhasil dibuat' }), {
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      throw new Error('Gagal menyimpan ke database')
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
