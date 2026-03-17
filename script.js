 
  function PreloadingAnimation(){
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
  }
  PreloadingAnimation()
  var canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

   var currentIndex= 0;
  var  maxIndex = 40;
const images = [];
let ImageLoaded = 0;
function preloader() {
  for (var i = 1; i <= maxIndex; i++) {
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
  // console.log("hello")
   let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      pin:true,
      scrub: 2,
      markers: true,
    },
  });
  tl.from("#frames",{
  scale:0.9,
  duration:0.3,
  },0)
  tl.to(frames, {
    currentIndex : frames.maxIndex,
    onUpdate: function () {
      loadImage(Math.floor(frames.currentIndex));
    },
  },0);
}

    //         function startAnimation(){
    //             let tl = gsap.timeline({
    //                 scrollTrigger:{
    //                 trigger: ".parent",   
    //                 start:"top top",
    //                 scrub:3,
    //                 markers:false
    //             }
    //             })

    //                 tl.to(frames,{
    //  currentIndex : frames.maxIndex,
    //  onUpdate: function(){
    //  loadImage(Math.floor(frames.currentIndex))
    //  }
    //  })

    //         }
preloader();
