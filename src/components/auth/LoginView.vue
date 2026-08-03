<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="brand-icon">🧠</div>
      <h2>Login Master</h2>
      <p>Masuk ke panel kontrol admin</p>

      <form @submit.prevent="handleLogin" class="auth-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            v-model="username" 
            placeholder="Masukkan username" 
            required 
            autocomplete="username"
            :disabled="isLoading"
          />
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            placeholder="Masukkan password" 
            required 
            autocomplete="current-password"
            :disabled="isLoading"
          />
        </div>

        <button type="submit" class="btn btn-primary login-btn" :disabled="isLoading">
          <span v-if="isLoading">🔄 Memeriksa...</span>
          <span v-else>Masuk ke Panel Master</span>
        </button>
      </form>

      <div class="back-link">
        <RouterLink to="/" @click="audio?.click()">← Kembali ke Lab</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const isLoading = ref(false)

const router = useRouter()
const toast = inject('toast')
const audio = inject('audio')

async function handleLogin() {
  if (!username.value || !password.value) return
  
  isLoading.value = true
  audio?.click()
  
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username.value, password: password.value })
    })
    
    const data = await res.json()
    
    if (res.ok && data.success) {
      toast.success('✅ Login berhasil!')
      audio?.success()
      // Redirect ke master
      router.push('/master')
    } else {
      toast.error('❌ ' + (data.error || 'Username atau password salah'))
      audio?.error()
    }
  } catch (err) {
    toast.error('❌ Terjadi kesalahan jaringan')
    audio?.error()
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.auth-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px);
  padding: 20px;
}

.auth-card {
  background: rgba(26, 34, 53, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-xl);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.brand-icon {
  width: 60px; height: 60px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-radius: var(--radius-lg);
  display: flex; align-items: center; justify-content: center;
  font-size: 30px;
  margin-bottom: 20px;
  box-shadow: var(--glow-primary);
}

h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 5px;
  background: linear-gradient(135deg, var(--text-primary), var(--text-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-group input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: white;
  font-size: 0.95rem;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.login-btn {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  margin-top: 10px;
  justify-content: center;
}

.back-link {
  margin-top: 25px;
  font-size: 0.85rem;
}

.back-link a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.back-link a:hover {
  color: var(--accent-primary);
}
</style>
