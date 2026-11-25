---
name: playwright-qa
description: Panduan membuat automated E2E test Playwright di folder root playwright/ (adaptif auth/SSO, anti-flaky, happy + negative path, isolasi data, dan generate-only untuk dijalankan user).
---

# Playwright QA Skill

Gunakan panduan ini saat membuat skrip otomasi Playwright di folder root `playwright/`.

## 1. Lokasi & `.gitignore`
- Seluruh file Playwright wajib ditaruh di folder root **`playwright/`**:
  - `playwright/playwright.config.ts`
  - `playwright/.env.test.example`
  - `playwright/auth.setup.ts` (jika project butuh login)
  - `playwright/tests/<fitur>.spec.ts`
  - `playwright/tests/e2e-main-flow.spec.ts` (opsional, untuk alur penuh lintas fitur)
- Pastikan root `.gitignore` memuat `playwright/` agar folder otomasi tidak ikut ter-commit ke GitHub.

## 2. Auth Adaptif (Cek `PROJECT_MAP.md` / Kode Auth)
Sesuaikan strategi autentikasi dengan project:
- **Tanpa Auth (Publik):** langsung uji halaman tanpa `auth.setup.ts`.
- **Login Form / API Biasa:** buat `auth.setup.ts` yang login otomatis lewat form atau endpoint login menggunakan kredensial dari `.env.test`, lalu simpan sesi ke `playwright/.auth/user.json` (`storageState`).
- **SSO / OAuth / 2FA:** buat `auth.setup.ts` mode manual (`--headed`) agar user cukup login SSO 1 kali secara lokal, lalu simpan `storageState` ke `playwright/.auth/user.json` untuk dipakai ulang semua test.

## 3. Cakupan Skenario (Happy Path + Negative Path)
Pecah test **per fitur/modul** (mengacu pada `TC-*` di `PRD.md` / `API_SPEC.md`, atau analisis BE/FE bila tidak ada PRD), ditambah 1 file alur utama bila lintas fitur:
- **Happy Path:** alur sukses utama (CRUD, submit, navigasi, perubahan state & respons API sesuai kontrak).
- **Negative Path (Wajib):**
  - Validasi input kosong, format salah, nilai batas (min/max/nol/negatif).
  - Data duplikat atau konflik.
  - Akses tanpa login (`401`) dan beda role/hak akses (`403`).
  - Penanganan error API (`4xx`/`5xx`) dan *empty state* di UI.

## 4. Standar Anti-Flaky
- **Wajib baca file komponen FE target** sebelum menulis locator agar selector akurat.
- Prioritaskan locator semantik: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`.
- **Hindari** CSS selector rapuh (`.class > div:nth-child(2)`) dan XPath.
- **Dilarang** memakai `page.waitForTimeout()` statis; gunakan web-first assertions (`await expect(locator).toBeVisible()`).

## 5. Isolasi Data Uji
- Gunakan data dummy ber-prefix unik (mis. `[QA-${Date.now()}]`) agar tidak bentrok dengan data asli.
- Tambahkan cleanup di `afterEach` / `afterAll` (hapus data uji via UI atau API) bila memungkinkan.

## 6. Mode Generate-Only
- Jangan menjalankan browser Playwright di sandbox.
- Cukup lakukan syntax/type check ringan (`npx tsc --noEmit` bila TypeScript tersedia), lalu berikan perintah run siap-pakai ke user.
