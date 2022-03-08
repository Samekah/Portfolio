gsap.registerPlugin(ScrollTrigger, CSSRulePlugin);

//animation for bouncing arrow
gsap.fromTo("#down-arrow", {opacity: 0}, {delay: 3, duration: 2, opacity: 1});
gsap.to("#down-arrow",{y: "40%", duration: 1, yoyo: true, ease: "sine.in", repeat: -1, delay: 4});

//Animation for welcome words
const welcomeWords = ["Howdy!", "Bonjour!", "¡Hola!", "Ciao!", "E kãro" ,"你好", "こんにちは", "ٱلسَّلَامُ عَلَيْكُمْ‎"]
gsap.to(".cursor", {opacity: 0, duration: 0.5, yoyo: true, ease: "power2.inOut", repeat: -1});

let welcomeMasterTimeLine = gsap.timeline({onComplete: welcomeDisplay}).delay(1.5);
welcomeWords.forEach(word =>{

    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1});
    tl.to(".text", {duration: 1, text: word});
    welcomeMasterTimeLine.add(tl);
})

gsap.from("#welcome-content>h3",{delay: 2, duration: 1, opacity: 0, ease: "sine.in"});

// animation for skill icons - to start on scrol to the section
let skillsTimeLine = gsap.timeline({onComplete: showInfo, 
    scrollTrigger: {
        trigger: ".skill-item",
        toggleActions: "resume pause resume pause",
        start: "top center",
    }
}); 
skillsTimeLine.from(".skill-item", {opacity: 0, stagger: 0.5, delay: 0.5, ease: "circ"})
              .to(".static", 0.05, {id:"myStatic", onRepeat: staticAnim , repeat: -1,},"<")
              .to(".static", {opacity: 0, stagger: 0.5, onComplete:stopAnim}, "<2.5");

function stopAnim(){
    var myTween = skillsTimeLine.getById("myStatic");
    myTween.kill();
}
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
    }
}); 

backgroundTimeLine.from(rule, {cssRule: {opacity:0}})
                  .to(rule, {cssRule: {opacity: 1}})

//function to show extra info - do media queries for it
function showInfo(){
    

    // let skillImage = document.querySelector("#c-icon")
    let skillButtonContainer = document.querySelector("#screen-item");
    let staticCovers = document.querySelectorAll(".static");
    let skillButtons = document.querySelectorAll("[id^='skill-']");
    let skillButtondiv = document.querySelectorAll(".icon-container");
    let skillLine = document.querySelectorAll("hr")
    let skillInfo = document.querySelectorAll(".description");

    for(let i = 0; i < staticCovers.length; i++){
        staticCovers[i].style.display = "none"
    }
    
    

    for(let i = 0; i < skillButtons.length; i++){
        let expand = true;

        skillButtons[i].addEventListener("click", () =>{
            //see other buttons and make them go bye bye
            let skillButtonId = skillButtons[i].id.split("skill-")[1];
            let skillButtonState = skillButtons[i].getAttribute("value");

            //expand and close box
            if(expand){
                skillButtonState = "1"

                
                skillLine[i].style.visibility = "visible"

                skillButtons[i].style.width = "78%";
                skillButtons[i].style.height = "100%";
                // skillButtonContainer.style.justifyContent = "center";
                
                skillButtondiv[i].style.paddingTop = "25px"
                skillButtondiv[i].style.height = "90%"
                

                // skillImage.style.width = "8%"

                expand = false;
            }
            else{
                skillButtonState = "0"

                skillLine[i].style.visibility = "hidden"

                skillButtons[i].style.width = "133px";
                skillButtons[i].style.height = "145px";
                // skillButtonContainer.style.justifyContent = "unset";


                skillButtondiv[i].style.paddingTop = "15px";
                skillButtondiv[i].style.height = "130px";

                // skillImage.style.width = "60%"


                expand = true;

            }

            skillButtons[i].setAttribute(`value`, `${skillButtonState}`);
            skillStates(skillButtonId, skillButtonState, skillButtons, skillInfo);
        })
    }
}

function skillStates(id, state, object, info) {
    
    let vue = "";
    let infoVue = "";
    switch (state) {
      case "1":
        vue = "none";
        infoVue = "visible";
        break;
      case "0":
        vue = "block";
        infoVue = "hidden";
        break;
    }
    
    let skillId;
    let skillInfoId;

    for (skill of object) {
        skillId = skill.id.split("skill-")[1]
        if (skillId === id) {} 
        else {
            skill.style.display = vue;
        }
    }

    for (skilldata of info) {
        skillInfoId = skilldata.id.split("description-")[1]
        if (skillInfoId === id) {
            skilldata.style.visibility = infoVue;
        } 
        else {}
            
    }
}
// info.style.visibility = "visible";