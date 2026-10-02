const marquee = document.querySelector(".announcement-bar__track--marquee");

if (marquee && typeof Swiper !== "undefined") {
  const wrapper = marquee.querySelector(".swiper-wrapper");
  const slides = [...wrapper.children];
  const marqueeWidth = marquee.clientWidth;

  while (wrapper.scrollWidth < marqueeWidth * 2) {
    slides.forEach((slide) => {
      const copy = slide.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      wrapper.append(copy);
    });
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  new Swiper(marquee, {
    loop: true,
    slidesPerView: "auto",
    speed: 8000,
    allowTouchMove: false,
    autoplay: reduceMotion ? false : { delay: 0, disableOnInteraction: false },
  });
}