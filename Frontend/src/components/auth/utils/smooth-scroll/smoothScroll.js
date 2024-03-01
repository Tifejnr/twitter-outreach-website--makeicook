export default function smoothScroll(
  targetSelector: string,
  heightAdjuster: number,
  fastScroll?: boolean
): void {
  let duration: number = 200;

  if (fastScroll) {
    duration = 0;
  }

  const target = document.querySelector(targetSelector) as HTMLElement;
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset;
  let distance = targetPosition - heightAdjuster; // - startPosition;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // http://www.gizma.com/easing/
  function ease(t: number, b: number, c: number, d: number) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
