
var but = document.getElementById("open-popup-btn")

but.addEventListener("click",function(){
    document.getElementsByClassName("popup")[0].classList.add("active");
    var list = document.getElementById("notsoLoad");
    list.classList.add('blur');

    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
    window.onscroll = function() {
        window.scrollTo(scrollLeft, scrollTop);
    };
  });
   
document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
    document.getElementsByClassName("popup")[0].classList.remove("active");
    var list = document.getElementById("notsoLoad");
    list.classList.remove('blur');
    window.onscroll = function() {};
});



