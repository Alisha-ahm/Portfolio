const overlay = document.querySelector('.overlay');
const targetTexts = document.querySelectorAll('section h1');

const isTouchDevice =
  ('ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0);

const overlayState = {
  currentX: 50,
  currentY: 50,
  currentRadius: 90,
  targetX: 50,
  targetY: 50,
  targetRadius: 90,
  ease: 0.18
};

const updateOverlay = () => {
  if (!overlay) return;

  overlayState.currentX += (overlayState.targetX - overlayState.currentX) * overlayState.ease;
  overlayState.currentY += (overlayState.targetY - overlayState.currentY) * overlayState.ease;
  overlayState.currentRadius += (overlayState.targetRadius - overlayState.currentRadius) * overlayState.ease;

  overlay.style.clipPath = `circle(${overlayState.currentRadius}px at ${overlayState.currentX}% ${overlayState.currentY}%)`;
  requestAnimationFrame(updateOverlay);
};

const setOverlayTarget = (x, y, radius) => {
  overlayState.targetX = x;
  overlayState.targetY = y;
  overlayState.targetRadius = radius;
};

if (overlay) {
  overlay.style.clipPath = `circle(${overlayState.currentRadius}px at ${overlayState.currentX}% ${overlayState.currentY}%)`;
  requestAnimationFrame(updateOverlay);
}

const getHoverRadius = (isOverText, isMobile) => {
  if (isMobile) return 90;
  return isOverText ? 100 : 30;
};

const moveOverlayTo = (x, y, radius) => {
  setOverlayTarget(x, y, radius);
};

const handleMouseMove = (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  let isOverText = false;
  targetTexts.forEach(text => {
    const rect = text.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      isOverText = true;
    }
  });

  moveOverlayTo(x, y, getHoverRadius(isOverText, false));
};

const handleTouchMove = (e) => {
  const touch = e.touches[0];
  if (!touch) return;

  const x = (touch.clientX / window.innerWidth) * 100;
  const y = (touch.clientY / window.innerHeight) * 100;

  moveOverlayTo(x, y, getHoverRadius(false, true));
};

if (!isTouchDevice) {
  window.addEventListener('mousemove', handleMouseMove);
} else {
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  window.addEventListener('mousemove', handleMouseMove);
}
 document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  // Hover image animation
  elem.addEventListener("mouseleave", function () {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });

  // Click on entire elem to open link
  elem.addEventListener("click", function () {
    const link = elem.querySelector("a.project-card").getAttribute("href");
    window.location.href = link;
  });
});


const innerBars = document.querySelectorAll(".inner-bar");
const loadingPercent = document.getElementById("loadingPercent");
let increment = 0;
let currentPercent = 0;

function animateBars() {
  for (let i = 0; i < 2; i++) {
    let randomWidth = Math.floor(Math.random() * 101);
    gsap.to(innerBars[i + increment], {
      width: randomWidth + "%",
      duration: 0.3,
      ease: "none"
    });
  }

  setTimeout(() => {
    for (let i = 0; i < 2; i++) {
      gsap.to(innerBars[i + increment], {
        width: "100%",
        duration: 0.2,
        ease: "none"
      });
    }

    increment += 2;
    currentPercent += 25;
    if (currentPercent > 100) currentPercent = 100;
    loadingPercent.innerText = currentPercent + "%";

    if (increment < innerBars.length) {
      animateBars();
    } else {
      const preloaderTl = gsap.timeline();
      preloaderTl.to(".preloader-overlay", {
        transform: "translateX(0)",
        duration: 0.5,
        ease: "none",
        delay: 0.4
      });
      preloaderTl.set(".preloader", { display: "none" });
      preloaderTl.set(".site-main", { display: "block" });
      preloaderTl.to(".site-main", {
        opacity: 1,
        transform: "translateY(0)",
        duration: 0.4,
        ease: "power1.out",
        onComplete: () => {
          initAnimations();     // Start GSAP animations
          ScrollTrigger.refresh(); // Recalculate triggers
        }
      });
    }
  }, 300);
}

function showSiteMain() {
  gsap.set('.preloader', { display: 'none' });
  gsap.set('.site-main', { display: 'block' });
  gsap.to('.site-main', {
    opacity: 1,
    transform: 'translateY(0)',
    duration: 0.4,
    ease: 'power1.out',
    onComplete: () => {
      if (typeof initAnimations === 'function') initAnimations();
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }
  });
}

window.onload = () => {
  showSiteMain();
};

const ulItems = document.querySelectorAll("ul li a");

ulItems.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // stop page reload

    if (this.id === 'about') {
      document.querySelector(".about").scrollIntoView({ behavior: "smooth" });
    } else if (this.id === 'work') {
      document.querySelector(".part2").scrollIntoView({ behavior: "smooth" });
    } else if (this.id === 'contact') {
      document.querySelector(".contact-section").scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Create audio element
const soundBtn = document.querySelector(".sound");
let bgAudio = null;
let isPlaying = false;

if (!isTouchDevice && soundBtn) {
  bgAudio = new Audio('guitar.mp3');
  bgAudio.loop = true;

  setTimeout(() => {
    bgAudio.play().then(() => {
      soundBtn.textContent = "SOUND ON";
      isPlaying = true;
    }).catch(() => {
      soundBtn.textContent = "SOUND OFF";
    });
  }, 3000);

  soundBtn.addEventListener("click", () => {
    if (!isPlaying) {
      bgAudio.play();
      soundBtn.textContent = "SOUND ON";
      isPlaying = true;
    } else {
      bgAudio.pause();
      soundBtn.textContent = "SOUND OFF";
      isPlaying = false;
    }
  });
} else if (soundBtn) {
  soundBtn.textContent = "SOUND OFF";
  soundBtn.style.opacity = '0.8';
}


