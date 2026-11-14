# Orchestrator Kit

Kumpulan agent AI (PRD, PM, BE, FE, Database, QA, Security) yang bisa
disalin ke project mana saja. Dibuat untuk Antigravity. Tidak terikat
framework: Laravel, Express, Vue, dan lainnya dibaca dari project,
bukan ditulis di prompt.

## Cara kerja singkat

Kamu tetap mengetik di Antigravity seperti biasa. Awal pesanmu menentukan
siapa yang bekerja:

| Kamu tulis      | Yang terjadi                                                                                |
| --------------- | ------------------------------------------------------------------------------------------- |
| `/solo <tugas>` | Antigravity mengerjakan langsung. Tanpa PM, tanpa agent lain.                               |
| `/pm <tugas>`   | PM muncul: deteksi stack, wawancara bila ragu, lalu membagi tugas ke agent.                 |
| `/prd <ide>`    | Agent prd mewawancarai kamu (bisa membantu memilih tech) lalu menulis `.agent/docs/PRD.md`. |
| (tanpa penanda) | Sama dengan `/solo`. Kalau tugasnya jelas besar, ia bertanya dulu: "mau pakai /pm?"         |

Kenapa ada penanda: setiap agent yang dipanggil memakan token dan limit.
Tugas kecil tidak perlu PM.

## Isi kit

```
orchestrator-kit/
├─ AGENTS.md              aturan orkestrasi (penanda + aturan semua agent)
└─ .agent/
   ├─ agents/
   │  ├─ prd.md           menulis PRD dan membantu memilih tech
   │  ├─ pm.md            memecah tugas, mewawancarai, melapor ke kamu
   │  ├─ be.md            REST API, logika bisnis
   │  ├─ fe.md            halaman, komponen, pemanggilan API
   │  ├─ database.md      skema, indeks, optimasi query
   │  ├─ qa.md            menulis dan menjalankan tes, mencari bug
   │  └─ security.md      pemeriksaan keamanan BE sampai FE
   ├─ skill/              skill opsional (BE, FE, dll.)
   └─ docs/               hasil kerja agent (PRD, kontrak API, skema, laporan)
```

## Pemasangan

1. Salin `AGENTS.md` dan folder `.agent/` ke root project tujuan.
   Contoh PowerShell:
   ```
   Copy-Item orchestrator-kit\AGENTS.md C:\path\project\
   Copy-Item -Recurse orchestrator-kit\.agent C:\path\project\.agent
   ```
2. Buka project itu di Antigravity.
3. Ketik tugas dengan penanda, misalnya `/pm buat fitur login`.

Tidak ada konfigurasi lain. Stack tidak perlu ditulis, PM mendeteksinya.

## Peran dan wilayah

| Agent    | Tugas                                                                | Boleh menulis           | Catatan                                                |
| -------- | -------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------ |
| prd      | Wawancara ide, pilih tech, tulis PRD                                 | `.agent/docs/PRD.md`    | Boleh bicara langsung dengan kamu. Tidak menulis kode. |
| pm       | Deteksi, wawancara, delegasi, laporan                                | `.agent/docs/`          | Tidak menulis kode. Boleh bicara langsung dengan kamu. |
| be       | Endpoint, logika bisnis, menerapkan migrasi dan rekomendasi query    | folder BE               | Tidak menyentuh FE                                     |
| fe       | Halaman, komponen, integrasi API                                     | folder FE               | Tidak menyentuh BE                                     |
| database | Skema, indeks (satu kolom, gabungan, pencarian teks), analisis query | `.agent/docs/SCHEMA.md` | Hanya merekomendasikan, tidak mengedit migrasi         |
| qa       | Tes dan pencarian bug                                                | folder tes              | Tidak mengedit kode aplikasi                           |
| security | Auth, validasi, injeksi, XSS, secret, dependency                     | tidak ada               | Hanya membaca dan melapor                              |

Prinsip: satu folder satu pemilik, dan tidak ada dua agent yang mengedit
file yang sama bersamaan. Agent selain prd dan pm melapor ke PM.

## Mulai dari ide: `/prd` lalu `/pm`

Untuk sistem baru, urutannya:

1. `/prd buat sistem kasir untuk warung` -> agent prd bertanya, kamu jawab,
   PRD ditulis di `.agent/docs/PRD.md`. Kamu setujui atau revisi.
2. `/pm bangun sesuai PRD` -> PM membaca PRD, lalu membagi tugas ke agent lain.

Kamu bisa memilih tech sendiri atau minta disarankan. Rekomendasi tech
adalah pertimbangan umum, bukan kepastian.

## Alur `/pm`

```
1. DETEKSI      baca PRD (kalau ada) dan file kunci project
                (composer.json, package.json, dll.)
2. WAWANCARA    hanya kalau ragu: satu putaran, maksimal 5 pertanyaan,
                setiap pertanyaan ada rekomendasi
3. KONFIRMASI   PM menampilkan stack, skala, urutan kerja, skill -> kamu bilang "oke"
4. SKALA        KECIL (1 agent), SEDANG (1-3 agent), BESAR (semua yang relevan + security)
5. DELEGASI     agent diberi tujuan + catatan stack + path file (bukan isi)
6. TEMUAN       QA/security melapor ke PM, PM meneruskan ke be/fe
7. LAPOR        ringkasan maksimal 10 baris
```

Kalau BE dan FE akan bekerja paralel, PM menulis kontrak
(`.agent/docs/API_SPEC.md`, `.agent/docs/SCHEMA.md`) dulu dan meminta
persetujuanmu.

## Dokumen hasil kerja

Disimpan di `.agent/docs/`, terpisah dari `docs/` milik project kamu.
File dibuat agent saat dibutuhkan: `PRD.md`, `API_SPEC.md`, `SCHEMA.md`,
dan `REPORTS/` (hanya jika diminta).

## Skill

PM hanya membaca nama dan deskripsi skill, lalu menyarankannya saat
konfirmasi. Skill baru dipakai setelah kamu setujui, maksimal 2 per agent.
Taruh skill di `.agent/skill/`.

## Aturan untuk semua agent

- Tidak menebak teknologi. Stack berasal dari catatan PM atau
  `.agent/docs/PRD.md`. Kalau bertentangan dengan kode, berhenti dan tanya.
- Tidak deploy, menghapus data, atau perintah destruktif tanpa persetujuanmu.
- Tidak membuat file di luar rencana.
- Laporan maksimal 10 baris, memisahkan fakta dari dugaan.

## Keterbatasan

- QA dan Security adalah pemeriksaan dasar, bukan pengganti tes
  menyeluruh atau audit keamanan profesional.
- Versi gratis mudah kena limit. Pakai `/solo` untuk tugas kecil.
- Kualitas hasil bergantung pada model yang kamu pakai.
- Rekomendasi tech dari agent prd adalah pertimbangan umum dan bisa
  kurang mutakhir.

## Uji pertama yang disarankan

Coba di folder percobaan, bukan project penting:

1. `/solo jelaskan project ini` -> harus dijawab langsung tanpa PM.
2. `/prd sistem kasir sederhana` -> prd bertanya, lalu menulis `.agent/docs/PRD.md`.
3. `/pm bangun sesuai PRD` -> PM membaca PRD, bertanya bila ragu, lalu meminta "oke".
