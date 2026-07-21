export function createAROverlay(onBack) {

    const overlay = document.createElement("div");

    overlay.id = "ar-overlay";

    overlay.innerHTML = `

    <button id="btnBackAR">
        ←
    </button>

    <div id="scanHint">

        <div class="scan-icon">
            <span class="material-symbols-rounded scan-icon">
    center_focus_strong
</span>
        </div>

        <h3>Arahkan Kamera</h3>

        <p>
            Arahkan kamera ke halaman majalah
hingga model 3D muncul.
        </p>

    </div>

`;

    document
        .querySelector("#app")
        .appendChild(overlay);

    document
    .getElementById("btnBackAR")
    .addEventListener("click", () => {

        onBack();

    });

}

export function showScanHint() {

    const hint = document.querySelector("#scanHint");

    if (hint) {
        hint.style.opacity = "1";
    }

}

export function hideScanHint() {

    const hint = document.querySelector("#scanHint");

    if (hint) {
        hint.style.opacity = "0";
    }

}