<template>
  <div class="lab-container">
    <div class="lab-header">
      <h2>Informasi Digital</h2>
      <p>Menggunakan Mesin Pencari, Membaca Lateral, dan Peraturan Perundang-undangan TIK</p>
    </div>

    <div class="content-layout">
      <!-- Sidebar Navigasi Bab -->
      <div class="sidebar-nav">
        <ul>
          <li :class="{ active: activeSection === 'A' }" @click="setSection('A')">
            A. Menggunakan Mesin Pencari
          </li>
          <li :class="{ active: activeSection === 'B' }" @click="setSection('B')">
            B. Membaca Lateral
          </li>
          <li :class="{ active: activeSection === 'C' }" @click="setSection('C')">
            C. Peraturan UU ITE
          </li>
        </ul>
      </div>

      <!-- Area Konten -->
      <div class="main-content">
        <!-- Bagian A: Mesin Pencari -->
        <div v-if="activeSection === 'A'" class="section-content fade-in">
          <h3>A. Menggunakan Mesin Pencari</h3>
          <p>Dalam melakukan riset, kamu membutuhkan data maupun informasi yang menunjang topik penelitian kamu. Namun, terkadang mencari informasi yang relevan dan akurat bisa menjadi tantangan tersendiri.</p>
          
          <h4>1. Menggunakan Mesin Pencari untuk Riset</h4>
          <ol>
            <li><strong>Tentukan Topik Penelitian:</strong> Mulailah dengan menentukan topik penelitian yang ingin kamu teliti.</li>
            <li><strong>Gunakan Kata Kunci yang Tepat:</strong> Identifikasi kata kunci yang berkaitan dengan topik penelitian kamu.</li>
            <li><strong>Gunakan Mesin Pencari:</strong> Ketikkan kata kunci ke dalam kotak pencarian.</li>
            <li><strong>Evaluasi Hasil Pencarian:</strong> Periksa dengan cermat situs web yang muncul. Pilih situs-situs yang dapat dipercaya dan relevan.</li>
            <li><strong>Gunakan Fitur Pencarian Lanjutan:</strong> Menyaring hasil pencarian berdasarkan tanggal, jenis file, atau wilayah geografis.</li>
            <li><strong>Periksa Sumber Primer:</strong> Cobalah untuk menemukan sumber-sumber primer seperti jurnal ilmiah atau artikel pemerintah.</li>
            <li><strong>Lakukan Penelitian Lebih Lanjut:</strong> Jangan ragu untuk melakukan penelitian lebih mendalam mengikuti tautan yang relevan.</li>
          </ol>

          <h4>2. Menjelajah Informasi Digital dengan Bijak</h4>
          <p>Kebebasan dalam penjelajahan informasi digital memberikan kamu kesempatan untuk memperluas pengetahuan, namun kebebasan ini juga harus disertai dengan kesadaran akan tanggung jawab. Kamu harus memahami bahwa dengan akses yang luas datanglah tanggung jawab untuk menggunakan informasi tersebut dengan bijaksana, menilai keandalan sumber, mengidentifikasi bias, dan mempertimbangkan dampaknya.</p>
        </div>

        <!-- Bagian B: Membaca Lateral -->
        <div v-if="activeSection === 'B'" class="section-content fade-in">
          <h3>B. Membaca Lateral: Mengevaluasi Kebenaran Konten</h3>
          <p>Menentukan karakteristik sumber konten yang kredibel dari mesin pencari melibatkan evaluasi sumber informasi untuk memastikan bahwa konten tersebut berasal dari sumber yang dapat dipercaya.</p>
          
          <h4>1. Triangulasi</h4>
          <p>Metode “triangulasi” adalah konsep yang sering digunakan untuk memperkuat validasi konten dengan menggabungkan metode, sumber data, atau perspektif.</p>
          <ul>
            <li><strong>Triangulasi Metode:</strong> Menggunakan beberapa metode penelitian, seperti wawancara, observasi, dan analisis dokumen.</li>
            <li><strong>Triangulasi Sumber:</strong> Menggunakan beberapa sumber data untuk memverifikasi temuan penelitian.</li>
            <li><strong>Triangulasi Peneliti:</strong> Melibatkan beberapa peneliti atau pemeriksa independen untuk mengurangi bias individu.</li>
          </ul>

          <h4>2. Karakteristik Sumber Konten Teks yang Kredibel</h4>
          <ul>
            <li><strong>Evaluasi Kredibilitas Situs Web:</strong> Perhatikan domain situs web (seperti .gov, .edu) dan pastikan menggunakan HTTPS.</li>
            <li><strong>Periksa Riwayat Publikasi:</strong> Lihat rekam jejak dari sumber tersebut apakah sering mempublikasikan konten berkualitas.</li>
            <li><strong>Analisis Gaya Penulisan:</strong> Sumber terpercaya cenderung mengadopsi gaya penulisan profesional, jelas, dan bebas dari kesalahan tata bahasa.</li>
            <li><strong>Verifikasi Fakta:</strong> Sumber kredibel transparan dalam menjelaskan proses pengumpulan data mereka dan menyertakan referensi asli.</li>
            <li><strong>Perhatikan Bias Potensial:</strong> Perhatikan apakah ada bias yang mencolok dan selalu bandingkan dengan sudut pandang lain.</li>
          </ul>

          <h4>3. Mengevaluasi Konten Gambar & Video</h4>
          <p>Seringkali gambar atau video dimanipulasi. Lakukan evaluasi dengan cara:</p>
          <ul>
            <li><strong>Reverse Image Search:</strong> Menggunakan mesin pencari untuk mencari gambar yang serupa atau identik dengan gambar yang sudah ada.</li>
            <li><strong>Memeriksa Metadata:</strong> Melihat informasi tersembunyi seperti tanggal pembuatan, lokasi pengambilan, dan perangkat yang digunakan.</li>
            <li><strong>Mengevaluasi Kualitas:</strong> Periksa resolusi, ketajaman, warna, kontras, dan ketepatan konteks visual tersebut.</li>
          </ul>
        </div>

        <!-- Bagian C: Peraturan TIK -->
        <div v-if="activeSection === 'C'" class="section-content fade-in">
          <h3>C. Peraturan Perundang-undangan Teknologi dan Informasi</h3>
          <p>Sebelum adanya Undang-Undang Informasi dan Transaksi Elektronik (UU ITE) pada tahun 2008, dunia maya di Indonesia seringkali belum memiliki peraturan yang jelas. Hal ini terlihat dari beberapa kasus kekosongan hukum di masa lalu:</p>
          
          <ul>
            <li><strong>2001 - Kasus Pencurian Data:</strong> Kasus pembobolan situs internet banking yang memanfaatkan kelemahan <em>typo-squatting</em> domain.</li>
            <li><strong>2006 - Kasus Penghinaan di Blog:</strong> Belum adanya peraturan yang secara khusus mengatasi kasus penghinaan di dunia maya.</li>
            <li><strong>2007 - Kasus Pembajakan:</strong> Maraknya peredaran konten digital ilegal.</li>
            <li><strong>Pornografi & Isu SARA:</strong> Forum-forum bebas yang meresahkan tanpa adanya kontrol hukum yang memadai.</li>
          </ul>

          <h4>Sejarah Singkat UU ITE Indonesia</h4>
          <p>Dengan latar belakang isu-isu tersebut, lahirlah UU ITE pada tahun 2008. Undang-undang ini memiliki dua tujuan utama:</p>
          <ol>
            <li>Mendukung pertumbuhan ekonomi digital di Indonesia.</li>
            <li>Memberikan keamanan dan kepastian hukum bagi pengguna internet serta penyelenggara layanan di Indonesia.</li>
          </ol>
          <p>UU ITE mencakup berbagai hal termasuk hak dan kewajiban pengguna internet, perlindungan data pribadi, dan hak kekayaan intelektual. Meski sempat mengalami beberapa kali revisi untuk menghindari pasal karet (ambigu), regulasi ini tetap menjadi payung hukum utama dalam aktivitas digital dan transaksi elektronik di Indonesia.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Default aktif di Bab A
const activeSection = ref('A')

function setSection(section) {
  activeSection.value = section
}
</script>

<style scoped>
.lab-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.lab-header {
  margin-bottom: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-subtle);
}

.content-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  margin-top: 20px;
}

.sidebar-nav {
  width: 250px;
  border-right: 1px solid var(--border-subtle);
  padding-right: 20px;
}

.sidebar-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-nav li {
  padding: 12px 15px;
  margin-bottom: 8px;
  border-radius: var(--radius-md);
  cursor: pointer;
  color: var(--text-secondary);
  font-weight: 500;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.sidebar-nav li:hover {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.sidebar-nav li.active {
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent-primary);
  border-left-color: var(--accent-primary);
}

.main-content {
  flex: 1;
  padding-left: 30px;
  overflow-y: auto;
  color: var(--text-secondary);
  line-height: 1.6;
}

.main-content h3 {
  color: var(--text-primary);
  margin-bottom: 20px;
  font-size: 1.8rem;
}

.main-content h4 {
  color: var(--accent-emerald);
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 1.3rem;
}

.main-content p {
  margin-bottom: 15px;
}

.main-content ul, .main-content ol {
  margin-bottom: 20px;
  padding-left: 20px;
}

.main-content li {
  margin-bottom: 10px;
}

.fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
