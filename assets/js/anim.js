gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

//animation for bouncing arrow
gsap.fromTo("#down-arrow", {opacity: 0}, {delay: 3, duration: 2, opacity: 1});
gsap.to("#down-arrow",{y: "40%", duration: 1, yoyo: true, ease: "sine.in", repeat: -1, delay: 4});

//Animation for welcome words
const welcomeWords = ["Howdy!", "Bonjour!", "¡Hola!", "Ciao!", "E kãro" ,"你好", "こんにちは", "ٱلسَّلَامُ عَلَيْكُمْ‎"]
gsap.to(".cursor", {opacity: 0, duration: 0.5, yoyo: true, ease: "power2.inOut", repeat: -1});
// onComplete: welcomeDisplay
let welcomeMasterTimeLine = gsap.timeline({onComplete: welcomeDisplay}).delay(1.5);
welcomeWords.forEach(word =>{

    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1});
    tl.to(".text", {duration: 1, text: word});
    welcomeMasterTimeLine.add(tl);
})

gsap.from("#welcome-content>h3",{delay: 2, duration: 1, opacity: 0, ease: "sine.in"});

// animation for skill icons - to start on scrol to the section
let skillsTimeLine = gsap.timeline({
    defaults: {duration: 1.5}, 
    scrollTrigger: {
        trigger: ".skill-item",
        toggleActions: "resume pause resume pause",
        start: "top center",
        markers:true     
    }
}); 
skillsTimeLine.from(".skill-item", {opacity: 0, stagger: 0.5, delay: 0.5, ease: "circ"})
              .to(".static", 0.05, {onRepeat: staticAnim , repeat: -1},"<")
              .to(".static", {opacity: 0, stagger: 0.5,}, "<2.5");


// helper functions
function staticAnim(){
    gsap.set(".static", {backgroundPosition: Math.floor(Math.random() * 100) + 1 + "% " + Math.floor(Math.random() * 10) + 1 + "%"});
}

function welcomeDisplay(){
    gsap.to(".text", {duration: 1, text: welcomeWords[0]});
}

let rule = CSSRulePlugin.getRule(".container::after")

//make a funtion that targets background opacity at specific points of svg - not working
let backgroundTimeLine = gsap.timeline({
    scrollTrigger: {
        trigger: ".container",        
        start: "top top",
        scrub:true,
        markers:true     
    }
}); 

backgroundTimeLine.from(rule, {cssRule: {opacity:0}})
                  .to(rule, {cssRule: {opacity: 1}})