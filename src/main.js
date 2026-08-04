import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

const routes = [
  { path: '/', redirect: '/algoritma' },
  {
    path: '/algoritma',
    component: () => import('./components/labs/algoritma/AlgoritmaLab.vue'),
    meta: { title: 'Algoritma Pengurutan', icon: '⚡', fase: 'E' }
  },
  {
    path: '/datastruktur',
    component: () => import('./components/labs/datastruktur/DataStrukturLab.vue'),
    meta: { title: 'Struktur Data', icon: '📦', fase: 'E' }
  },
  {
    path: '/jaringan',
    component: () => import('./components/labs/jaringan/JaringanLab.vue'),
    meta: { title: 'Jaringan Komputer', icon: '🌐', fase: 'F' }
  },
  {
    path: '/biner',
    component: () => import('./components/labs/biner/BinerLab.vue'),
    meta: { title: 'Sistem Biner & Logika', icon: '💡', fase: 'F' }
  },
  // Auth Routes
  {
    path: '/masuk',
    component: () => import('./components/auth/LoginView.vue'),
    meta: { title: 'Login Master', hideSidebar: true }
  },
  {
    path: '/master',
    component: () => import('./components/admin/MasterView.vue'),
    meta: { title: 'Panel Master', requiresAuth: true, hideSidebar: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Navigation Guard untuk otentikasi
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      const res = await fetch('/api/session')
      const isJson = res.headers.get('content-type')?.includes('application/json')
      
      if (res.ok && isJson) {
        const data = await res.json()
        if (data.success) {
          return next() // Ada sesi, lanjut ke /master
        }
      }
      next('/') // Tidak ada sesi, lempar ke beranda (sembunyikan login)
    } catch (err) {
      next('/') // Error network dll, lempar ke beranda
    }
  } else if (to.path === '/masuk') {
    // Jika ke halaman login, cek apakah sudah login
    try {
      const res = await fetch('/api/session')
      const isJson = res.headers.get('content-type')?.includes('application/json')
      
      if (res.ok && isJson) {
        const data = await res.json()
        if (data.success) {
          return next('/master') // Sudah login, arahkan ke master
        }
      }
      next() // Belum login, boleh ke /masuk
    } catch {
      next()
    }
  } else {
    next() // Rute publik, izinkan
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app')
