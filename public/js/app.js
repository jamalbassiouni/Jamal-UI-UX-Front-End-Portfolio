$(function () {
  "use strict";

  window.addEventListener("load", () => {
    const popup = document.getElementById("popup");
    if (!popup) return;

    const hasVisited = sessionStorage.getItem("hasVisited");
    if (!hasVisited) {
      popup.classList.add("show-popup");
      setTimeout(() => {
        popup.classList.remove("show-popup");
      }, 4400);
      sessionStorage.setItem("hasVisited", "true");
    }
  });

  const cursor = document.querySelector(".cursor");
  let mouseX = 0,
    mouseY = 0;
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = "1";
  });
  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });
  function updateCursor() {
    requestAnimationFrame(updateCursor);
    cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
  }
  updateCursor();

  let valueDisplays = document.querySelectorAll(".move");
  let interval = 5000;
  function checkIfInView() {
    valueDisplays.forEach((valueDisplay) => {
      let rect = valueDisplay.getBoundingClientRect();

      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        let endValue = parseInt(valueDisplay.getAttribute("data-Time"));

        if (!valueDisplay.classList.contains("animated")) {
          valueDisplay.classList.add("animated");

          gsap.to(valueDisplay, {
            duration: interval / 1000,
            innerText: endValue,
            snap: { innerText: 1 },
            ease: "power2.out",
            onUpdate: function () {
              valueDisplay.textContent = Math.floor(
                parseFloat(valueDisplay.innerText)
              );
            },
            onComplete: function () {
              valueDisplay.textContent = endValue + "+";
            },
          });
        }
      }
    });
  }
  window.addEventListener("scroll", checkIfInView);

  const sections = document.querySelectorAll(".inner");
  const navLinks = document.querySelectorAll("header nav a");
  const footer = document.querySelector("footer");
  const isMobileView = window.matchMedia("(max-width: 992px)");
  const updateActiveSection = () => {
    let activeId = "";
    let viewportHeight = window.innerHeight;

    let offsetAdjustment = viewportHeight * -0.5;
    let footerAdjustment = viewportHeight * 0.5;

    if (isMobileView.matches) {
      offsetAdjustment = viewportHeight * 0.2;
      footerAdjustment = viewportHeight * 0.05;
    }

    sections.forEach((sec) => {
      let rect = sec.getBoundingClientRect();
      let sectionTop = rect.top - offsetAdjustment;
      let sectionBottom = rect.bottom - offsetAdjustment;

      let visibilityThresholdTop = isMobileView.matches ? 0.7 : 0.6;
      let visibilityThresholdBottom = isMobileView.matches ? 0.3 : 0.4;

      if (
        sectionTop < viewportHeight * visibilityThresholdTop &&
        sectionBottom > viewportHeight * visibilityThresholdBottom
      ) {
        activeId = sec.getAttribute("id");
      }
    });

    if (footer) {
      let footerRect = footer.getBoundingClientRect();
      if (footerRect.top < viewportHeight - footerAdjustment) {
        activeId = "contact";
      }
    }

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${activeId}`
      );
    });
  };

  window.addEventListener("scroll", updateActiveSection);
  window.addEventListener("resize", updateActiveSection);

  gsap.registerPlugin(ScrollTrigger);

  const images = document.querySelectorAll("img:not(.lazyload)");
  const imgLoad = imagesLoaded(images);
  document.body.style.overflow = "hidden";
  imgLoad.on("done", () => {
    document.getElementById("loaderContent")?.classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("loader")?.classList.add("loaded");
      document.body.style.overflow = "auto";
    }, 300);

    gsap.set(".animate-headline", { y: 50, opacity: 0 });
    ScrollTrigger.batch(".animate-headline", {
      interval: 0.1,
      batchMax: 4,
      duration: 6,
      onEnter: batch => gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: 'sine',
        stagger: { each: 0.15, grid: [1, 4] },
        overwrite: true
      }),
      onLeave: batch => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
      onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true })
    });
  });

  const lenis = new Lenis()
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  gsap.to("[data-speed]", {
    y: (i, el) => (1 - parseFloat(el.getAttribute("data-speed"))) * ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0
    }
  });

  const animateInUp = document.querySelectorAll(".animate-in-up");
  animateInUp.forEach((element) => {
    gsap.fromTo(element, {
      opacity: 0,
      y: 60,
      ease: 'sine',
    }, {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: element,
        toggleActions: 'play none none reverse',
      }
    });
  });

  const animateRotation = document.querySelectorAll(".animate-rotation");
  animateRotation.forEach((section) => {
    var value = $(section).data("value");
    gsap.fromTo(section, {
      ease: 'sine',
      rotate: 0,
    }, {
      rotate: value,
      scrollTrigger: {
        trigger: section,
        scrub: true,
        toggleActions: 'play none none reverse',
      }
    });
  });

  gsap.set(".animate-card-2", { y: 100, opacity: 0 });
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: { each: 0.15, grid: [1, 2] },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 100, overwrite: true })
  });

  gsap.set(".animate-card-3", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-3", {
    interval: 0.1,
    batchMax: 3,
    duration: 3,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: { each: 0.15, grid: [1, 3] },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true })
  });

  gsap.set(".animate-card-5", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: batch => gsap.to(batch, {
      opacity: 1,
      y: 0,
      ease: 'sine',
      stagger: { each: 0.15, grid: [1, 5] },
      overwrite: true
    }),
    onLeave: batch => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true })
  });

  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-2", { y: 0, opacity: 1 }));
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-3", { y: 0, opacity: 1 }));
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".animate-card-5", { y: 0, opacity: 1 }));

  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000,
            function () {
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
                $target.focus();
              }
            }
          );
        }
      }
    });

  const toolsSlider = document.querySelector("tools-slider");

  if (!toolsSlider) {
    const swiper = new Swiper(".swiper-tools", {
      spaceBetween: 20,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false,
      },
      loop: true,
      grabCursor: true,
      loopFillGroupWithBlank: true,
      breakpoints: {
        1600: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        576: {
          slidesPerView: 2,
        },
        0: {
          slidesPerView: 2,
        },
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  if (!toolsSlider) {
    const swiper = new Swiper(".swiper-testimonials", {
      slidesPerView: 1,
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      grabCursor: true,
      speed: 1000,
      loop: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }

  if (!toolsSlider) {
    const swiper = new Swiper(".swiper-blog", {
      spaceBetween: 20,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      grabCursor: true,
      speed: 1000,
      loop: true,
      loopFillGroupWithBlank: true,
      breakpoints: {
        1600: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        0: {
          slidesPerView: 1,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
    });
  }

  const links = document.querySelectorAll(".testimonials-btn a");

  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        window.location.hash = targetId;

        targetElement.classList.remove("highlighted-project");
        setTimeout(
          () => targetElement.classList.add("highlighted-project"),
          100
        );

        setTimeout(() => {
          targetElement.classList.remove("highlighted-project");
        }, 3500);
      }
    });
  });

  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) { }

  $("img, a").on("dragstart", function (event) {
    event.preventDefault();
  });

  var isMobile = false;
  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    $("html").addClass("touch");
    isMobile = true;
  } else {
    $("html").addClass("no-touch");
    isMobile = false;
  }

  var isIE =
    /MSIE 9/i.test(navigator.userAgent) ||
    /rv:11.0/i.test(navigator.userAgent) ||
    /MSIE 10/i.test(navigator.userAgent) ||
    /Edge\/\d+/i.test(navigator.userAgent) ||
    /Edg\//i.test(navigator.userAgent);

  $(".gallery__link").each(function () {
    const imageUrl = $(this).data("image");
    $(this).append(
      `<div class="picture" style="background-image: url(${imageUrl})"></div>`
    );
  });


});

const themeBtn = document.querySelector(".color-switcher");
function getCurrentTheme() {
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  localStorage.getItem("template.theme")
    ? (theme = localStorage.getItem("template.theme"))
    : null;
  return theme;
}

function loadTheme(theme) {
  const root = document.querySelector(":root");
  if (theme === "light") {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-moon-stars"></i>`;
  } else {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-sun"></i>`;
  }
  root.setAttribute("color-scheme", `${theme}`);
}

themeBtn.addEventListener("click", () => {
  let theme = getCurrentTheme();
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  localStorage.setItem("template.theme", `${theme}`);
  loadTheme(theme);
});

window.addEventListener("DOMContentLoaded", () => {
  loadTheme(getCurrentTheme());
});

const items = document.querySelectorAll(".accordion button");
function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute("aria-expanded", "false");
  }

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
  }
}
items.forEach((item) => item.addEventListener("click", toggleAccordion));

document.addEventListener("DOMContentLoaded", function () {
  const random = (min, max, direction = 1) =>
    (min + (max - min) * Math.random()) * direction;

  const blurs = gsap.utils.toArray(".blur");
  blurs.forEach((blur) => {
    gsap.set(blur, {
      x: random(-400, 400),
      y: random(-200, 200),
      rotation: random(-30, 150),
    });

    move(blur, "x", random(20, 40), random(-400, 400));
    move(blur, "y", random(20, 40), random(-200, 200));
    rotate(blur, random(5, 12), random(-30, 150));
  });

  function move(target, axis, time, range) {
    gsap.to(target, time, {
      [axis]: range,
      ease: Sine.easeInOut,
      onComplete: () => move(target, axis, time, random(-range, range)),
    });
  }

  function rotate(target, time, angle) {
    gsap.to(target, time, {
      rotation: angle,
      ease: Sine.easeInOut,
      onComplete: () => rotate(target, time, random(-30, 150)),
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://cdn.userway.org/widget.js";
  script.setAttribute("data-account", "grkjtLNMDa");
  script.onload = function () {
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeName === "IMG" &&
            node.getAttribute("data-uw-rm-ignore") !== null
          ) {
            node.setAttribute("width", "1");
            node.setAttribute("height", "1");
          }
          if (node.nodeType === 1 && node.classList.contains("ui_w")) {
            node.setAttribute("id", "userwayAccessibilityIcon");
          }
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  };
  document.head.appendChild(script);
});
// const originalWarn = console.warn;
// console.warn = function(message) {
//   if (!message.includes("GSAP target")) {
//     originalWarn.apply(console, arguments);
//   }
// };
