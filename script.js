  gsap.registerPlugin(Flip);

  window.addEventListener("load", () => {
    const name = document.getElementById("name")
    const logo = document.getElementById("logo")

    const tl = gsap.timeline();

    // Animate text
    tl.from("#loader h1", {
      // opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power3.out"
    });

    // Small pause
    tl.to("#loader h1", {
      // opacity: 0,
      y: -60,
      duration: 0.3,
      delay: 0.5
    });
    tl.from("#loader h2",{
      opacity: 0,
      y: 50,
      duration: 0.5,
      ease: "power3.out"
    })
//   tl.add(() => {
//     const state = Flip.getState(name);

//     // Move to header
//     logo.appendChild(name);

//     Flip.from(state, {
//         delay:1,
//       duration: 1,
//       ease: "power4.inOut",
//     //   absolute: true,
    
//     //   scale: true
//     });
//   });
    

    tl.to("#loader h2",{
      opacity:0,
      y:-20,
      duration:0.5,
      delay:2,
      ease:"power3.out"
    })

    // Slide loader up
    tl.to("#loader", {
        opacity:0,
    //   y: "-100%",
      duration: 1.5,
    //   delay:1,
      ease: "power4.inOut"
    });

    // Remove loader completely
    tl.set("#loader", { display: "none" });
  });