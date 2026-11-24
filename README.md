# Orchestrator Kit

Kumpulan agent AI paralel (`prd`, `pm`, `be`, `fe`, `database`, `qa`, `review`, `security`) beserta kumpulan skill pilihan (`ponytail`, `frontend-design`, `humanizer`, `security-audit`) untuk **Google Antigravity**. Tidak terikat bahasa/framework: Laravel, NestJS, Express, React, Vue, Python, Go, dan lainnya dideteksi langsung dari project atau dirancang lewat `/prd`.

## Instalasi 1 Baris (via `npx`)

Buka terminal di dalam folder project tujuanmu (boleh **folder baru yang masih kosong** maupun **project yang sudah berjalan**), lalu jalankan:

```bash
npx github:CalvinCandra/orchestrator-kit
```

_(Atau jika sudah dipublish ke npm / di-`npm link` secara lokal, cukup jalankan `npx orchestrator-kit`)_.

### Bagaimana Cara Kerjanya?

1. `npx` mengunduh paket dari GitHub ke folder cache sementara npm (tidak mengotori folder projectmu dengan `package.json`, `bin/`, atau `README.md` root).
2. Script installer (`bin/install.mjs`) otomatis berjalan dan **hanya menyalin folder `.agents/`** (`agents/`, `rules/`, `skills/`, dan `docs/`) ke folder project tempat terminalmu berada.
3. **Aman untuk Update**: Jika dijalankan ulang pada project yang sudah memiliki `.agents/docs/PRD.md`, `API_SPEC.md`, `SCHEMA.md`, atau `PROGRESS.md`, installer hanya akan memperbarui `agents/`, `rules/`, dan `skills/` **tanpa menimpa dokumen kerja di `.agents/docs/`**.

---

## Cara Pakai di Chat Antigravity

| Kamu tulis di chat  | Yang terjadi                                                                                                                                                                           |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/prd <ide>`        | Agent `prd` memeriksa kondisi project (kosong/sudah ada), mewawancarai kamu sampai tuntas, lalu menulis `.agents/docs/PRD.md`.                                                         |
| `/pm <fitur/tugas>` | Agent `pm` mendeteksi stack, memilih sub-agent & skill, meminta konfirmasi `"oke"`, lalu menjalankan sub-agent dalam **gelombang paralel** (`database`, `be`, `fe`, `qa`, `review`, `security`). |
| `/solo <tugas>`     | Antigravity mengerjakan langsung sendiri tanpa PM dan tanpa sub-agent lain (cocok untuk tugas kecil/cepat; tetap bisa update `PROJECT_MAP.md` & `PROGRESS.md`). |

---

## Struktur `.agents/` yang Terpasang

```text
.agents/
├── agents/
│   ├── prd.md            # Menulis PRD.md (F00, F01, F02, ...) & membantu memilih tech stack
│   ├── pm.md             # Mengatur gelombang paralel sub-agent, kontrak API, & PROGRESS.md
│   ├── be.md             # REST API, logika bisnis, struktur berlapis, & query berparameter
│   ├── fe.md             # Halaman, komponen modular, state, & integrasi API
│   ├── database.md       # Skema, strategi indeks, EXPLAIN query plan, & audit performa
│   ├── qa.md             # Pengujian E2E Playwright berbasis TC-* di QA-BATCH / saat diminta
│   ├── review.md         # Code quality reviewer (file panjang, duplikasi, arsitektur BE/FE)
│   └── security.md       # Audit keamanan BE sampai FE + rekomendasi perbaikan konkret
├── rules/
│   └── agent.md          # Aturan ringkas orkestrasi, plus62 anti-yapping, & Graph-Map
├── skills/
│   ├── ponytail/         # Pragmatic senior dev (YAGNI, reuse, native-first, kode ringkas)
│   ├── frontend-design/  # Anti AI-slop, desain visual berkarakter, & hierarki tipografi
│   ├── humanizer/        # Menghilangkan kalimat kaku/robotik khas AI pada teks UI & dokumen
│   └── security-audit/   # Metodologi audit keamanan berbasis bukti (Source -> Validation -> Sink)
└── docs/
    └── README.md         # Tempat menyimpan PRD.md, PROJECT_MAP.md, API_SPEC.md, SCHEMA.md, & PROGRESS.md
```

---

## Gelombang Eksekusi Paralel pada `/pm` (Build-First + `QA-BATCH`)

1. **KONFIRMASI**: PM menampilkan header, rencana gelombang, dan rekomendasi skill -> berhenti menunggu `"oke"` darimu.
2. **FASE 1 [Kontrak & Skema]**: PM menyusun `.agents/docs/API_SPEC.md` (beserta `TC-*`), bersama `database` yang merancang `.agents/docs/SCHEMA.md` bila ada tabel/query kompleks.
3. **FASE 2 [Gelombang Kode — Paralel]**: Sub-agent `be` dan `fe` berjalan bersamaan di wilayah foldernya masing-masing (cek syntax/build ringan).
4. **STEP AKHIR `QA-BATCH` [Uji, Review & Audit — Paralel]**: `qa` (E2E Playwright per `TC-*`), `review` (kualitas & lapisan kode), `security` (audit keamanan), dan `database` (review query bila perlu) berjalan bersamaan.
5. **PERBAIKAN & VERIFIKASI ULANG (Opsional)**: Hanya berjalan bila `QA-BATCH` menemukan bug, kode perlu dipangkas, atau celah keamanan (`[Target: be/fe]`).

---

## Lisensi & Atribusi (Gratis — Dilarang Diperjualbelikan)

Copyright (c) 2026 **Calvin Candra**.

**Orchestrator Kit** dilisensikan di bawah **[CC BY-NC 4.0 (Creative Commons Attribution-NonCommercial 4.0 International)](./LICENSE)**:

- ✅ **Gratis dipakai & dimodifikasi** untuk keperluan belajar, pribadi, maupun membantu pengerjaan proyek Anda.
- ✅ **Wajib mencantumkan atribusi** nama pembuat asli (**Calvin Candra**).
- ❌ **DILARANG KERAS diperjualbelikan** (dilarang menjual ulang kit ini, membungkusnya menjadi produk/template berbayar, atau memonetisasinya secara komersial).

### Atribusi Skill Pihak Ketiga (`.agents/skills/`)

Kit ini bundel dengan 4 skill komunitas open-source yang hak cipta dan lisensinya dimiliki oleh masing-masing pembuat aslinya (detail lengkap di [LICENSE](./LICENSE)):

- [`ponytail`](https://github.com/DietrichGebert/ponytail) oleh Dietrich Gebert (MIT)
- [`frontend-design`](https://github.com/anthropics/skills/tree/main/skills/frontend-design) oleh Anthropic (`anthropics/skills`)
- [`humanizer`](https://github.com/blader/humanizer) oleh blader (MIT)
- [`security-audit`](https://github.com/zrack/security-audit-skill) oleh zrack (MIT)
