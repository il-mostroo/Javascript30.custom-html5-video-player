const videoPlayer = document.querySelector(".player__video");
const playButton = document.querySelector("button.toggle");
const progressFilled = document.querySelector(".progress__filled");
const viewer = document.querySelector(".viewer");
const volumeSlider = document.querySelector("[name='volume']");
const playSpeed = document.querySelector("[name='playbackRate']");
const skipBackward = document.querySelector('[data-skip="-10"]');
const skipForward = document.querySelector('[data-skip="25"]');
const player = document.querySelector(".player");

function initialiseProgress() {
  const videoDuration = videoPlayer.duration;
  const currentTime = videoPlayer.currentTime;
  const initProgress = (currentTime * 100) / videoDuration;
  progressFilled.style.flexBasis = `${initProgress}%`;
}

let id;
function startProgress() {
  const videoDuration = videoPlayer.duration;
  const intervalId = setInterval(() => {
    progressFilled.style.flexBasis = `${
      Number(
        progressFilled.style.flexBasis.substring(
          0,
          progressFilled.style.flexBasis.indexOf("%")
        )
      ) +
      100 / videoDuration
    }%`;
  }, 1000);
  id = intervalId;
}

document.addEventListener("click", (e) => {
  if (e.target.matches("button.toggle") || e.target.matches(".viewer")) {
    if (videoPlayer.paused) {
      videoPlayer.play();
      initialiseProgress();
      startProgress();
      playButton.innerText = "\u23F8";
    } else {
      videoPlayer.pause();
      playButton.innerText = "\u23F5";
      clearInterval(id);
    }
  }
});

volumeSlider.addEventListener("input", (e) => {
  videoPlayer.volume = e.target.value;
});

playSpeed.addEventListener("input", (e) => {
  videoPlayer.playbackRate = e.target.value;
});

skipBackward.addEventListener("click", (e) => {
  videoPlayer.currentTime = videoPlayer.currentTime - 10;
});

skipForward.addEventListener("click", (e) => {
  videoPlayer.currentTime = videoPlayer.currentTime + 25;
});

viewer.addEventListener("dblclick", (e) => {
  player.classList.toggle("player");
});
