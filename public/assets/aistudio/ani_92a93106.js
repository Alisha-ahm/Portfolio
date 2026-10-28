function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // LENIS smooth scroll setup
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // === HEADER Animations ===
  gsap.from(".logo", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
  gsap.from(".social-icons i", { x: -50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
  gsap.from(".menu ul li", { x: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
  gsap.from(".sound", { y: 50, opacity: 0, duration: 1, delay: 1, ease: "power3.out" });

  // === TEXT Reveal ===
  const mm = gsap.matchMedia();

/* 💻 DESKTOP ONLY */
mm.add("(min-width: 769px)", () => {

  gsap.fromTo(".text-area-hover h1",
    { clipPath: "inset(0 100% 0 0)" },
    {
      clipPath: "inset(0 0% 0 0)",
      ease: "none",
      scrollTrigger: {
        trigger: ".about",
        start: "top center",
        end: "bottom center",
        scrub: true
      }
    }
  );

  gsap.to(".text-area-hover span", {
    color: "#770777",
    scrollTrigger: {
      trigger: ".about",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });

  gsap.to(".part2 .project h4", {
    color: "#770777",
    scrollTrigger: {
      trigger: ".part2",
      start: "top center",
      end: "bottom center",
      scrub: true
    }
  });

  gsap.fromTo(".part3 .education h4",
    { opacity: 0, y: -30 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".part3",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    }
  );
  // Timeline items animation (desktop only)
  var t3 = gsap.timeline({
    scrollTrigger: { trigger: ".part3", start: "top 70%", end: "bottom 20%", scrub: 1 }
  });

  t3.from(".timeline-item.left.orange", { x: -200, opacity: 0, rotateY: 20, duration: 1, ease: "power3.out" }, "a")
    .from(".timeline-item.right.red", { x: 200, opacity: 0, rotateY: -20, duration: 1, ease: "power3.out" }, "a+=0.3")
    .from(".timeline-item.left.blue", { x: -200, opacity: 0, rotateY: 20, duration: 1, ease: "power3.out" }, "a+=0.6");

  // === SKILLS Section ===
  var t4 = gsap.timeline({
    scrollTrigger: { trigger: ".part4", start: "top 75%", end: "bottom 20%", scrub: 1 }
  });

  t4.fromTo(".skills h4 span", { y: 0 }, { y: -20, repeat: 1, yoyo: true, duration: 0.5, stagger: 0.1, ease: "power3.inOut" }, "d")
    .fromTo(".cards .box", { y: 100, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" }, "d+=0.5");
});


/* 📱 MOBILE — COMPLETELY STATIC (NO GSAP TOUCH) */
mm.add("(max-width: 768px)", () => {

  // kill ALL about animations if any exist
  gsap.killTweensOf(".text-area-hover h1");
  gsap.killTweensOf(".text-area-hover span");

});



  // === PROJECTS Section ===
  gsap.fromTo(".project h4", 
    { opacity: 0, y: -60, scale: 0.8, filter: "blur(10px)" },
    { 
      opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power4.out",
      scrollTrigger: { trigger: ".part2", start: "top 80%" }
    }
  );

  gsap.utils.toArray(".project-card").forEach((card, i) => {
    gsap.from(card, {
      y: 80,
      opacity: 0,
      scale: 0.9,
      duration: 1,
      delay: i * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    });
  });

  // === Thumbnail Items Animation ===
  gsap.fromTo(".thumbnail .item",
    { y: 80, opacity: 0, scale: 0.85, rotationX: -15 },
    { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1, ease: "power4.out", stagger: 0.15,
      scrollTrigger: { trigger: ".part2", start: "top 70%", toggleActions: "play none none none" }
    }
  );

  gsap.fromTo(".thumbnail .item img",
    { scale: 0.8, opacity: 0.6, filter: "blur(3px) brightness(0.6)" },
    { scale: 1, opacity: 1, filter: "blur(0px) brightness(1)", duration: 0.8, ease: "back.out(1.7)", stagger: 0.1,
      scrollTrigger: { trigger: ".part2", start: "top 70%", toggleActions: "play none none none" }
    }
  );

  // === TIMELINE Section ===
  // timeline animations are handled in the desktop matchMedia block (avoid duplicate timelines)
  gsap.to(".timeline-icon", {
    boxShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)",
    duration: 1,
    repeat: -1,
    yoyo: true
  });

  // === SKILLS Section ===
  // Desktop-only skills animation is initialized in the matchMedia block above.
  gsap.to(".circle-html, .circle-css, .circle-js, .circle-java, .circle-python, .circle-clang", {
    boxShadow: "0 0 15px rgba(255,255,255,0.8)",
    repeat: -1,
    yoyo: true,
    duration: 1
  });

  // === CONTACT Section ===
// === CONTACT SECTION ===

mm.add("(min-width: 769px)", () => {

  let t5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".contact-section",
      start: "top 65%",
      end: "bottom 20%",
      scrub: 1
    }
  });

  t5.fromTo(
    ".contact-info",
    {
      x: -100,
      opacity: 0
    },
    {
      x: 0,
      opacity: 1,
      duration: 2,
      ease: "power3.out"
    }
  );

});

mm.add("(max-width: 768px)", () => {

  gsap.killTweensOf(".contact-info");

  ScrollTrigger.getAll().forEach(trigger => {
    if (
      trigger.trigger &&
      trigger.trigger.classList &&
      trigger.trigger.classList.contains("contact-section")
    ) {
      trigger.kill();
    }
  });

  gsap.set(".contact-info", {
    clearProps: "all",
    opacity: 1,
    x: 0,
    y: 0,
    transform: "none"
  });

});
// t5.fromTo(".contact-form",
//   { x: 100, opacity: 0 },
//   { x: 0, opacity: 1, duration: 2, ease: "power3.out" }, "-=2"
// );

/* 📱 MOBILE (NO ANIMATION - STATIC CARDS) */
mm.add("(max-width: 768px)", () => {

  // kill all ScrollTriggers related to part4 (skills/cards section)
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger && trigger.trigger.closest(".part4")) {
      trigger.kill();
    }
  });

  // kill the t4 timeline instance
  gsap.killTweensOf(".skills h4 span");
  gsap.killTweensOf(".cards .box");

  // reset all card transforms and styles
  gsap.set(".cards .box", {
    clearProps: "all",
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transform: "none"
  });

  gsap.set(".skills h4 span", {
    clearProps: "all"
  });

  // force cards to stack vertically on mobile
  gsap.set(".cards", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px"
  });

  // make each box full-width
  gsap.set(".cards .box", {
    width: "100%",
    maxWidth: "100%",
    position: "relative"
  });

});

/* 📱 MOBILE (NO ANIMATION - STATIC EDUCATION/TIMELINE) */
mm.add("(max-width: 768px)", () => {

  // kill all ScrollTriggers related to part3 (timeline/education)
  ScrollTrigger.getAll().forEach(trigger => {
    if (trigger.trigger && trigger.trigger.closest(".part3")) {
      trigger.kill();
    }
  });

  // kill timeline animations
  gsap.killTweensOf(".timeline-item");

  // reset all timeline item transforms
  gsap.set(".timeline-item", {
    clearProps: "all",
    opacity: 1,
    transform: "none",
    x: 0,
    y: 0
  });

  // force timeline to stack vertically on mobile with left line alignment
  gsap.set(".timeline", {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "25px"
  });

  // make each timeline item static and left-aligned
  gsap.set(".timeline-item", {
    position: "relative",
    width: "100%",
    maxWidth: "360px",
    left: "0",
    right: "auto",
    transform: "none",
    opacity: 1
  });

});


}



