// Menu Bar Scrolling and Display Fix
function closeMenuBar() {
  document.getElementById("nav__checkbox").checked = false;
}

function smoothScroll(target, heightAdjuster) {
  const duration = 1000;

  target = document.querySelector(target);
  let targetPosition = target.getBoundingClientRect().top;
  let startPosition = window.pageYOffset;
  let distance = targetPosition - heightAdjuster; // - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    let timeElapsed = currentTime - startTime;
    let run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // http://www.gizma.com/easing/
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

export { smoothScroll, closeMenuBar };
