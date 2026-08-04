-- Skema Database D1 untuk Otentikasi Admin Master
-- Tabel pengguna
CREATE TABLE IF NOT EXISTS data_users (
  id_user INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  nama_pengguna TEXT NOT NULL,
  email TEXT,
  nomor_telepon TEXT,
  foto_profil TEXT,
  role_user TEXT DEFAULT 'user', -- user, admin
  status_user INTEGER DEFAULT 1, -- 1 = active, 0 = inactive
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Data awal (Dummy)
-- Username: admin
-- Password: password123 (Sudah di-hash menggunakan SHA-256)
-- Anda bisa mengubah password hash ini nantinya. Hash untuk 'password123' adalah:
-- ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
INSERT INTO data_users (username, password, role_user, nama_pengguna, email, nomor_telepon, foto_profil, role_user, status_user, created_at, updated_at) 
VALUES ('admin', '240bd89963509d9edc38427c7b625a336a178e74b00822450c5151c07352179e', 'master', 'Admin', 'dadan@smkm2banjarsari.sch.id', '08123456789', '', 'admin', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT(username) DO UPDATE SET 
  password = '240bd89963509d9edc38427c7b625a336a178e74b00822450c5151c07352179e',
  nama_pengguna = 'dadan',
  email = [EMAIL_ADDRESS]',
  nomor_telepon = '08123456789',
  foto_profil = '',
  role_user = 'admin',
  status_user = 1,
  updated_at = CURRENT_TIMESTAMP;
