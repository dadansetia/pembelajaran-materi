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
-- Password: password (Sudah di-hash menggunakan Bcrypt)
-- Anda bisa mengubah password hash ini nantinya. Hash untuk 'password' adalah:
-- $2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi
INSERT INTO data_users (username, password, nama_pengguna, email, nomor_telepon, foto_profil, role_user, status_user, created_at, updated_at) 
VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'dadan@smkm2banjarsari.sch.id', '08123456789', '', 'master', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT(username) DO UPDATE SET 
  password = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  nama_pengguna = 'dadan',
  email = 'dadan@smkm2banjarsari.sch.id',
  nomor_telepon = '08123456789',
  foto_profil = '',
  role_user = 'master',
  status_user = 1,
  updated_at = CURRENT_TIMESTAMP;
