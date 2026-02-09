const uploadInput = document.getElementById("pdfUpload");
const pdfViewer = document.getElementById("pdfViewer");
const placeholder = document.getElementById("placeholder");
const fullscreenToggle = document.getElementById("fullscreenToggle");
const viewerContainer = document.getElementById("viewerContainer");
const publicLinkInput = document.getElementById("publicLink");
const openLinkButton = document.getElementById("openLink");

let currentObjectUrl = null;

const updatePlaceholder = (hasFile) => {
  placeholder.style.display = hasFile ? "none" : "flex";
};

const setPdfSource = (source, shouldRevoke = false) => {
  if (shouldRevoke && currentObjectUrl) {
    URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = null;
  }

  pdfViewer.src = source;
  updatePlaceholder(true);
};

uploadInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) {
    updatePlaceholder(false);
    return;
  }

  currentObjectUrl = URL.createObjectURL(file);
  setPdfSource(currentObjectUrl);
});

openLinkButton.addEventListener("click", () => {
  const url = publicLinkInput.value.trim();
  if (!url) {
    publicLinkInput.focus();
    return;
  }

  setPdfSource(url, true);
});

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    viewerContainer.requestFullscreen();
    fullscreenToggle.textContent = "Выйти из полноэкранного";
    viewerContainer.classList.add("viewer--fullscreen");
    return;
  }

  document.exitFullscreen();
};

fullscreenToggle.addEventListener("click", toggleFullscreen);

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    fullscreenToggle.textContent = "На весь экран";
    viewerContainer.classList.remove("viewer--fullscreen");
  }
});

updatePlaceholder(false);
