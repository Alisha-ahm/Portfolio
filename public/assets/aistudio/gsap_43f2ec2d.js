gsap.registerPlugin(ScrollTrigger);

gsap.from(".logo", { y: -50, opacity: 0, duration: 1, ease: "power3.out" });
    gsap.from(".social-icons i", { x: -50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    gsap.from(".menu ul li", { x: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    gsap.from(".sound", { y: 50, opacity: 0, duration: 1, delay: 1, ease: "power3.out" });

var t2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".part2",
    start: "top 80%",
    end: "bottom 20%",
    scrub: 2,
    markers: false
  }
});

// Neon Heading Animation
gsap.fromTo(".project h4", 
  { 
    opacity: 0, 
    y: -60, 
    scale: 0.8,
    filter: "blur(10px)"
  },
  { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    duration: 1.2, 
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".part2",
      start: "top 80%"
    }
  }
);

// Staggered Cards Animation
gsap.from(".project h4", {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".part2",
    start: "top 80%"
  }
});

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


// Animate thumbnail wrapper items
// Animate Thumbnails Wrapper (.thumbnail .item)
gsap.fromTo(".thumbnail .item",
  {
    y: 80,           // neeche se aaye
    opacity: 0,
    scale: 0.85,
    rotationX: -15   // halka tilt
  },
  {
    y: 0,
    opacity: 1,
    scale: 1,
    rotationX: 0,
    duration: 1,
    ease: "power4.out",
    stagger: 0.15,
    scrollTrigger: {
      trigger: ".part2",
      start: "top 70%",
      toggleActions: "play none none none"
    }
  }
);

// Animate Images inside thumbnails
gsap.fromTo(".thumbnail .item img",
  {
    scale: 0.8,
    opacity: 0.6,
    filter: "blur(3px) brightness(0.6)"   // soft blurred start
  },
  {
    scale: 1,
    opacity: 1,
    filter: "blur(0px) brightness(1)",
    duration: 0.8,
    ease: "back.out(1.7)",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".part2",
      start: "top 70%",
      toggleActions: "play none none none"
    }
  }
);

var t3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".part3",
    start: "top 70%",
    end: "bottom 20%",
    scrub: 1,
    markers: false
  }
});

// Animate items with 3D entrance
t3.from(".timeline-item.left.orange", { x: -200, opacity: 0, rotateY: 20, duration: 1, ease: "power3.out" }, "a")
  .from(".timeline-item.right.red", { x: 200, opacity: 0, rotateY: -20, duration: 1, ease: "power3.out" }, "a+=0.3")
  .from(".timeline-item.left.blue", { x: -200, opacity: 0, rotateY: 20, duration: 1, ease: "power3.out" }, "a+=0.6");

// Icon pulse glow
gsap.to(".timeline-icon", {
  boxShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)",
  duration: 1,
  repeat: -1,
  yoyo: true
});


var t4 = gsap.timeline({
  scrollTrigger: {
    trigger: ".part4",
    start: "top 75%",
    end: "bottom 20%",
    scrub: 1,
    markers: false
  }
});

// Wave for each span letter
t4.fromTo(".skills h4 span",
  { y: 0 },
  {
    y: -20,
    repeat: 1,
    yoyo: true,
    duration: 0.5,
    stagger: 0.1,
    ease: "power3.inOut"
  },
  "d"
);
// Cards animation — only run on desktop; mobile show static boxes
if (window.innerWidth >= 769) {
  t4.fromTo(".cards .box",
    { y: 100, scale: 0.8, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: "back.out(1.7)" },
    "d+=0.5"
  );
} else {
  gsap.set(".cards .box", { opacity: 1, y: 0, scale: 1, clearProps: "all" });
}
gsap.to(".circle-html, .circle-css, .circle-js, .circle-java, .circle-python, .circle-clang", {
  boxShadow: "0 0 15px rgba(255,255,255,0.8)",
  repeat: -1,
  yoyo: true,
  duration: 1
});



let t5 = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 65%",
    end: "bottom 20%",
    scrub: 1,
    markers: false
  }
});

// Zoom section
t5.fromTo(".contact-section",
  { scale: 0.9, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }
);

// Header glow
t5.fromTo(".contact-header h2",
  { opacity: 0, textShadow: "0px 0px 0px #ede8f1ff" },
  {opacity: 1, textShadow: "0px 0px 20px #ede8f1ff", duration: 1, ease: "power3.out" },
  "-=0.5"
);

t5.fromTo(".contact-header p",
  
  { opacity: 0, textShadow: "0px 0px 0px #ede8f1ff" },
  {opacity: 1, textShadow: "0px 0px 20px #ede8f1ff", duration: 3, ease: "power3.out" , font:"bold"},
  "-=0.5"
);

t5.fromTo(".contact-info",
  { x: -100, opacity: 0 },
  { x: 0, opacity: 1, duration: 2, ease: "power3.out" },
  "-=3" // Header ke sath overlap kara
);

t5.fromTo(".contact-form",
  { x: 100, opacity: 0 },
  { x: 0, opacity: 1, duration: 2, ease: "power3.out" },
  "-=3" // Header ke sath overlap kara
);