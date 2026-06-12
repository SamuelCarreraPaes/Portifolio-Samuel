export const PREMIUM_EASE = [0.22, 1, 0.36, 1];

export function playMutedLoop(event) {
  const video = event.currentTarget;
  video.muted = true;
  const playback = video.play();
  if (playback?.catch) {
    playback.catch(() => {});
  }
}
