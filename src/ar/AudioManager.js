let currentAudio = null;

let currentPath = null;

let isPaused = false;

let onAudioEnded = null;

export function playAudio(path) {

 // Jika audio yang sama sedang dijeda
if (currentAudio && isPaused && currentPath === path) {

    currentAudio.play();

    currentAudio.onended = () => {

    currentAudio = null;
    currentPath = null;
    isPaused = false;

    if (onAudioEnded) {
        onAudioEnded();
    }

};

    isPaused = false;

    return;

}

  // Jika ada audio lain, hentikan
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(path);

currentPath = path;

currentAudio.play();

isPaused = false;

}

export function pauseAudio() {

    if (!currentAudio) return;

    currentAudio.pause();

    isPaused = true;

}

export function stopAudio() {

    if (!currentAudio) return;

    currentAudio.pause();

    currentAudio.currentTime = 0;

    currentAudio = null;

    currentPath = null;

    isPaused = false;

}

export function hasAudio() {

    return currentAudio !== null;

}

export function isAudioPaused() {

    return isPaused;

}

export function isAudioPlaying() {

    return currentAudio !== null && !isPaused;

}

export function setAudioEndedCallback(callback) {

    onAudioEnded = callback;

}