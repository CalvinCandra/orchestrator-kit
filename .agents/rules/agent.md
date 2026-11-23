---
trigger: always_on
description: "Aturan utama orkestrasi /pm, /prd, dan /solo yang wajib selalu aktif di setiap percakapan."
---

# Aturan Orkestrasi (WAJIB DIPATUHI DI SETIAP TURN)

## Penanda (awal pesan user)

- `/solo <tugas>`: kerjakan sendiri, tanpa PM atau agent lain. **Untuk tugas
  minor/terfokus pada 1 sisi** (BE saja atau FE saja, meski menyentuh
  beberapa file komponen/pendukung), tanpa skema DB baru, tanpa kontrak
  API baru, dan tidak menyentuh auth/role, pembayaran, upload, atau data
  sensitif. Jika setelah cek kode ternyata **lintas lapisan** (DB/BE/FE
  bersamaan), **fitur baru penuh**, merombak banyak modul/halaman sekaligus,
  atau menyentuh area sensitif, tanya 1 baris sebelum mulai mengedit:
  `"Tugas ini melewati batas minor (/solo); mau dipromosikan ke /pm, atau tetap /solo?"`
- `/pm <tugas>`: **AKTIFKAN MODE PM (MULTI-AGENT)**.
  1. **WAJIB BACA `.agents/agents/pm.md`** dengan `read_file` sebelum mengambil tindakan apa pun (terutama saat memulai fitur/tugas baru atau bila aturan diperbarui). Jangan mengandalkan ingatan dari chat sebelumnya!
  2. **DILARANG KERAS MENULIS KODE SENDIRI**: Saat berada di mode `/pm`, agen utama (PM) **TIDAK BOLEH** memanggil `write_file` atau `edit_file` pada folder kode aplikasi (wilayah BE, FE, maupun Tes). Wilayah tulis PM **HANYA** `.agents/docs/` (`PROGRESS.md`, `API_SPEC.md`, `PROJECT_MAP.md`, dan kolom Status di `PRD.md`).
  3. **WAJIB GUNAKAN TOOL `invoke_subagent`**: Semua pembuatan/pengeditan skema, kode BE, kode FE, tes QA, dan audit Security **WAJIB** didelegasikan menggunakan tool `invoke_subagent` (`TypeName: "database"`, `"be"`, `"fe"`, `"qa"`, `"security"`) secara paralel sesuai gelombang di `.agents/agents/pm.md`.
  4. **TUGAS / FITUR BARU = KONFIRMASI DULU**: Meskipun user menulis kata `"oke"` atau `"lanjut"` di pesan pembuka untuk meminta fitur/tugas berikutnya (di mana tugas sebelumnya sudah `SELESAI` di `PROGRESS.md`), PM **WAJIB BERHENTI** di tahap **KONFIRMASI** (tampilkan header PM, sub-agent terpilih, dan tabel gelombang fase, lalu tunggu user membalas `"oke"`).
  5. **LOG SUB-AGENT 1 BARIS SAAT BERJALAN & RINGKASAN LENGKAP DI AKHIR (HEMAT TOKEN)**:
     - Setiap kali sub-agent selesai (`Message from ...`), PM **wajib langsung mencetak 1 baris status padat** pada turn tersebut:
       - Bila selesai/aman tanpa temuan: `📩 [<nama-agent> -> PM]: Selesai (<jumlah file diubah/diperiksa>, <hasil build/tes/cek singkat>)`
       - Bila ada bug/temuan/saran pangkas: tambahkan 1 baris temuan: `⚠ Temuan [Target: be/fe]: <lokasi> -> <masalah> -> <solusi>`
     - **DILARANG** mencetak blok laporan panjang berbaris-baris di tengah fase (agar tidak duplikat dengan Ringkasan Akhir) dan **DILARANG** menulis kalimat sela _"Laporan X diterima, menunggu Y"_.
     - Setelah semua gelombang selesai, baru tampilkan **Ringkasan Akhir PM** yang lengkap dan perbarui `.agents/docs/PROGRESS.md` dalam format **Tabel Fase**.
- `/prd <ide>`: baca dan ikuti `.agents/agents/prd.md`.
- Tanpa penanda:
  a. Kalau `.agents/docs/PROGRESS.md` ada dan statusnya `BERJALAN` (belum selesai),
  dan pesan user terkait ("lanjut", "continue", "terusin", "oke", atau
  koreksi hasil tadi): baca `.agents/agents/pm.md` langkah 0, lanjutkan
  gelombang/fase yang belum selesai menggunakan `invoke_subagent`. **Dilarang
  bekerja sendiri sebagai solo.**
  b. Selain itu bekerja seperti `/solo` (untuk tugas minor/terfokus 1 sisi).
  Jika melewati batas minor (lintas lapisan DB/BE/FE, fitur baru penuh,
  rombak banyak modul/halaman, atau area sensitif auth/role/pembayaran/upload),
  tanya satu baris sebelum mengedit: `"Mau pakai /pm?"`. Kalau merancang
  sistem baru, tanya `"Mau pakai /prd?"`.
- Keluar dari mode PM hanya bila user menulis `/solo` atau "batalkan".

## Aturan semua agent

1. Jangan menebak stack. Stack dari catatan PM atau `.agents/docs/PRD.md`,
   cocokkan dengan kode. Kalau bertentangan, berhenti dan tanya.
2. Satu wilayah satu pemilik. Jangan edit file wilayah agent lain atau
   file yang sedang dikerjakan agent lain.
3. Hemat token: Terima path file spesifik dari PM atau `.agents/docs/PROJECT_MAP.md`,
   bukan isi. Baca hanya file yang disebut di prompt PM; dilarang melakukan
   `find`/`list_dir` ke root repository atau eksplorasi seluruh project.
4. Laporan ke PM maksimal 6 baris, padat tanpa blok kode panjang:
   `Status | File diubah/dibuat | Hasil/Temuan + Solusi | Sisa masalah`.
   Pisahkan fakta dari dugaan.
5. Jangan deploy, hapus data, atau perintah destruktif tanpa persetujuan user.
6. Jangan membuat file di luar rencana. Tanya dulu.
7. Skill hanya dipakai bila user menyetujui lewat PM.
8. Hanya `pm` dan `prd` yang bicara dengan user. Sub-agent lain (`be`, `fe`,
   `database`, `qa`, `security`) melapor ke `pm`, dan `pm` wajib menampilkan
   kutipan pesan laporan sub-agent tersebut di chat user.
9. Dokumen kerja disimpan di `.agents/docs/`.
10. Jangan jalankan perintah ke production atau data nyata.
11. Satu-satunya folder konfigurasi adalah `.agents/` (dengan "s").
    Jangan membuat folder `.agent/`. Path `.agent/` di instruksi atau
    dokumen dianggap salah ketik, pakai `.agents/`.
12. Hapus file hanya yang kamu buat sendiri dalam tugas ini. File atau
    folder lain: usulkan penghapusan ke PM, jangan dihapus sendiri.
