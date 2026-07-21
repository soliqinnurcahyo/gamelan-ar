import { Home } from "./ui/Home.js";
import { startAR } from "./ar/ARManager.js";
import { createModal } from "./ui/Modal.js";

export function showHome() {

    document.querySelector("#app").innerHTML = Home();

    lucide.createIcons();

    // Tombol Scan
    document
        .getElementById("btnStart")
        .addEventListener("click", startAR);

    // Tentang
    document
        .getElementById("btnAbout")
        .addEventListener("click", () => {

            createModal(
                "📖 Tentang Aplikasi",
                "Media pembelajaran ini menggunakan Web Augmented Reality untuk mengenalkan alat musik gamelan kepada siswa kelas 4 Sekolah Dasar."
            );

        });

    // Panduan
    document
        .getElementById("btnGuide")
        .addEventListener("click", () => {

            createModal(
                "📷 Cara Penggunaan",
                "1. Tekan tombol Mulai Scan AR.\n\n2. Izinkan akses kamera.\n\n3. Arahkan kamera ke gambar alat musik pada majalah.\n\n4. Model 3D dan informasi akan muncul."
            );

        });

    // Tujuan
    document
        .getElementById("btnLearning")
        .addEventListener("click", () => {

            createModal(
                "🎓 Tujuan Pembelajaran",
                "Membantu siswa mengenal nama, bentuk, cara memainkan, dan fungsi alat musik gamelan secara interaktif."
            );

        });

    // Pengembang
    document
        .getElementById("btnDeveloper")
        .addEventListener("click", () => {

            createModal(
                "👨‍💻 Pengembang",
                "Aplikasi ini dikembangkan sebagai media pembelajaran berbasis Web Augmented Reality untuk skripsi Program Studi Informatika."
            );

        });

}