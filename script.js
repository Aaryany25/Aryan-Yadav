function PreloadingAnimation() {
  gsap.registerPlugin(Flip);

  window.addEventListener("load", () => {
    const loaderTextWrapper = document.querySelector("#loader-text-wrapper");
    const loaderLogo = document.querySelector("#loader-logo");
    const targetLogo = document.querySelector("#logo");
    const loader = document.querySelector("#loader");
    const loaderPanel = document.querySelector(".loader-panel");

    const tl = gsap.timeline();

    // 1. Reveal "ARYAN YADAV"
    tl.from("#loader h1", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    });

    // 2. Slide up to reveal "AY" logo
    tl.to(loaderTextWrapper, {
      yPercent: -50,
      duration: 0.8,
      delay: 0.5,
      ease: "power4.inOut",
    });

    // 3. Flip animation: loader-logo -> target-logo
    tl.add(() => {
      const state = Flip.getState(loaderLogo);

      // Preparation for Flip: Move loaderLogo to targetLogo container or position it there
      // We'll keep it simple by just moving it visually
      targetLogo.appendChild(loaderLogo);
      
      // Style the logo to match Navbar style
      gsap.set(loaderLogo, { 
        fontSize: window.innerWidth < 768 ? "1.5rem" : "2.25rem", 
        height: "auto",
        color: "black",
        fontWeight: "900",
        letterSpacing: "-0.05em"
      });

      Flip.from(state, {
        duration: 1.2,
        ease: "power4.inOut",
        absolute: true,
        onComplete: () => {
            // Ensure any classes or IDs are cleaned up if necessary
        }
      });
    });

    // 4. Background Reveal
    tl.to(loaderPanel, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
    }, "-=1"); // overlapping with Flip

    // 5. Cleanup
    tl.set(loader, { display: "none" });
  });
}

  var canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

   var currentIndex= 7;
  var  maxIndex = 121;
const images = [];
let ImageLoaded = 0;
function preloader() {
  for (var i = 0; i <= maxIndex; i++) {
    // const imgUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const imgUrl = `assets/frames/frame_${i.toString().padStart(4,"0")}.jpeg`
    
    const img = new Image();

    img.src = imgUrl;
    
    img.onload = () => {
      ImageLoaded++;
      
      if (ImageLoaded === maxIndex) {
        
        
        loadImage(frames.currentIndex);
        
        startAnimation();
      }
    };
    images.push(img);
    
  }
}

function loadImage(index) {
 
  if (index >= 0 && index <= maxIndex) {
    const img = images[index];
  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ScaleX = canvas.width / img.width;
    const ScaleY = canvas.height / img.height;
    const scale = Math.max(ScaleX, ScaleY);
    // to get the imgae to fit the screen of the canvas
    const NewWidth = img.width * scale;
    const NewHeight = img.height * scale;
    //To get the Image on the center of the canvas
    const offsetX = (canvas.width - NewWidth) / 2;
    const offsetY = (canvas.height - NewHeight) / 2;

    //Clear the Canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    //Smooth the Image Qaulity
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    //Draw the Image
    context.drawImage(img, offsetX, offsetY, NewWidth, NewHeight);
    //Next Frame
    frames.currentIndex = index;
    
    
  }
}
function startAnimation() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",      // Start when the top of parent hits top of viewport
      end: "bottom bottom",  // End when the bottom of parent hits bottom of viewport
      pin: ".child",         // Pin the inner container
      scrub: 2,
      // markers: true,
    },
  });

  

  tl.to(frames, {
    currentIndex: frames.maxIndex,
    onUpdate: function () {
      loadImage(Math.floor(frames.currentIndex));
    },
  }, 0);
}
function CursorAnimation() {
  const cursor = document.querySelector("#crsr");

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power3.out"
    });
  });
}
CursorAnimation()
PreloadingAnimation()
preloader();
const cursor = document.getElementById("cursor");
const trailContainer = document.getElementById("trail");

const trailCount = 12;
let trail = [];

// create trail dots (with Tailwind classes)
for (let i = 0; i < trailCount; i++) {
  const dot = document.createElement("div");
  dot.className = "fixed w-2 h-2 bg-black rounded-full pointer-events-none z-[998] -translate-x-1/2 -translate-y-1/2";
  trailContainer.appendChild(dot);

  trail.push({ x: 0, y: 0, el: dot });
}

let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  // main cursor
  cursor.style.left = mouse.x + "px";
  cursor.style.top = mouse.y + "px";

  // trail
  trail.forEach((dot, index) => {
    const next = trail[index - 1] || mouse;

    dot.x += (next.x - dot.x) * 0.3;
    dot.y += (next.y - dot.y) * 0.3;

    dot.el.style.left = dot.x + "px";
    dot.el.style.top = dot.y + "px";

    // fade effect
    dot.el.style.opacity = index / trail.length;
  });

  requestAnimationFrame(animate);
}

// animate();
Shery.imageEffect(".img", {
  style:3 /*OR 5 for different variant */,
  debug: false,
});

function FooterAnimation() {
  gsap.to(".marquee-text", {
    xPercent: -33.33,
    duration: 10,
    ease: "none",
    repeat: -1
  });
}

FooterAnimation();
