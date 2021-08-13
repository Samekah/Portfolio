gsap.registerPlugin(ScrollTrigger);

//animation for bouncing arrow
gsap.fromTo("#down-arrow", {opacity: 0}, {delay: 3, duration: 2, opacity: 1});
gsap.to("#down-arrow",{y: "40%", duration: 1, yoyo: true, ease: "sine.in", repeat: -1, delay: 4});


/*syntax for timeline animations
const timeline = gsap.timeline(defaults:{ });
timeline.from("[QUERYSELECTOR]", {PROPERTIES}, DELAY)
        .from()*/
//Animation for welcome words
const welcomeWords = ["Howdy!", "Bonjour!", "¡Hola!", "Ciao!", "E kãro" ,"你好", "こんにちは", "ٱلسَّلَامُ عَلَيْكُمْ‎"]
gsap.to(".cursor", {opacity: 0, duration: 0.5, yoyo: true, ease: "power2.inOut", repeat: -1});

let masterTimeLine = gsap.timeline({onComplete: welcomeDisplay}).delay(1.5);
welcomeWords.forEach(word =>{

    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1});
    tl.to(".text", {duration: 1, text: word});
    masterTimeLine.add(tl);
})

gsap.from("#welcome-content>h3",{delay: 2, duration: 1, opacity: 0, ease: "sine.in"});

function welcomeDisplay(){
    gsap.to(".text", {duration: 1, text: welcomeWords[0]});
}

// animation for skill icons - to start on scrol to the section
gsap.from(".skill-item", {
    scrollTrigger: {
        trigger: ".skill-item",
        toggleActions: "resume pause resume pause",
        start: "top center",
    }, 
    duration: 1.5, 
    opacity: 0, 
    stagger: 0.5,
    delay: 0.5, 
    ease: "circ"
});
