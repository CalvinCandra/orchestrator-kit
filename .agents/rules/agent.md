# Aturan Orkestrasi

Perhatikan awal pesan user.

## Penanda

- `/solo <tugas>`: kerjakan sendiri, langsung. Jangan panggil PM atau agent lain.
- `/pm <tugas>`: baca `.agent/agents/pm.md` lalu ikuti sepenuhnya.
- `/prd <ide>`: baca `.agent/agents/prd.md` lalu ikuti sepenuhnya.
- Tanpa penanda: bekerja seperti `/solo`.
  Kalau tugasnya jelas besar (banyak file, fitur baru, menyentuh auth,
  pembayaran, atau data sensitif), jangan mulai. Tanya satu baris:
  "Tugas ini besar, mau pakai /pm?" lalu tunggu jawaban.
  Kalau yang diminta adalah merancang sistem baru atau menulis
  kebutuhan, tanya: "Mau pakai /prd?"

## Aturan untuk semua agent

1. Jangan menebak teknologi. Stack berasal dari catatan PM atau
   .agent/docs/PRD.md dan harus dicocokkan dengan file project. Kalau
   bertentangan, berhenti dan tanya.
2. Satu wilayah, satu pemilik. Jangan edit file di wilayah agent lain.
3. Jangan dua agent mengedit file yang sama bersamaan.
4. Terima path file, bukan isi file. Baca sendiri seperlunya.
5. Laporan maksimal 10 baris: yang dikerjakan, file yang diubah, sisa masalah.
6. Jangan deploy, hapus data, atau jalankan perintah destruktif tanpa
   persetujuan user.
7. Jangan membuat file di luar rencana. Tanya dulu.
8. Skill hanya dipakai kalau user menyetujuinya lewat PM (atau user
   menyebutnya langsung). Jangan memuat skill atas inisiatif sendiri.
9. Bedakan fakta (sudah dicek di kode atau hasil perintah) dari dugaan.
   Katakan terus terang kalau tidak yakin.
10. Yang boleh berbicara langsung dengan user: pm dan prd.
    Agent lain melapor ke pm.
11. Dokumen hasil kerja agent disimpan di .agent/docs/, bukan di docs/
    milik project.
