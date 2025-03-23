window.addEventListener("load", () => {
  const popup = document.getElementById("popup");
  if (popup) {
    setTimeout(() => {
      popup.style.display = "none";
    }, 3500);
  }
});

const cursor = document.querySelector(".cursor");
window.addEventListener("load", () => {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
  cursor.style.display = "block";
});
document.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
  cursor.style.display = "block";
});
document.addEventListener("mouseleave", () => {
  cursor.style.display = "none";
});

const storylyContainer = document.getElementById("storyly-container");

const storylyDiv = document.createElement("div");
storylyDiv.style.position = "relative";
storylyDiv.style.width = "360px";
storylyDiv.style.height = "640px";
storylyContainer.appendChild(storylyDiv);

const storylyElement = document.createElement("storyly-web");
storylyDiv.appendChild(storylyElement);

storylyElement.init({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NfaWQiOjEzNDc1LCJhcHBfaWQiOjIwOTgzLCJpbnNfaWQiOjIzNTU1fQ.FRpPMAahn1B_tIRrNmFQ6y9j3xw-ud63GCoWwKucQlU",
});

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

$(function () {
  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  const content = document.querySelector("body");
  const images = document.querySelectorAll("img:not(.lazyload)");
  const imgLoad = imagesLoaded(images);
  document.body.style.overflow = "hidden";
  imgLoad.on("done", (instance) => {
    document.getElementById("loaderContent").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("loader").classList.add("loaded");
      document.body.style.overflow = "auto";
    }, 300);

    gsap.set(".animate-headline", { y: 50, opacity: 0 });
    ScrollTrigger.batch(".animate-headline", {
      interval: 0.1,
      batchMax: 4,
      duration: 6,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          ease: "sine",
          stagger: { each: 0.15, grid: [1, 4] },
          overwrite: true,
        }),
      onLeave: (batch) =>
        gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
      onEnterBack: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: (batch) =>
        gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
    });
  });

  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  gsap.to("[data-speed]", {
    y: (i, el) =>
      (1 - parseFloat(el.getAttribute("data-speed"))) *
      ScrollTrigger.maxScroll(window),
    ease: "none",
    scrollTrigger: {
      start: 0,
      end: "max",
      invalidateOnRefresh: true,
      scrub: 0,
    },
  });

  const animateInUp = document.querySelectorAll(".animate-in-up");
  animateInUp.forEach((element) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 50,
        ease: "sine",
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  const animateRotation = document.querySelectorAll(".animate-rotation");
  animateRotation.forEach((section) => {
    var value = $(section).data("value");
    gsap.fromTo(
      section,
      {
        ease: "sine",
        rotate: 0,
      },
      {
        rotate: value,
        scrollTrigger: {
          trigger: section,
          scrub: true,
          toggleActions: "play none none reverse",
        },
      }
    );
  });

  gsap.set(".animate-card-2", { y: 100, opacity: 0 });
  ScrollTrigger.batch(".animate-card-2", {
    interval: 0.1,
    batchMax: 2,
    duration: 6,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 2] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) =>
      gsap.set(batch, { opacity: 0, y: 100, overwrite: true }),
  });

    gsap.set(".animate-card-3", { y: 50, opacity: 0 });
    ScrollTrigger.batch(".animate-card-3", {
      interval: 0.1,
      batchMax: 3,
      duration: 3,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          ease: "sine",
          stagger: { each: 0.15, grid: [1, 3] },
          overwrite: true,
        }),
      onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
      onEnterBack: (batch) =>
        gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
      onLeaveBack: (batch) =>
        gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
    });

  gsap.set(".animate-card-5", { y: 50, opacity: 0 });
  ScrollTrigger.batch(".animate-card-5", {
    interval: 0.1,
    batchMax: 5,
    delay: 1000,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        ease: "sine",
        stagger: { each: 0.15, grid: [1, 5] },
        overwrite: true,
      }),
    onLeave: (batch) => gsap.set(batch, { opacity: 1, y: 0, overwrite: true }),
    onEnterBack: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
    onLeaveBack: (batch) =>
      gsap.set(batch, { opacity: 0, y: 50, overwrite: true }),
  });

  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-2", { y: 0, opacity: 1 })
  );
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-3", { y: 0, opacity: 1 })
  );
  ScrollTrigger.addEventListener("refreshInit", () =>
    gsap.set(".animate-card-5", { y: 0, opacity: 1 })
  );

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
  const testimonialsSlider = document.querySelector("testimonials-slider");

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

  $("#contact-form").submit(function () {
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: th.serialize(),
    }).done(function () {
      $(".contact").find(".form").addClass("is-hidden");
      $(".contact").find(".form__reply").addClass("is-visible");
      setTimeout(function () {
        $(".contact").find(".form__reply").removeClass("is-visible");
        $(".contact").find(".form").delay(300).removeClass("is-hidden");
        th.trigger("reset");
      }, 5000);
    });
    return false;
  });

  if (!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function () {
      return $(this).attr("src").replace(".svg", ".png");
    });
  }

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
    /Edge\/\d+/.test(navigator.userAgent);

  $(".gallery__link").each(function () {
    $(this)
      .append('<div class="picture"></div>')
      .children(".picture")
      .css({ "background-image": "url(" + $(this).attr("data-image") + ")" });
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
  const randomX = random(-400, 400);
  const randomY = random(-200, 200);
  const randomDelay = random(0, 50);
  const randomTime = random(20, 40);
  const randomTime2 = random(5, 12);
  const randomAngle = random(-30, 150);

  const blurs = gsap.utils.toArray(".blur");
  blurs.forEach((blur) => {
    gsap.set(blur, {
      x: randomX(-1),
      y: randomX(1),
      rotation: randomAngle(-1),
    });

    moveX(blur, 1);
    moveY(blur, -1);
    rotate(blur, 1);
  });

  function rotate(target, direction) {
    gsap.to(target, randomTime2(), {
      rotation: randomAngle(direction),
      ease: Sine.easeInOut,
      onComplete: rotate,
      onCompleteParams: [target, direction * -1],
    });
  }

  function moveX(target, direction) {
    gsap.to(target, randomTime(), {
      x: randomX(direction),
      ease: Sine.easeInOut,
      onComplete: moveX,
      onCompleteParams: [target, direction * -1],
    });
  }

  function moveY(target, direction) {
    gsap.to(target, randomTime(), {
      y: randomY(direction),
      ease: Sine.easeInOut,
      onComplete: moveY,
      onCompleteParams: [target, direction * -1],
    });
  }

  function random(min, max) {
    const delta = max - min;
    return (direction = 1) => (min + delta * Math.random()) * direction;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var script = document.createElement("script");
  script.defer = true;
  script.src = "https://cdn.userway.org/widget.js";

  script.onload = function () {
    var interval = setInterval(function () {
      var userWayIcon = document.querySelector("#userwayAccessibilityIcon");
      if (userWayIcon) {
        userWayIcon.style.background = "";
        clearInterval(interval);
      }
    }, 100);
  };

  document.head.appendChild(script);
});
