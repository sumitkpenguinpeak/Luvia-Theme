jQuery(function ($) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const track = $(".promotion-wrapper")[0];

  if (!track) return;

  const $wrapper = $(track).find(".swiper-wrapper");
  const $slides = $wrapper.children().clone();

  while (!prefersReducedMotion && $wrapper[0].scrollWidth < track.clientWidth * 2) {
    $wrapper.append($slides.clone().attr("aria-hidden", "true"));
  }

  const slider = new Swiper(track, {
    loop: !prefersReducedMotion,
    slidesPerView: "auto",
    spaceBetween: 28,
    speed: 8000,
    allowTouchMove: false,
    autoplay: prefersReducedMotion ? false : { delay: 0, disableOnInteraction: false },
    breakpoints: { 681: { spaceBetween: 56 } },
  });

  $(track).on("click", function () {
    if (!prefersReducedMotion) {
      slider.autoplay.start();
      slider.autoplay.resume();
    }
  });
});