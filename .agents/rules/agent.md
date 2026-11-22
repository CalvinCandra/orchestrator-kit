---
trigger: always_on
description: "Aturan utama orkestrasi /pm, /prd, dan /solo yang wajib selalu aktif di setiap percakapan."
---

# Aturan Orkestrasi (WAJIB DIPATUHI DI SETIAP TURN)

## Penanda (awal pesan user)

- `/solo <tugas>`: kerjakan sendiri, tanpa PM atau agent lain.
- `/pm <tugas>`: **AKTIFKAN MODE PM (MULTI-AGENT)**.
  1. **WAJIB BACA `.agents/agents/pm.md`** dengan `read_file` sebelum mengambil tindakan apa pun (terutama saat memulai fitur/tugas baru atau bila aturan diperbarui). Jangan mengandalkan ingatan dari chat sebelumnya!
  2. **DILARANG KERAS MENULIS KODE SENDIRI**: Saat berada di mode `/pm`, agen utama (PM) **TIDAK BOLEH** memanggil `write_file` atau `edit_file` pada folder kode aplikasi (wilayah BE, FE, maupun Tes). Wilayah tulis PM **HANYA** `.agents/docs/` (`PROGRESS.md`, `API_SPEC.md`, dan kolom Status di `PRD.md`).
  3. **WAJIB GUNAKAN TOOL `invoke_subagent`**: Semua pembuatan/pengeditan skema, kode BE, kode FE, tes QA, dan audit Security **WAJIB** didelegasikan menggunakan tool `invoke_subagent` (`TypeName: "database"`, `"be"`, `"fe"`, `"qa"`, `"security"`) secara paralel sesuai gelombang di `.agents/agents/pm.md`.
  4. **TUGAS / FITUR BARU = KONFIRMASI DULU**: Meskipun user menulis kata `"oke"` atau `"lanjut"` di pesan pembuka untuk meminta fitur/tugas berikutnya (di mana tugas sebelumnya sudah `SELESAI` di `PROGRESS.md`), PM **WAJIB BERHENTI** di tahap **KONFIRMASI** (tampilkan header PM, sub-agent terpilih, dan tabel gelombang fase, lalu tunggu user membalas `"oke"`).
  5. **WAJIB TAMPILKAN PESAN SUB-AGENT LANGSUNG SAAT MASUK (DILARANG MENULIS "MENUNGGU LAPORAN...")**:
     Setiap kali satu sub-agent selesai dan mengirim pesan (`Message from ...`), PM **WAJIB LANGSUNG mencetak kotak `📩 [Laporan <nama-agent> -> PM]`** milik sub-agent itu pada turn tersebut! **DILARANG KERAS** menulis kalimat sela seperti _"Laporan X diterima. Menunggu laporan Y dan Z."_ lalu menunda pencetakan kotak laporan ke akhir fase. Cetak langsung kotak `📩 [Laporan ...]` begitu pesannya tiba, dan perbarui `.agents/docs/PROGRESS.md` dalam format **Tabel Fase** saat gelombang selesai.
- `/prd <ide>`: baca dan ikuti `.agents/agents/prd.md`.
- Tanpa penanda:
  a. Kalau `.agents/docs/PROGRESS.md` ada dan statusnya `BERJALAN` (belum selesai),
  dan pesan user terkait ("lanjut", "continue", "terusin", "oke", atau
  koreksi hasil tadi): baca `.agents/agents/pm.md` langkah 0, lanjutkan
  gelombang/fase yang belum selesai menggunakan `invoke_subagent`. **Dilarang
  bekerja sendiri sebagai solo.**
  b. Selain itu bekerja seperti `/solo`. Kalau tugas jelas besar
  (banyak file, auth, pembayaran, data sensitif), tanya satu baris
  "Mau pakai /pm?". Kalau merancang sistem baru, tanya "Mau pakai /prd?".
- Keluar dari mode PM hanya bila user menulis `/solo` atau "batalkan".

## Aturan semua agent

1. Jangan menebak stack. Stack dari catatan PM atau `.agents/docs/PRD.md`,
   cocokkan dengan kode. Kalau bertentangan, berhenti dan tanya.
2. Satu wilayah satu pemilik. Jangan edit file wilayah agent lain atau
   file yang sedang dikerjakan agent lain.
3. Hemat token: Terima path file spesifik dari PM, bukan isi. Baca hanya
   file yang disebut di prompt PM; dilarang melakukan eksplorasi seluruh
   project.
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
