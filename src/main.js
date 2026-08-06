import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './styles/main.css'

const routes = [
  { 
    path: '/', 
    component: () => import('./components/home/HomeView.vue'),
    meta: { hideSidebar: true } 
  },
  {
    path: '/kelas-x/informatika-masa-depan',
    component: () => import('./components/labs/kelas-x/InformatikaMasaDepan.vue'),
    meta: { title: 'Informatika Masa Depan', icon: '🚀', fase: 'E' }
  },
  {
    path: '/kelas-x/sistem-komputer',
    component: () => import('./components/labs/kelas-x/SistemKomputer.vue'),
    meta: { title: 'Sistem Komputer', icon: '💻', fase: 'E' }
  },
  {
    path: '/kelas-x/berpikir-komputasional',
    component: () => import('./components/labs/kelas-x/BerpikirKomputasional.vue'),
    meta: { title: 'Berpikir Komputasional', icon: '⚙️', fase: 'E' }
  },
  {
    path: '/kelas-x/jaringan-internet',
    component: () => import('./components/labs/kelas-x/JaringanInternet.vue'),
    meta: { title: 'Jaringan dan Internet', icon: '📡', fase: 'E' }
  },
  {
    path: '/kelas-x/dampak-sosial',
    component: () => import('./components/labs/kelas-x/DampakSosial.vue'),
    meta: { title: 'Dampak Sosial', icon: '🌍', fase: 'E' }
  },
  {
    path: '/kelas-xi/tentang-informatika',
    component: () => import('./components/labs/kelas-xi/TentangInformatika.vue'),
    meta: { title: 'Tentang Informatika', icon: '📖', fase: 'F' }
  },
  {
    path: '/kelas-xi/strategi-algoritmik',
    component: () => import('./components/labs/kelas-xi/StrategiAlgoritmik.vue'),
    meta: { title: 'Strategi Algoritmik', icon: '🧠', fase: 'F' }
  },
  {
    path: '/kelas-xi/berpikir-kritis',
    component: () => import('./components/labs/kelas-xi/BerpikirKritis.vue'),
    meta: { title: 'Berpikir Kritis', icon: '🤔', fase: 'F' }
  },
  {
    path: '/kelas-xi/jaringan-komputer',
    component: () => import('./components/labs/kelas-xi/JaringanKomputer.vue'),
    meta: { title: 'Jaringan Komputer', icon: '🌐', fase: 'F' }
  },
  {
    path: '/kelas-xi/pengembangan-aplikasi',
    component: () => import('./components/labs/kelas-xi/PengembanganAplikasi.vue'),
    meta: { title: 'Pengembangan Aplikasi Mobile (AI)', icon: '📱', fase: 'F' }
  },
  // Rute Kelas XII
  {
    path: '/kelas-xii/informatika-masa-depan',
    component: () => import('./components/labs/kelas-xii/InformatikaMasaDepan.vue'),
    meta: { title: 'Informatika Masa Depan', icon: '🚀', fase: 'F Lanjut' }
  },
  {
    path: '/kelas-xii/sistem-komputer',
    component: () => import('./components/labs/kelas-xii/SistemKomputer.vue'),
    meta: { title: 'Sistem Komputer', icon: '💻', fase: 'F Lanjut' }
  },
  {
    path: '/kelas-xii/berpikir-komputasional',
    component: () => import('./components/labs/kelas-xii/BerpikirKomputasional.vue'),
    meta: { title: 'Berpikir Komputasional', icon: '⚙️', fase: 'F Lanjut' }
  },
  {
    path: '/kelas-xii/jaringan-internet',
    component: () => import('./components/labs/kelas-xii/JaringanInternet.vue'),
    meta: { title: 'Jaringan dan Internet', icon: '📡', fase: 'F Lanjut' }
  },
  {
    path: '/kelas-xii/dampak-sosial',
    component: () => import('./components/labs/kelas-xii/DampakSosial.vue'),
    meta: { title: 'Dampak Sosial', icon: '🌍', fase: 'F Lanjut' }
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
