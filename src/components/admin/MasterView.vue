<template>
  <div class="master-wrapper">
    <div class="master-header">
      <div class="header-title">
        <h1>Panel Master</h1>
        <p>Selamat datang, <strong class="text-accent">{{ user?.username }}</strong></p>
      </div>
      <button class="btn btn-danger" @click="handleLogout" :disabled="isLoggingOut">
        <span v-if="isLoggingOut">Keluar...</span>
        <span v-else>🚪 Logout</span>
      </button>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(99,102,241,0.15); color: var(--accent-primary);">⚡</div>
        <div class="stat-info">
          <h3>Total Lab</h3>
          <p class="val">4</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(16,185,129,0.15); color: var(--accent-emerald);">👥</div>
        <div class="stat-info">
          <h3>Pengguna (D1)</h3>
          <p class="val">1</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background: rgba(245,158,11,0.15); color: var(--accent-amber);">📈</div>
        <div class="stat-info">
          <h3>Status Server</h3>
          <p class="val text-emerald" style="font-size: 1.2rem;">Online</p>
        </div>
      </div>
    </div>

    <div class="master-content">
      <div class="info-panel">
        <strong>⚙️ Mode Master Aktif:</strong> Anda saat ini login menggunakan otentikasi D1 Database via Pages Functions. 
        Fitur pengelolaan konten lab (CRUD) dapat ditambahkan di halaman ini nantinya.
      </div>
      
      <div class="placeholder-box mt-md">
        <h3>Kelola Data (Segera Hadir)</h3>
        <p>Area ini disiapkan untuk manajemen konten dinamis yang terhubung ke Cloudflare D1/Hyperdrive di masa mendatang.</p>
        <button class="btn btn-secondary mt-sm" disabled>Buat Lab Baru</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = inject('toast')
const audio = inject('audio')

const user = ref(null)
const isLoggingOut = ref(false)

async function checkSession() {
  try {
    const res = await fetch('/api/session')
    if (res.ok) {
      const data = await res.json()
      user.value = data.user
    } else {
      // Jika session invalid/expired saat di halaman ini
      router.push('/masuk')
    }
  } catch (err) {
    console.error('Session error:', err)
  }
}

async function handleLogout() {
  isLoggingOut.value = true
  audio?.click()
  try {
    await fetch('/api/logout', { method: 'POST' })
    toast.info('👋 Anda telah keluar')
    router.push('/')
  } catch (err) {
    toast.error('❌ Gagal logout')
  } finally {
    isLoggingOut.value = false
  }
}

onMounted(() => {
  checkSession()
})
</script>

<style scoped>
.master-wrapper {
  padding: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.master-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.header-title h1 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 4px;
}

.header-title p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 54px; height: 54px;
  border-radius: var(--radius-md);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
}

.stat-info h3 {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.stat-info .val {
  font-size: 1.6rem;
  font-weight: 800;
  font-family: var(--font-mono);
  color: var(--text-primary);
}

.master-content {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 24px;
}

.placeholder-box {
  border: 2px dashed var(--border-active);
  border-radius: var(--radius-md);
  padding: 40px 20px;
  text-align: center;
  background: rgba(99,102,241,0.02);
}

.placeholder-box h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.placeholder-box p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  max-width: 500px;
  margin: 0 auto;
}

.mt-md { margin-top: 20px; }
.mt-sm { margin-top: 15px; }
</style>
