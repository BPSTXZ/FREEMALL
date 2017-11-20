
var mainNav =document.querySelector('#main-nav');
var topDis = getAllTop(mainNav);
window.onscroll = function(e) {
  var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
  if(nowTop >= topDis) {
    mainNav.style.position = 'fixed';
    mainNav.style.top = 3.5+ 'rem';
    mainNav.style.borderTop='2px solid #CDCDCD ';
    mainNav.style.borderBottom='2px solid #CDCDCD ';
  }else {
    mainNav.style.position = 'relative';
    mainNav.style.top = 13.5 + 'rem';
    mainNav.style.borderTop='none';
    mainNav.style.borderBottom='none';
  }
};

function getAllTop(obj) {       
  var allTop = obj.offsetTop;
  while(obj = obj.offsetParent) {
    allTop += obj.offsetTop;
  }
  return allTop;
}