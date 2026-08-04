# Penghijauan Repo (Bikin Contribution Graph Auto Hijau)

Repo ini dibuat khusus buat ngehijaun grafik kontribusi GitHub lu biar keliatan aktif dan rame tiap hari tanpa ribet.

---

## Cara Pake Buat User Lain (Fork / Clone)

Buat siapa aja yang nemu repo ini dan mau profil GitHub-nya makin pekat ijonya, lu bisa pake cara ini:

### Cara 1: Otomatis Pake Fork (Gak Perlu Nyalain PC)
1. **Fork Repo Ini**: Klik tombol **Fork** di pojok kanan atas GitHub.
2. **Aktifin GitHub Actions**: Masuk ke tab **Actions** di repo hasil fork lu, terus klik tombol **I understand my workflows, go ahead and enable them**.
3. **Beres!**: Tiap hari GitHub Actions bakal otomatis nambahin 3-8 commit acak sebanyak 4 kali sehari. Profil lu auto hijau terus!

---

### Cara 2: Clone & Backfill Hari-Hari Lalu (Bikin Ijo Setahun Terakhir)
Kalo lu mau ngisi hari-hari yang udah lewat biar setahun ke belakang langsung ijo pekat:

1. Clone repo ini ke komputer lu:
   ```bash
   git clone https://github.com/zidanaetrna/penghijauan.git
   cd penghijauan
   ```
2. Pastiin email git di laptop lu sama kayak email akun GitHub lu (`git config user.email`).
3. Jalanin script generator-nya:

   - **Backfill 1 tahun terakhir (Default 3-10 commit/hari):**
     ```bash
     node generator.js --min 3 --max 10 --push
     ```

   - **Custom tanggal & jumlah commit suka-suka:**
     ```bash
     node generator.js --start 2025-01-01 --end 2026-08-04 --min 5 --max 15 --push
     ```

---

## Opsi Parameter Script (`generator.js`)
- `--start YYYY-MM-DD`: Tanggal mulai (default: 1 tahun lalu)
- `--end YYYY-MM-DD`: Tanggal selesai (default: hari ini)
- `--min <angka>`: Minimal commit per hari (default: 3)
- `--max <angka>`: Maksimal commit per hari (default: 10)
- `--push`: Otomatis push ke repo GitHub lu pas selesai
