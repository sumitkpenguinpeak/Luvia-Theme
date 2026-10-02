document.addEventListener("DOMContentLoaded", () => {
  const heroSlider = document.querySelector(".bnrhero_swiper");
 
  if (!heroSlider || typeof Swiper === "undefined") {
    return;
  }
 
  const slideCount = heroSlider.querySelectorAll(".swiper-slide").length;
 
  new Swiper(heroSlider, {
    loop: slideCount > 1,
    watchOverflow: false,
    speed: 1000,
     effect: "fade",
     fadeEffect: {
      crossFade: true,
    },
    autoplay: slideCount > 1 ? {
      delay: 5000,
      disableOnInteraction: false,
    } : false,
    navigation: {
      nextEl: ".bnrhero_next",
      prevEl: ".bnrhero_prev",
    },
    pagination: {
      el: ".bnrhero_pagination",
      clickable: true,
    },
  });
});