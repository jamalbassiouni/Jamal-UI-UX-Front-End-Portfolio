// ------------------------------------------------
// Project Name: Braxton - Personal Portfolio & Resume HTML Template
// Project Description: Show yourself brightly with Braxton - unique and creative portfolio and resume template!
// Tags: mix_design, resume, portfolio, personal page, cv, template, one page, responsive, html5, css3, creative, clean
// Version: 1.0.0
// Build Date: March 2024
// Last Update: March 2024
// This product is available exclusively on Themeforest
// Author: mix_design
// Author URI: https://themeforest.net/user/mix_design
// File name: app.js
// ------------------------------------------------

// ------------------------------------------------
// Table of Contents
// ------------------------------------------------
//
//  01. Loader & Loading Animation
//  02. Bootstrap Scroll Spy Plugin Settings
//  03. Lenis Scroll Plugin
//  04. Parallax
//  05. Scroll Animations
//  06. Smooth Scrolling
//  07. Swiper Slider
//  08. Contact Form
//  09. Modernizr SVG Fallback
//  10. Chrome Smooth Scroll
//  11. Images Moving Ban
//  12. Detecting Mobile/Desktop
//  13. PhotoSwipe Gallery Images Replace
//  14. Color Switch
//
// ------------------------------------------------
// Table of Contents End
// ------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll('.testimonials-card__btnholder a');

  links.forEach(link => {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        window.location.hash = targetId;

        targetElement.classList.remove("highlighted-project");
        setTimeout(() => targetElement.classList.add("highlighted-project"), 100);

        setTimeout(() => {
          targetElement.classList.remove("highlighted-project");
        }, 3000);
      }
    });
  });
});

// إنشاء عنصر storyly-web ديناميكيًا
const storylyContainer = document.getElementById("storyly-container");

// إعداد حاوية لعرض القصص
const storylyDiv = document.createElement("div");
storylyDiv.style.position = "relative";
storylyDiv.style.width = "360px";
storylyDiv.style.height = "640px";
storylyContainer.appendChild(storylyDiv);

// إنشاء عنصر storyly-web
const storylyElement = document.createElement("storyly-web");
storylyDiv.appendChild(storylyElement);

// تهيئة Storyly
storylyElement.init({
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NfaWQiOjEzNDc1LCJhcHBfaWQiOjIwOTgzLCJpbnNfaWQiOjIzNTU1fQ.FRpPMAahn1B_tIRrNmFQ6y9j3xw-ud63GCoWwKucQlU", // استبدل بالرمز الخاص بك
});

window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("popup").style.display = "none";
    }, 3500);
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

const items = document.querySelectorAll(".accordion button");
function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}


items.forEach(item => item.addEventListener('click', toggleAccordion));


let valueDisplays = document.querySelectorAll(".move");
let interval = 5000;

function checkIfInView() {
  valueDisplays.forEach(valueDisplay => {
    let rect = valueDisplay.getBoundingClientRect();

    // التحقق إذا كان العنصر في منتصف الشاشة
    if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
      let endValue = parseInt(valueDisplay.getAttribute("data-Time"));

      // التأكد أن التحريك يتم مرة واحدة فقط
      if (!valueDisplay.classList.contains("animated")) {
        valueDisplay.classList.add("animated");

        gsap.to(valueDisplay, {
          duration: interval / 1000,
          innerText: endValue,
          snap: { innerText: 1 },
          ease: "power2.out",
          onUpdate: function () {
            valueDisplay.textContent = Math.floor(parseFloat(valueDisplay.innerText));
          },
          onComplete: function () {
            valueDisplay.textContent = endValue + "+"; // إضافة "+" بعد الانتهاء
          }
        });
      }
    }
  });
}

window.addEventListener("scroll", checkIfInView);


$(function () {

  "use strict";

  gsap.registerPlugin(ScrollTrigger);

  // --------------------------------------------- //
  // Loader & Loading Animation Start
  // --------------------------------------------- //

  const content = document.querySelector("body");
  const images = document.querySelectorAll("img:not(.lazyload)");
  const imgLoad = imagesLoaded(images);
  document.body.style.overflow = "hidden";
  imgLoad.on("done", (instance) => {
    document.getElementById("loaderContent").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("loader").classList.add("loaded");
      document.body.style.overflow = "auto"; // تفعيل التمرير بعد التحميل
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
  // --------------------------------------------- //
  // Loader & Loading Animation End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Bootstrap Scroll Spy Plugin Settings Start
  // --------------------------------------------- //

  // const sections = document.querySelectorAll("section , footer");
  // const navLinks = document.querySelectorAll("header nav a");

  // window.onscroll = () => {
  //     let top = window.scrollY;

  //     sections.forEach((sec) => {
  //         let offset = sec.offsetTop;
  //         let height = sec.offsetHeight;
  //         let id = sec.getAttribute("id");

  //         if (top >= offset && top < offset + height) {
  //             navLinks.forEach((link) => link.classList.remove("active"));
  //             let activeLink = document.querySelector(`header nav a[href="#${id}"]`);
  //             if (activeLink) activeLink.classList.add("active");
  //         }
  //     });
  // };



  // const sections = document.querySelectorAll(".inner");
  // const navLinks = document.querySelectorAll("header nav a");
  // const footer = document.querySelector("footer");

  // const updateActiveSection = () => {
  //   let top = window.scrollY;
  //   let activeId = "";

  //   let viewportHeight = window.innerHeight;
  //   let offsetAdjustment = viewportHeight * 0.1; // تعويض 10% من الشاشة
  //   let footerAdjustment = viewportHeight * 0.02; // تعويض 50% للـ Footer

  //   sections.forEach((sec) => {
  //     let offset = sec.offsetTop - offsetAdjustment;
  //     let height = sec.offsetHeight;
  //     if (top >= offset && top < offset + height) {
  //       activeId = sec.getAttribute("id");
  //     }
  //   });

  //   if (footer && top >= footer.offsetTop - footerAdjustment) {
  //     activeId = "contact";
  //   }

  //   navLinks.forEach((link) => {
  //     link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  //   });
  // };

  // // تحديث عند التمرير
  // window.addEventListener("scroll", updateActiveSection);

  // // تحديث عند تغيير حجم الشاشة
  // window.addEventListener("resize", updateActiveSection);

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
  
      if (sectionTop < viewportHeight * visibilityThresholdTop && sectionBottom > viewportHeight * visibilityThresholdBottom) {
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
      link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
    });
  };
  
  window.addEventListener("scroll", updateActiveSection);
  window.addEventListener("resize", updateActiveSection);
  

  // --------------------------------------------- //
  // Bootstrap Scroll Spy Plugin Settings End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Lenis Scroll Plugin Start
  // --------------------------------------------- //
  const lenis = new Lenis()
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  // --------------------------------------------- //
  // Lenis Scroll Plugin End
  // --------------------------------------------- //

  // ------------------------------------------------------------------------------ //
  // Parallax (apply parallax effect to any element with a data-speed attribute) Start
  // ------------------------------------------------------------------------------ //
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
  // --------------------------------------------- //
  // Parallax End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Scroll Animations Start
  // --------------------------------------------- //
  // Animation In Up
  const animateInUp = document.querySelectorAll(".animate-in-up");
  animateInUp.forEach((element) => {
    gsap.fromTo(element, {
      opacity: 0,
      y: 50,
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

  // Animation Rotation
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

  // Animation Cards Stack
  // Grid 2x
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

  // Grid 3x
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

  // Grid 5x
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
  // --------------------------------------------- //
  // Scroll Animations End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Smooth Scrolling Start
  // --------------------------------------------- //
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function () {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex', '-1');
            $target.focus();
          };
        });
      }
    }
  });
  // --------------------------------------------- //
  // Smooth Scrolling End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Swiper Slider Start
  // --------------------------------------------- //
  const toolsSlider = document.querySelector("tools-slider");
  const testimonialsSlider = document.querySelector("testimonials-slider");

  if (!toolsSlider) {
    const swiper = new Swiper('.swiper-tools', {
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
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
    });
  };

  if (!toolsSlider) {
    const swiper = new Swiper('.swiper-testimonials', {
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
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  };

  if (!toolsSlider) {
    const swiper = new Swiper('.swiper-blog', {
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
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      }
    });
  };
  // --------------------------------------------- //
  // Swiper Slider Start
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Contact Form Start
  // --------------------------------------------- //
  $("#contact-form").submit(function () { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function () {
      $('.contact').find('.form').addClass('is-hidden');
      $('.contact').find('.form__reply').addClass('is-visible');
      setTimeout(function () {
        // Done Functions
        $('.contact').find('.form__reply').removeClass('is-visible');
        $('.contact').find('.form').delay(300).removeClass('is-hidden');
        th.trigger("reset");
      }, 5000);
    });
    return false;
  });
  // --------------------------------------------- //
  // Contact Form End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Modernizr SVG Fallback Start
  // --------------------------------------------- //
  if (!Modernizr.svg) {
    $("img[src*='svg']").attr("src", function () {
      return $(this).attr("src").replace(".svg", ".png");
    });
  };
  // --------------------------------------------- //
  // Modernizr SVG Fallback End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Chrome Smooth Scroll Start
  // --------------------------------------------- //
  try {
    $.browserSelector();
    if ($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch (err) {
  };
  // --------------------------------------------- //
  // Chrome Smooth Scroll End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Images Moving Ban Start
  // --------------------------------------------- //
  $("img, a").on("dragstart", function (event) { event.preventDefault(); });
  // --------------------------------------------- //
  // Images Moving Ban End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // Detecting Mobile/Desktop Start
  // --------------------------------------------- //
  var isMobile = false;
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('html').addClass('touch');
    isMobile = true;
  }
  else {
    $('html').addClass('no-touch');
    isMobile = false;
  }
  //IE, Edge
  var isIE = /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /Edge\/\d+/.test(navigator.userAgent);
  // --------------------------------------------- //
  // Detecting Mobile/Desktop End
  // --------------------------------------------- //

  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace Start
  // --------------------------------------------- //
  $('.gallery__link').each(function () {
    $(this)
      .append('<div class="picture"></div>')
      .children('.picture').css({ 'background-image': 'url(' + $(this).attr('data-image') + ')' });
  });
  // --------------------------------------------- //
  // PhotoSwipe Gallery Images Replace End
  // --------------------------------------------- //

});

// --------------------------------------------- //
// Color Switch Start
// --------------------------------------------- //
const themeBtn = document.querySelector('.color-switcher');

function getCurrentTheme() {
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  localStorage.getItem('template.theme') ? theme = localStorage.getItem('template.theme') : null;
  return theme;
}

function loadTheme(theme) {
  const root = document.querySelector(':root');
  if (theme === "light") {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-moon-stars"></i>`;
  } else {
    themeBtn.innerHTML = `<em></em><i class="ph-bold ph-sun"></i>`;
  }
  root.setAttribute('color-scheme', `${theme}`);
};

themeBtn.addEventListener('click', () => {
  let theme = getCurrentTheme();
  if (theme === 'dark') {
    theme = 'light';
  } else {
    theme = 'dark';
  }
  localStorage.setItem('template.theme', `${theme}`);
  loadTheme(theme);
});

window.addEventListener('DOMContentLoaded', () => {
  loadTheme(getCurrentTheme());
});
// --------------------------------------------- //
// Color Switch End
// --------------------------------------------- //



