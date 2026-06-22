const introVideo = document.querySelector(".kv-video--intro");
const loopVideo = document.querySelector(".kv-video--loop");

const LOOP_START = 6.5;
const LOOP_END = 9.75;
const LOOP_LEAD = 0.06;

if (introVideo && loopVideo) {
  let loopStarted = false;
  let handedOff = false;

  introVideo.loop = false;
  loopVideo.loop = false;

  function seekTo(video, time) {
    if (typeof video.fastSeek === "function") {
      video.fastSeek(time);
    } else {
      video.currentTime = time;
    }
  }

  function watchLoopSegment(video) {
    const tick = () => {
      if (video.currentTime >= LOOP_END - LOOP_LEAD) {
        seekTo(video, LOOP_START);
      }

      if (typeof video.requestVideoFrameCallback === "function") {
        video.requestVideoFrameCallback(tick);
      } else {
        requestAnimationFrame(tick);
      }
    };

    if (typeof video.requestVideoFrameCallback === "function") {
      video.requestVideoFrameCallback(tick);
    } else {
      video.addEventListener("timeupdate", () => {
        if (video.currentTime >= LOOP_END - LOOP_LEAD) {
          seekTo(video, LOOP_START);
        }
      });
    }
  }

  function handoffToLoop() {
    if (handedOff) return;
    handedOff = true;

    introVideo.pause();
    introVideo.classList.add("is-hidden");
    loopVideo.classList.add("is-active");

    if (loopVideo.paused) {
      seekTo(loopVideo, LOOP_START);
      loopVideo.play().catch(() => {});
    }

    watchLoopSegment(loopVideo);
  }

  introVideo.addEventListener("timeupdate", () => {
    if (!loopStarted && introVideo.currentTime >= LOOP_START) {
      loopStarted = true;
      seekTo(loopVideo, LOOP_START);
      loopVideo.play().catch(() => {});
    }

    if (!handedOff && introVideo.currentTime >= LOOP_END - LOOP_LEAD) {
      handoffToLoop();
    }
  });

  introVideo.addEventListener("ended", handoffToLoop);
}
