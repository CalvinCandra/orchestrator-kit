# Orchestrator Kit

Kumpulan agent AI paralel (`prd`, `pm`, `be`, `fe`, `database`, `qa`, `security`) beserta kumpulan skill pilihan (`ponytail`, `frontend-design`, `humanizer`, `security-audit`) untuk **Google Antigravity**. Tidak terikat bahasa/framework: Laravel, NestJS, Express, React, Vue, Python, Go, dan lainnya dideteksi langsung dari project atau dirancang lewat `/prd`.

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
| `/pm <fitur/tugas>` | Agent `pm` mendeteksi stack, memilih sub-agent & skill, meminta konfirmasi `"oke"`, lalu menjalankan sub-agent dalam **gelombang paralel** (`database`, `be`, `fe`, `qa`, `security`). |
| `/solo <tugas>`     | Antigravity mengerjakan langsung sendiri tanpa PM dan tanpa sub-agent lain (cocok untuk tugas kecil/cepat).                                                                            |

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
│   ├── qa.md             # Pengujian di dalam sandbox + review kualitas & pemangkasan kode
│   └── security.md       # Audit keamanan BE sampai FE + rekomendasi perbaikan konkret
├── rules/
│   └── agent.md          # Aturan utama orkestrasi (trigger: always_on)
├── skills/
│   ├── ponytail/         # Pragmatic senior dev (YAGNI, reuse, native-first, kode ringkas)
│   ├── frontend-design/  # Anti AI-slop, desain visual berkarakter, & hierarki tipografi
│   ├── humanizer/        # Menghilangkan kalimat kaku/robotik khas AI pada teks UI & dokumen
│   └── security-audit/   # Metodologi audit keamanan berbasis bukti (Source -> Validation -> Sink)
└── docs/
    └── README.md         # Tempat menyimpan PRD.md, API_SPEC.md, SCHEMA.md, & PROGRESS.md
```

---

## Gelombang Eksekusi Paralel pada `/pm`

1. **KONFIRMASI**: PM menampilkan stack, sub-agent terpilih, rencana gelombang fase, dan rekomendasi skill -> berhenti menunggu `"oke"` darimu.
2. **FASE 1 [Kontrak & Skema]**: PM menyusun `.agents/docs/API_SPEC.md` bersama `database` yang merancang `.agents/docs/SCHEMA.md`.
3. **FASE 2 [Gelombang Kode — Paralel]**: Sub-agent `be` dan `fe` berjalan bersamaan di wilayah foldernya masing-masing.
4. **FASE 3 [Gelombang Audit, Code Review & Uji — Paralel]**: Sub-agent `database` (review efisiensi query), `qa` (eksekusi tes + review pemangkasan kode), dan `security` (audit keamanan + solusi) berjalan bersamaan.
5. **FASE 4 [Perbaikan Sesuai Jobdesk — Opsional]**: Hanya berjalan 1 putaran bila Fase 3 menemukan bug, kode yang terlalu panjang, atau celah keamanan (`[Target: be]` dikirim ke `be`, `[Target: fe]` dikirim ke `fe`).
