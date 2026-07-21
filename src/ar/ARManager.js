import * as THREE from "three";
import { MindARThree } from "mind-ar/dist/mindar-image-three.prod.js";

import { MarkerData } from "../data/MarkerData";
import { loadModel } from "./ModelManager";
import { showHome } from "../App";

import {
    showLoading,
    updateLoading,
    updateProgress,
    hideLoading
} from "../ui/Loading";

import {
  createInfoPanel,
  updateInfoPanel,
  resetInfoPanel,
  closeDetail
} from "../ui/InfoPanel";

import {
  createAROverlay,
  hideScanHint,
  showScanHint
} from "../ui/AROverlay";

import { playAudio, stopAudio } from "./AudioManager";

let mindarInstance = null;
let animationId = null;
let rendererInstance = null;
let activeModel = null;
let markerDetected = false;
let autoRotate = true;

export async function startAR() {

  document.querySelector("#app").innerHTML = "";

  showLoading("Memuat Kamera...");

  createInfoPanel();

  const app = document.querySelector("#app");

  const container = document.createElement("div");
  container.id = "ar-container";
  container.style.width = "100vw";
  container.style.height = "100vh";

  app.appendChild(container);

  createAROverlay(async () => {

      await stopAR();

      showHome();

  });

  const mindarThree = new MindARThree({
    container,
    imageTargetSrc: "/assets/targets/targets.mind",

    uiScanning: false,
    uiLoading: false,
    uiError: false,
});

  mindarInstance = mindarThree;

  const { renderer, scene, camera } = mindarThree;

  rendererInstance = renderer;

  // Cahaya utama
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(2, 4, 3);
scene.add(directionalLight);

// Cahaya lingkungan
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

// Cahaya langit
const hemisphereLight = new THREE.HemisphereLight(
  0xffffff,
  0x444444,
  0.7
);
scene.add(hemisphereLight);

const totalModels = MarkerData.length;

let loadedModels = 0;

  // Loop seluruh marker
  for (const item of MarkerData) {

    const anchor = mindarThree.addAnchor(item.index);

        anchor.onTargetFound = () => {

      activeModel = model;

    if (!markerDetected) {

        markerDetected = true;

        if ("vibrate" in navigator) {
            navigator.vibrate([40, 30, 40]);
        }

    }

    hideScanHint();
    closeDetail();
    updateInfoPanel(item);

};

    anchor.onTargetLost = () => {

       markerDetected = false;

    if (activeModel === model) {
        activeModel = null;
    }

    showScanHint();

    resetInfoPanel();
    closeDetail();
};

    let model;

try {

    model = await loadModel(item);

    anchor.group.add(model);

    loadedModels++;

updateProgress(
    loadedModels,
    totalModels
);

} catch (err) {

    console.error("Gagal load", item.nama, err);

}

  }

  updateLoading("Menyiapkan Kamera...");

  await mindarThree.start();

hideLoading();

  let isDragging = false;
let lastX = 0;

container.addEventListener("pointerdown", (e) => {

    if (!activeModel) return;

    isDragging = true;
    lastX = e.clientX;

});

container.addEventListener("pointermove", (e) => {

    if (!isDragging || !activeModel) return;

    const delta = e.clientX - lastX;

    activeModel.rotation.y += delta * 0.01;

    lastX = e.clientX;

});

container.addEventListener("pointerup", () => {

    isDragging = false;

});

container.addEventListener("pointerleave", () => {

    isDragging = false;

});

  renderer.setAnimationLoop(() => {

    if (autoRotate && activeModel) {

        activeModel.rotation.z += 0.01;

    }

    renderer.render(scene, camera);

});

}

export async function stopAR() {

    stopAudio();

    if (mindarInstance) {
        try {
            await mindarInstance.stop();
        } catch (e) {
            console.warn(e);
        }

        mindarInstance = null;
    }

    // Hapus renderer Three.js
    if (rendererInstance) {
        rendererInstance.dispose();
        rendererInstance = null;
    }

    // Hapus container AR
    const container = document.getElementById("ar-container");
    if (container) {
        container.remove();
    }

    // Hapus overlay
    const overlay = document.getElementById("ar-overlay");
    if (overlay) {
        overlay.remove();
    }
}