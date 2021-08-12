// repeat: -1, to repeat an animation infinitely
// animation for skill icons
gsap.from(".skill-item", {duration: 1.5, opacity: 0, stagger: 0.5, ease: "circ"});

//animation for bouning arrow
gsap.to("#down-arrow",{y: "40%", duration: 1, yoyo: true, repeat: -1, delay: 1});


/*syntax for timeline animations
const timeline = gsap.timeline(defaults:{ });
timeline.from("[QUERYSELECTOR]", {PROPERTIES}, DELAY)
        .from()*/

const welcomeWords = ["Howdy!", "Bonjour!", "¡Hola!", "Ciao!", "你好", "こんにちは"]
gsap.to(".cursor", {opacity: 0, duration: 0.5, yoyo: true, ease: "power2.inOut", repeat: -1});

let masterTimeLine = gsap.timeline({repeat: -1});
welcomeWords.forEach(word =>{

    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1});
    tl.to(".text", {duration: 1, text: word});
    masterTimeLine.add(tl);
})


