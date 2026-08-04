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

    <!-- Tabs -->
    <div class="master-tabs">
      <button class="tab-btn" :class="{ active: activeTab === 'dashboard' }" @click="activeTab = 'dashboard'">📊 Dashboard</button>
      <button class="tab-btn" :class="{ active: activeTab === 'users' }" @click="activeTab = 'users'">👥 Manajemen Users</button>
    </div>

    <!-- Tab: Dashboard -->
    <div v-if="activeTab === 'dashboard'" class="master-content">
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
            <h3>Total Users</h3>
            <p class="val">{{ users.length }}</p>
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
      <div class="info-panel">
        <strong>⚙️ Mode Master Aktif:</strong> Anda saat ini login menggunakan otentikasi D1 Database via Pages Functions.
      </div>
    </div>

    <!-- Tab: Users -->
    <div v-if="activeTab === 'users'" class="master-content">
      <div class="flex-between mb-md">
        <h2>Data Pengguna (Admin)</h2>
        <button class="btn btn-primary" @click="openModal('add')">➕ Tambah User</button>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Role</th>
              <th>Dibuat Pada</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="isLoadingUsers"><td colspan="5" class="text-center">Memuat data...</td></tr>
            <tr v-else-if="users.length === 0"><td colspan="5" class="text-center">Belum ada user</td></tr>
            <tr v-for="u in users" :key="u.id">
              <td>{{ u.id }}</td>
              <td><strong>{{ u.username }}</strong></td>
              <td><span class="badge" :class="u.role === 'master' ? 'badge-fase-f' : 'badge-fase-e'">{{ u.role }}</span></td>
              <td>{{ new Date(u.created_at).toLocaleDateString() }}</td>
              <td class="action-cell">
                <button class="btn-icon text-accent" @click="openModal('edit', u)" title="Edit">✏️</button>
                <button class="btn-icon text-rose" @click="handleDeleteUser(u.id)" title="Hapus" :disabled="u.id === user.id">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form User -->
    <div class="modal-backdrop" v-if="showModal" @click.self="showModal = false">
      <div class="modal-box">
        <h3>{{ modalMode === 'add' ? 'Tambah User Baru' : 'Edit User' }}</h3>
        <form @submit.prevent="submitUser">
          <div class="form-group">
            <label>Username</label>
            <input type="text" v-model="formData.username" required placeholder="Masukkan username">
          </div>
          <div class="form-group">
            <label>Password <span v-if="modalMode === 'edit'" style="font-size:0.8rem; color:var(--text-muted);">(Kosongkan jika tidak diubah)</span></label>
            <input type="password" v-model="formData.password" :required="modalMode === 'add'" placeholder="Masukkan password">
          </div>
          <div class="form-group">
            <label>Role</label>
            <select v-model="formData.role">
              <option value="admin">Admin</option>
              <option value="master">Master</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Batal</button>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const toast = inject('toast')
const audio = inject('audio')

const user = ref(null)
const isLoggingOut = ref(false)
const activeTab = ref('dashboard')

// User CRUD State
const users = ref([])
const isLoadingUsers = ref(false)
const showModal = ref(false)
const modalMode = ref('add') // 'add' or 'edit'
const isSubmitting = ref(false)
const formData = reactive({ id: null, username: '', password: '', role: 'admin' })

async function checkSession() {
  try {
    const res = await fetch('/api/session')
    const isJson = res.headers.get('content-type')?.includes('application/json')
    if (res.ok && isJson) {
      const data = await res.json()
      if (data.success) {
        user.value = data.user
        fetchUsers() // Ambil data users setelah sesi valid
        return
      }
    }
    router.push('/')
  } catch (err) {
    console.error('Session error:', err)
    router.push('/')
  }
}

async function fetchUsers() {
  isLoadingUsers.value = true
  try {
    const res = await fetch('/api/users')
    if (res.ok) {
      const data = await res.json()
      users.value = data.data
    }
  } catch (err) {
    toast.error('Gagal mengambil data pengguna')
  } finally {
    isLoadingUsers.value = false
  }
}

function openModal(mode, u = null) {
  modalMode.value = mode
  if (mode === 'edit' && u) {
    formData.id = u.id
    formData.username = u.username
    formData.password = ''
    formData.role = u.role
  } else {
    formData.id = null
    formData.username = ''
    formData.password = ''
    formData.role = 'admin'
  }
  showModal.value = true
}

async function submitUser() {
  isSubmitting.value = true
  audio?.click()
  try {
    const isEdit = modalMode.value === 'edit'
    const url = isEdit ? `/api/users/${formData.id}` : '/api/users'
    const payload = { username: formData.username, role: formData.role }
    if (formData.password) payload.password = formData.password

    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    
    const data = await res.json()
    if (res.ok && data.success) {
      toast.success(data.message || 'Berhasil disimpan')
      showModal.value = false
      fetchUsers()
    } else {
      toast.error('❌ ' + (data.error || 'Terjadi kesalahan'))
    }
  } catch (err) {
    toast.error('❌ Gagal menghubungi server')
  } finally {
    isSubmitting.value = false
  }
}

async function handleDeleteUser(id) {
  if (id === user.value.id) {
    toast.error('Tidak bisa menghapus akun sendiri!')
    return
  }
  if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return
  
  audio?.click()
  try {
    const res = await fetch(`/api/users/${id}`, { method: 'DELETE' })
    const data = await res.json()
    if (res.ok && data.success) {
      toast.info('🗑️ User dihapus')
      fetchUsers()
    } else {
      toast.error('❌ ' + (data.error || 'Gagal menghapus user'))
    }
  } catch (err) {
    toast.error('❌ Gagal menghubungi server')
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
.master-wrapper { padding: 30px; max-width: 1000px; margin: 0 auto; }
.master-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.header-title h1 { font-size: 1.8rem; font-weight: 800; margin-bottom: 4px; }
.header-title p { color: var(--text-secondary); font-size: 0.95rem; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.mb-md { margin-bottom: 20px; }

/* Tabs */
.master-tabs { display: flex; gap: 10px; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 15px; }
.tab-btn { background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-secondary); padding: 10px 20px; border-radius: var(--radius-md); font-weight: 600; cursor: pointer; transition: all 0.2s; }
.tab-btn:hover { background: var(--bg-elevated); color: var(--text-primary); }
.tab-btn.active { background: rgba(99,102,241,0.15); border-color: var(--accent-primary); color: var(--accent-primary); box-shadow: var(--glow-primary); }

.master-content { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 24px; animation: fade 0.3s ease; }

/* Dashboard Stats */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
.stat-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 20px; display: flex; align-items: center; gap: 16px; }
.stat-icon { width: 50px; height: 50px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
.stat-info h3 { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px; }
.stat-info .val { font-size: 1.6rem; font-weight: 800; font-family: var(--font-mono); color: var(--text-primary); }

/* Table */
.table-container { overflow-x: auto; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
.data-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
.data-table th, .data-table td { padding: 14px; text-align: left; border-bottom: 1px solid var(--border-subtle); }
.data-table th { background: rgba(15,23,42,0.5); font-weight: 700; color: var(--text-secondary); }
.data-table tr:hover td { background: rgba(255,255,255,0.02); }
.text-center { text-align: center !important; }
.action-cell { display: flex; gap: 10px; }
.btn-icon { background: none; border: none; font-size: 1.2rem; cursor: pointer; opacity: 0.7; transition: opacity 0.2s; padding: 4px; }
.btn-icon:hover:not(:disabled) { opacity: 1; transform: scale(1.1); }
.btn-icon:disabled { filter: grayscale(1); opacity: 0.3; cursor: not-allowed; }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(5px); z-index: 100; display: flex; align-items: center; justify-content: center; }
.modal-box { background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); width: 100%; max-width: 450px; padding: 25px; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
.modal-box h3 { font-size: 1.3rem; margin-bottom: 20px; font-weight: 800; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
.form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }
.form-group input, .form-group select { width: 100%; padding: 10px 14px; background: rgba(15,23,42,0.6); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: white; font-size: 0.95rem; }
.form-group input:focus, .form-group select:focus { outline: none; border-color: var(--accent-primary); }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 25px; }

@keyframes fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>
