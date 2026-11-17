# Aturan Orkestrasi

## Penanda (awal pesan user)

- `/solo <tugas>`: kerjakan sendiri, tanpa PM atau agent lain.
- `/pm <tugas>`: ikuti `.agents/agents/pm.md`.
- `/prd <ide>`: ikuti `.agents/agents/prd.md`.
- Tanpa penanda: seperti `/solo`. Kalau tugas jelas besar (banyak file,
  auth, pembayaran, data sensitif), tanya satu baris "Mau pakai /pm?".
  Kalau merancang sistem baru, tanya "Mau pakai /prd?".

## Aturan semua agent

1. Jangan menebak stack. Stack dari catatan PM atau .agents/docs/PRD.md,
   cocokkan dengan kode. Kalau bertentangan, berhenti dan tanya.
2. Satu wilayah satu pemilik. Jangan edit file wilayah agent lain atau
   file yang sedang dikerjakan agent lain.
3. Terima path file, bukan isi. Baca seperlunya.
4. Laporan maksimal 10 baris: dikerjakan, file diubah, sisa masalah.
   Pisahkan fakta dari dugaan.
5. Jangan deploy, hapus data, atau perintah destruktif tanpa persetujuan user.
6. Jangan membuat file di luar rencana. Tanya dulu.
7. Skill hanya dipakai bila user menyetujui lewat PM.
8. Hanya pm dan prd yang bicara dengan user. Lainnya melapor ke pm.
9. Dokumen kerja disimpan di .agents/docs/.
10. Jangan jalankan perintah ke production atau data nyata.
