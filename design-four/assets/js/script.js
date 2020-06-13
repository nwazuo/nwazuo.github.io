const tourVideo = document.querySelector(".tour-video");
const tourVideoPlayBtn = document.querySelector(".play-btn");
const videoOverlay = document.querySelector(".tour-video-overlay");

tourVideoPlayBtn.addEventListener("click", () => {
    tourVideo.play();
    let tourVideoControls = document.createAttribute("controls");
    tourVideo.setAttribute("controls", "");
    tourVideoPlayBtn.classList.add("hidden");
    videoOverlay.classList.add("hidden");
});
