import {
    playAudio,
    pauseAudio,
    isAudioPaused,
    hasAudio,
    isAudioPlaying,
    setAudioEndedCallback
} from "../ar/AudioManager";

let currentMarker = null;

export function createInfoPanel() {
  const panel = document.createElement("div");
  panel.id = "info-panel";

  panel.innerHTML = `

  <div class="info-card">

    <div class="sheet-handle"></div>

    <div class="info-header">
        <h2 id="info-title">Scan Marker</h2>
    </div>

    <button id="play-audio" class="primary-btn">
        ▶ Putar Audio
    </button>

    <div id="toggle-detail" class="detail-card">
        <span>📖 Informasi Lengkap</span>
        <span id="detail-arrow">▼</span>
    </div>

    <div id="detail-content">
    <div id="detail-description"></div>
</div>

</div>
      `;

  document.querySelector("#app").appendChild(panel);

  const btnAudio = document.getElementById("play-audio");

  setAudioEndedCallback(() => {

    btnAudio.textContent = "▶ Putar Audio";

});

btnAudio.addEventListener("click", () => {

    if (!currentMarker) return;

    // Audio sedang diputar
    if (isAudioPlaying()) {

        pauseAudio();
        btnAudio.textContent = "▶ Lanjutkan Audio";
        return;

    }

    // Audio sedang dijeda
    if (isAudioPaused()) {

        playAudio(currentMarker.audio);
        btnAudio.textContent = "⏸ Pause";
        return;

    }

    // Belum ada audio
    playAudio(currentMarker.audio);
    btnAudio.textContent = "⏸ Pause";

});

    const btnToggle = document.getElementById("toggle-detail");
    const detail = document.getElementById("detail-content");
    const arrow = document.getElementById("detail-arrow");

    btnToggle.addEventListener("click", () => {

    const opened = detail.classList.contains("show");

    if (opened) {

        detail.classList.remove("show");
        arrow.textContent = "▼";

    } else {

        detail.classList.add("show");
        arrow.textContent = "▲";

    }

});
}

export function updateInfoPanel(data){

    currentMarker = data;

    document.getElementById("info-title").textContent = data.nama;

    const detail = document.getElementById("detail-description");

if (data.detail) {

    detail.innerHTML = `
<div class="info-box">
    <h3>
        <span class="material-symbols-rounded">lightbulb</span>
        Tahukah Kamu?
    </h3>
    <p>${data.detail.faktaMenarik}</p>
</div>

<div class="info-box">
    <h3>
        <span class="material-symbols-rounded">back_hand</span>
        Cara Memainkan
    </h3>
    <p>${data.detail.cara}</p>
</div>

<div class="info-box">
    <h3>
        <span class="material-symbols-rounded">music_note</span>
        Fungsi
    </h3>
    <p>${data.detail.fungsi}</p>
</div>

<div class="info-box">
    <h3>
        <span class="material-symbols-rounded">forest</span>
        Bahan
    </h3>
    <p>${data.detail.bahan}</p>
</div>

<div class="info-box">
    <h3>
        <span class="material-symbols-rounded">celebration</span>
        Digunakan Pada
    </h3>
    <p>${data.detail.penggunaan}</p>
</div>
`;

} else {

    detail.innerHTML = `
        <p>${data.deskripsi}</p>
    `;

}

    document.getElementById("play-audio").textContent = "▶ Putar Audio";

    document
        .getElementById("info-panel")
        .classList.add("show");

}

export function resetInfoPanel(){

    currentMarker = null;

    document.getElementById("info-title").textContent = "Scan Marker";

    document.getElementById("detail-description").textContent = "";

    document
        .getElementById("info-panel")
        .classList.remove("show");

}

export function getCurrentMarker() {
  return currentMarker;
}

export function closeDetail(){

    const detail = document.getElementById("detail-content");
    const arrow = document.getElementById("detail-arrow");

    detail.classList.remove("show");
    arrow.textContent = "▼";

}