-- Skema Database D1 untuk Otentikasi Admin Master
-- Tabel pengguna
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'master',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Data awal (Dummy)
-- Username: admin
-- Password: password123 (Sudah di-hash menggunakan SHA-256)
-- Anda bisa mengubah password hash ini nantinya. Hash untuk 'password123' adalah:
-- ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'master')
ON CONFLICT(username) DO NOTHING;
