export async function onRequestPost(context) {
  // Menghapus cookie dengan mengatur Max-Age=0 dan Expires ke masa lalu
  const cookie = 'auth_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
  
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': cookie
    }
  })
}
