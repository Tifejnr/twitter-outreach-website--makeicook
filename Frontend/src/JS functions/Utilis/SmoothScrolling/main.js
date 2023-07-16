// Menu Bar Scrolling and Display Fix
const rules = document.querySelector(".rules");
const makeRequest = document.querySelector(".makeRequest");
const faq = document.querySelector(".faq");

function closeMenuBar() {
  document.getElementById("nav__checkbox").checked = false;
}

rules.addEventListener("click", () => {
  closeMenuBar();
  smoothScroll(".safety-rules-container", 1000, 140);
});

makeRequest.addEventListener("click", () => {
  closeMenuBar();
  smoothScroll(".requestSection", 1000, 60);
});
faq.addEventListener("click", () => {
  closeMenuBar();
  smoothScroll(".faq__text-container", 1000, 100);
});

function smoothScroll(target, duration, heightAdjuster) {
  var target = document.querySelector(target);
  var targetPosition = target.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - heightAdjuster; // - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
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
