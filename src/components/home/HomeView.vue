<template>
  <div class="home-container">
    <!-- Welcome Animation Section -->
    <header class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title animate-title">
          Selamat Datang di
          <span class="text-gradient d-block mt-2">Materi Informatika</span>
        </h1>
        <p class="hero-subtitle animate-subtitle">
          Eksplorasi interaktif konsep komputasi untuk siswa SMA.<br>
          Silakan pilih tingkat kelas Anda di bawah ini.
        </p>
      </div>
      
      <!-- Animated floating elements -->
      <div class="floating-orb orb-1"></div>
      <div class="floating-orb orb-2"></div>
      <div class="floating-orb orb-3"></div>
    </header>

    <!-- Class Selection Menu -->
    <section class="class-menu-section animate-menu">
      <div class="class-tabs">
        <button 
          class="class-tab-btn" 
          :class="{ active: activeClass === 'X' }"
          @click="selectClass('X')"
        >
          Kelas X
        </button>
        <button 
          class="class-tab-btn" 
          :class="{ active: activeClass === 'XI' }"
          @click="selectClass('XI')"
        >
          Kelas XI
        </button>
        <button 
          class="class-tab-btn" 
          :class="{ active: activeClass === 'XII' }"
          @click="selectClass('XII')"
        >
          Kelas XII
        </button>
      </div>
    </section>

    <!-- Sub Materi Content (Dynamic) -->
    <section class="sub-materi-section">
      <Transition name="fade-slide" mode="out-in">
        
        <!-- Kelas X Content -->
        <div v-if="activeClass === 'X'" class="sub-materi-content" key="kelas-x">
          <div class="content-header">
            <h2>Fase E</h2>
            <p>Materi Inti Kelas X Informatika</p>
          </div>
          <div class="lab-grid">
            <RouterLink to="/kelas-x/data-informasi" class="lab-card" @click="playClick">
              <div class="lab-icon">📊</div>
              <div class="lab-info">
                <h3>Data dan Informasi</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-x/algoritma-struktur-data" class="lab-card" @click="playClick">
              <div class="lab-icon">⚡</div>
              <div class="lab-info">
                <h3>Algoritma dan Struktur Data</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-x/teknologi-budaya-digital" class="lab-card" @click="playClick">
              <div class="lab-icon">🌐</div>
              <div class="lab-info">
                <h3>Teknologi dan Budaya Digital</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-x/keamanan-informasi" class="lab-card" @click="playClick">
              <div class="lab-icon">🔒</div>
              <div class="lab-info">
                <h3>Keamanan Informasi</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>
          </div>
        </div>

        <!-- Kelas XI Content -->
        <div v-else-if="activeClass === 'XI'" class="sub-materi-content" key="kelas-xi">
          <div class="content-header">
            <h2>Fase F</h2>
            <p>Materi Inti Kelas XI Informatika</p>
          </div>
          <div class="lab-grid">
            <RouterLink to="/kelas-xi/informasi-digital" class="lab-card" @click="playClick">
              <div class="lab-icon">📖</div>
              <div class="lab-info">
                <h3>Informasi Digital</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>
            
            <RouterLink to="/kelas-xi/analisis-data" class="lab-card" @click="playClick">
              <div class="lab-icon">📊</div>
              <div class="lab-info">
                <h3>Analisis Data</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-xi/strategi-algoritmik" class="lab-card" @click="playClick">
              <div class="lab-icon">🧠</div>
              <div class="lab-info">
                <h3>Strategi Algoritmik & Desain Struktur Data</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-xi/berpikir-komputasional" class="lab-card" @click="playClick">
              <div class="lab-icon">⚙️</div>
              <div class="lab-info">
                <h3>Berpikir Komputasional & Implementasi Algoritma</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-xi/jaringan-komputer" class="lab-card" @click="playClick">
              <div class="lab-icon">🌐</div>
              <div class="lab-info">
                <h3>Merancang Jaringan Komputer</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>
          </div>
        </div>

        <!-- Kelas XII Content -->
        <div v-else-if="activeClass === 'XII'" class="sub-materi-content" key="kelas-xii">
          <div class="content-header">
            <h2>Fase F Lanjut</h2>
            <p>Materi Inti Kelas XII Informatika</p>
          </div>
          <div class="lab-grid">
            <RouterLink to="/kelas-xii/informatika-masa-depan" class="lab-card" @click="playClick">
              <div class="lab-icon">🚀</div>
              <div class="lab-info">
                <h3>Informatika Masa Depan</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-xii/sistem-komputer" class="lab-card" @click="playClick">
              <div class="lab-icon">💻</div>
              <div class="lab-info">
                <h3>Sistem Komputer</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-xii/berpikir-komputasional" class="lab-card" @click="playClick">
              <div class="lab-icon">⚙️</div>
              <div class="lab-info">
                <h3>Berpikir Komputasional</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-xii/jaringan-internet" class="lab-card" @click="playClick">
              <div class="lab-icon">📡</div>
              <div class="lab-info">
                <h3>Jaringan dan Internet</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>

            <RouterLink to="/kelas-xii/dampak-sosial" class="lab-card" @click="playClick">
              <div class="lab-icon">🌍</div>
              <div class="lab-info">
                <h3>Dampak Sosial</h3>
              </div>
              <div class="lab-arrow">→</div>
            </RouterLink>
          </div>
        </div>

        <!-- Initial state when no class is selected -->
        <div v-else class="empty-selection" key="empty">
          <div class="tech-animation-container">
            <span class="tech-icon floating-1">💻</span>
            <span class="tech-icon floating-2">🤖</span>
            <span class="tech-icon floating-3">📡</span>
          </div>
          <h3 class="school-name">Lab Maya Informatika SMAN 1 Lakbok</h3>
        </div>

      </Transition>
    </section>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const audio = inject('audio')
const activeClass = ref(null) // State untuk menyimpan kelas yang dipilih

function selectClass(className) {
  if (activeClass.value !== className) {
    activeClass.value = className
    audio?.click()
  }
}

function playClick() {
  audio?.click()
}
</script>

<style scoped>
.home-container {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 80px;
  overflow-y: auto;
  position: relative;
  z-index: 10;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  max-width: 800px;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 16px;
  color: var(--text-primary);
  line-height: 1.2;
}

.d-block { display: block; }
.mt-2 { margin-top: 8px; }

.text-gradient {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-emerald));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 3.8rem;
  font-weight: 900;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Intro Animations */
.animate-title {
  animation: scaleFadeIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
.animate-subtitle {
  opacity: 0;
  animation: slideUp 0.8s ease-out 0.4s forwards;
}
.animate-menu {
  opacity: 0;
  animation: slideUp 0.8s ease-out 0.6s forwards;
}

/* Floating Orbs */
.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  z-index: -1;
  opacity: 0.4;
  animation: float 10s infinite ease-in-out alternate;
}
.orb-1 {
  width: 200px; height: 200px;
  background: var(--accent-primary);
  top: -50px; left: -100px;
  animation-delay: 0s;
}
.orb-2 {
  width: 150px; height: 150px;
  background: var(--accent-emerald);
  bottom: -50px; right: -50px;
  animation-delay: -3s;
}
.orb-3 {
  width: 180px; height: 180px;
  background: var(--accent-amber);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -6s;
}

/* Class Tabs Menu */
.class-menu-section {
  width: 100%;
  max-width: 600px;
  margin-bottom: 40px;
}

.class-tabs {
  display: flex;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--border-subtle);
  border-radius: 50px;
  padding: 6px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.class-tab-btn {
  flex: 1;
  background: transparent;
  border: none;
  padding: 14px 20px;
  border-radius: 40px;
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.class-tab-btn:hover {
  color: var(--text-primary);
}

.class-tab-btn.active {
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-indigo));
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

/* Sub Materi Section */
.sub-materi-section {
  width: 100%;
  max-width: 900px;
  min-height: 300px;
}

.sub-materi-content {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 40px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.content-header {
  text-align: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.content-header h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.content-header p {
  color: var(--accent-emerald);
  font-weight: 600;
  font-size: 1.1rem;
}

/* Lab Grid Layout */
.lab-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.lab-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 24px;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.lab-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255,255,255,0.05), transparent);
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}

.lab-card:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--accent-primary);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.lab-card:hover:not(.disabled)::before {
  transform: translateX(100%);
}

.lab-icon {
  font-size: 2.5rem;
  background: rgba(0, 0, 0, 0.2);
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: transform 0.3s ease;
}

.lab-card:hover:not(.disabled) .lab-icon {
  transform: scale(1.1) rotate(5deg);
}

.lab-info {
  flex: 1;
}

.lab-info h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.lab-info p {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.lab-arrow {
  font-size: 1.5rem;
  color: var(--accent-primary);
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.lab-card:hover:not(.disabled) .lab-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Empty / Disabled States */
.lab-card.disabled {
  opacity: 0.7;
  cursor: not-allowed;
  border-style: dashed;
}

.empty-selection {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.tech-animation-container {
  position: relative;
  height: 120px;
  width: 200px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tech-icon {
  font-size: 2.8rem;
  position: absolute;
  filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.4));
}

.floating-1 {
  animation: techFloat 4s infinite ease-in-out;
  left: 10px;
  top: 10px;
}

.floating-2 {
  animation: techFloat 4.5s infinite ease-in-out reverse;
  font-size: 3.5rem;
  z-index: 2;
  top: 30px;
}

.floating-3 {
  animation: techFloat 5s infinite ease-in-out 1s;
  right: 10px;
  top: 10px;
}

.school-name {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--text-primary), var(--accent-emerald));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: scaleFadeIn 1s ease-out;
}

@keyframes techFloat {
  0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
  50% { transform: translateY(-15px) scale(1.1) rotate(5deg); }
}

/* Transition Animations */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Keyframes */
@keyframes scaleFadeIn {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes slideUp {
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-20px) scale(1.1); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-15px); }
  60% { transform: translateY(-7px); }
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.2rem; }
  .text-gradient { font-size: 2.8rem; }
  .class-tabs { flex-direction: column; border-radius: 20px; }
  .class-tab-btn { border-radius: 15px; }
  .sub-materi-content { padding: 25px 20px; }
  .lab-card { flex-direction: column; text-align: center; }
  .lab-arrow { display: none; }
}
</style>
