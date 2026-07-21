let loadingElement = null;

export function showLoading(text = "Memuat Kamera...") {

    if (loadingElement) return;

    loadingElement = document.createElement("div");
    loadingElement.id = "loading-screen";

    loadingElement.innerHTML = `
<div class="loading-card">

    <h2>WEB AR GAMELAN</h2>

    <div class="loading-spinner"></div>

    <p id="loading-text">${text}</p>

    <div class="progress-bar">
        <div id="progress-fill"></div>
    </div>

    <p id="progress-info">0%</p>

</div>
`;

    document.body.appendChild(loadingElement);
}

export function updateLoading(text) {

    const el = document.getElementById("loading-text");

    if (el) el.textContent = text;

}

export function hideLoading() {

    if (!loadingElement) return;

    loadingElement.remove();

    loadingElement = null;

}

export function updateProgress(current, total){

    const percent = Math.round((current / total) * 100);

    const fill = document.getElementById("progress-fill");
    const info = document.getElementById("progress-info");

    if(fill){

        fill.style.width = percent + "%";

    }

    if(info){

        info.textContent = `${current} / ${total} Model (${percent}%)`;

    }

}