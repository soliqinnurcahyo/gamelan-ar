export function Home() {
  return `
    <div class="home">

      <div class="hero">

    <img
        src="/hero.png"
        alt="Hero"
        class="hero-image"
    >

    <h1>
        Belajar Gamelan <br>
        <span>dengan WebAR</span>
    </h1>

    <p>
        Ayo kenali alat musik gamelan
        secara interaktif menggunakan
        Augmented Reality.
    </p>

</div>

      <button id="btnStart">
        <i data-lucide="scan-search"></i>
<span>Mulai Scan AR</span>
      </button>

      <div class="home-menu">

    <div class="menu-card" id="btnAbout">
        <div class="menu-icon">
    <i data-lucide="book-open"></i>
</div>
        <h3>Tentang</h3>
    </div>

    <div class="menu-card" id="btnGuide">
        <div class="menu-icon">
    <i data-lucide="scan-search"></i>
</div>
        <h3>Panduan</h3>
    </div>

    <div class="menu-card" id="btnLearning">
        <div class="menu-icon">
    <i data-lucide="graduation-cap"></i>
</div>
        <h3>Tujuan</h3>
    </div>

    <div class="menu-card" id="btnDeveloper">
        <div class="menu-icon">
    <i data-lucide="user-round"></i>
</div>
        <h3>Pengembang</h3>
    </div>

</div>

    </div>
  `;
}