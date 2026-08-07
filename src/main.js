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
    path: '/kelas-x/data-informasi',
    component: () => import('./components/labs/kelas-x/DataDanInformasi.vue'),
    meta: { title: 'Data dan Informasi', icon: '📊', fase: 'E' }
  },
  {
    path: '/kelas-x/algoritma-struktur-data',
    component: () => import('./components/labs/kelas-x/AlgoritmaStrukturData.vue'),
    meta: { title: 'Algoritma dan Struktur Data', icon: '⚡', fase: 'E' }
  },
  {
    path: '/kelas-x/teknologi-budaya-digital',
    component: () => import('./components/labs/kelas-x/TeknologiBudayaDigital.vue'),
    meta: { title: 'Teknologi dan Budaya Digital', icon: '🌐', fase: 'E' }
  },
  {
    path: '/kelas-x/keamanan-informasi',
    component: () => import('./components/labs/kelas-x/KeamananInformasi.vue'),
    meta: { title: 'Keamanan Informasi', icon: '🔒', fase: 'E' }
  },
  {
    path: '/kelas-xi/informasi-digital',
    component: () => import('./components/labs/kelas-xi/InformasiDigital.vue'),
    meta: { title: 'Informasi Digital', icon: '📖', fase: 'F' }
  },
  {
    path: '/kelas-xi/analisis-data',
    component: () => import('./components/labs/kelas-xi/AnalisisData.vue'),
    meta: { title: 'Analisis Data', icon: '📊', fase: 'F' }
  },
  {
    path: '/kelas-xi/strategi-algoritmik',
    component: () => import('./components/labs/kelas-xi/StrategiAlgoritmik.vue'),
    meta: { title: 'Strategi Algoritmik & Desain Struktur Data', icon: '🧠', fase: 'F' }
  },
  {
    path: '/kelas-xi/berpikir-komputasional',
    component: () => import('./components/labs/kelas-xi/BerpikirKomputasional.vue'),
    meta: { title: 'Berpikir Komputasional & Implementasi Algoritma', icon: '⚙️', fase: 'F' }
  },
  {
    path: '/kelas-xi/jaringan-komputer',
    component: () => import('./components/labs/kelas-xi/JaringanKomputer.vue'),
    meta: { title: 'Merancang Jaringan Komputer', icon: '🌐', fase: 'F' }
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
