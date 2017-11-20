



var foot=document.querySelector('.foot');
var navbar=document.querySelector('.navbar');
var main=document.querySelector('#main-nav');
    //手指接触屏幕
    document.addEventListener("touchstart", function(e) {
//      navbar.style.opacity=.5;
//      foot.style.opacity=.5;
        main.style.opacity=.5;
    }, false);
    //手指离开屏幕
    document.addEventListener("touchend", function(e) {
//      foot.style.opacity=1;
//      navbar.style.opacity=1;    
         main.style.opacity=1;
    }, false)