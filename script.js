const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
}); 

var crsr = document.querySelector("#minicircle");


function firstPageAnimation(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity:0,
        duration:1.5,
        ease: Expo.easeInOut
    })  
    .to(".boundingelem", {
        y:0,
        ease: Expo.easeInOut,
        delay:-1,
        duration: 2,
        stagger: 0.2
    })
    .from("#herofooter" , {
        y  :-10,
        opacity : 0,
        duration:1.5,
        delay:-1,
        ease : Expo.easeInOut
    })
}


var timeout;

function circlesqueeze(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
    clearTimeout(timeout);
    var xdiff = dets.clientX-xprev;
    var ydiff = dets.clientY-yprev;

    xscale = gsap.utils.clamp(0.8,1.2,xdiff);
    yscale = gsap.utils.clamp(0.8,1.2,ydiff);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale,yscale);
    timeout = setTimeout(() => {
        crsr.style.transform = `scale(1, 1)`;
    }, 1000);
    });
}

function circleMouseFollower(xscale,yscale){
    document.querySelector("#main").addEventListener("mousemove", function(dets){
        crsr.style.left= dets.clientX+"px";
        crsr.style.top= dets.clientY+"px";
        crsr.style.transform = `scale(${xscale}, ${yscale})`;
        });
    }

circlesqueeze();

circleMouseFollower();
    
firstPageAnimation();

//teeno element ko select karo, teeno par mousemove lagao, jab mousemove ho toh ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo. Ab mouse ki x and y position ke badle us image ko show karo aur us image ki position ko badlo. Move karte waqt rotate karo , jaise jaise mouse tez hota jaye waise waise rotate karo.

document.querySelectorAll(".elem")
.forEach(function(elem){

    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mousemove",function(dets){
    var diff = dets.clientY - elem.getBoundingClientRect().top-50;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
   
    gsap.to(elem.querySelector("img"),{
    opacity:1,
    ease:Power3,
    top:diff,
    left:dets.clientX,
    rotate: gsap.utils.clamp(-20,20,diffrot),
     });
    });
});

document.querySelectorAll(".elem")
.forEach(function(elem){
    elem.addEventListener("mouseleave",function(dets){
    gsap.to(elem.querySelector("img"),{
    opacity:0,
    ease:Power1
     });
    });
});