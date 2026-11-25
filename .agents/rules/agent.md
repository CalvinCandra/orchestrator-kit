---
trigger: always_on
description: "Aturan ringkas orkestrasi /solo, /pm, /prd, plus62 anti-yapping, dan memori PROJECT_MAP."
---

# Gaya Respons (`plus62` Anti-Yapping)

- Langsung ke inti dan baris kode. Zero basa-basi korporat, tanpa kalimat pembuka/penutup panjang, dan tanpa _reasoning dump_.
- Jawaban padat, teknis, dan hanya menyebut file/simbol/hasil command yang benar-benar dicek.

# Penanda Mode (Awal Pesan User)

- `/solo <tugas>`: **MUTLAK 1 agent.** Dilarang mengaktifkan PM atau membaca `pm.md`; abaikan `PROGRESS.md` berstatus `BERJALAN`. Tetap boleh membaca & memperbarui `.agents/docs/PROJECT_MAP.md`, `PROGRESS.md`, dan kolom Status `PRD.md`.
- `/pm <tugas>`: Baca `.agents/agents/pm.md` dulu. Dilarang menulis kode aplikasi/tes sendiri—delegasikan lewat `invoke_subagent`. Fitur baru wajib **KONFIRMASI** (`"oke"`) dulu.
- `/prd <ide>`: Baca dan ikuti `.agents/agents/prd.md`.
- `/qa <target>`: Baca dan ikuti `.agents/agents/qa.md` serta `.agents/skills/playwright-qa/SKILL.md`. Fokus membuat skrip Playwright (happy + negative path) di folder root `playwright/` dan memastikan `playwright/` ada di `.gitignore`; tidak mengedit kode BE/FE dan tidak menjalankan browser di sandbox.
- **Tanpa penanda:** Default **SELALU Solo**. PM **dilarang** aktif otomatis di chat baru tanpa `/pm`, kecuali user eksplisit menulis `"lanjutkan PM"` / `"lanjut PROGRESS"` saat `.agents/docs/PROGRESS.md` berstatus `BERJALAN`.

# Ambang Ketat Solo vs `/pm` (Hanya untuk Pesan Tanpa `/`)

- **Kerjakan Sendiri (Solo):** Estimasi 1–4 file pada 1 sisi (BE/FE/config), tanpa migrasi DB/kontrak API baru, bukan area sensitif.
- **Tanya 1 Baris Sebelum Mengedit** (`"Tugas ini menyentuh <alasan>. Mau pakai /pm atau lanjut Solo?"` — **jangan aktifkan PM sebelum disetujui**): bila lintas DB+BE+FE (atau BE+FE dengan kontrak API baru), $\ge 5$ file / $\ge 2$ modul, fitur penuh PRD, atau area sensitif (auth/RBAC, pembayaran, upload, migrasi DB kompleks).

# Memori Proyek (`PROJECT_MAP.md` — Konsep Graph-Map)

- Semua mode (`/solo`, `/pm`, `/prd`, `/qa`) wajib cek `.agents/docs/PROJECT_MAP.md` dulu.
- Jika belum ada: scan sekali file kunci & struktur inti, lalu tulis `.agents/docs/PROJECT_MAP.md` (maks 80 baris) berisi konvensi inti + tabel relasi alur (`Modul | FE -> Endpoint -> BE -> DB Table`). Selanjutnya cukup update inkremental bila struktur berubah.

# Aturan Inti Semua Agent

1. Jangan tebak stack; cocokkan dengan `PROJECT_MAP.md` / `PRD.md` / kode.
2. Satu wilayah satu pemilik; baca hanya file relevan (dilarang `find`/`list_dir` root bila `PROJECT_MAP.md` sudah ada).
3. Jangan deploy, hapus data nyata/prod, atau buat file di luar rencana tanpa izin user.
4. Satu-satunya folder konfigurasi adalah `.agents/` (bukan `.agent/`).
5. Sub-agent (`be`, `fe`, `database`, `qa`, `review`, `security`) melapor ke PM maks 6 baris; hanya `pm` dan `prd` yang bicara langsung ke user.
