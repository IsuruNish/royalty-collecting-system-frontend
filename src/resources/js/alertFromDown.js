
// var but = document.getElementById("open-popup-btn")

// but.addEventListener("click",function(){
//     document.getElementsByClassName("popup")[0].classList.add("active");
//     var list = document.getElementById("notsoLoad");
//     list.classList.add('blur');

//     scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
//     window.onscroll = function() {
//         window.scrollTo(scrollLeft, scrollTop);
//     };
//   });
   
// document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
//     document.getElementsByClassName("popup")[0].classList.remove("active");
//     var list = document.getElementById("notsoLoad");
//     list.classList.remove('blur');
//     window.onscroll = function() {};
// });

function popUpFromDown(text, className) {
    var x = document.getElementById("toast");
    var y = document.getElementById("desc");
    x.className = "show";
  
    setTimeout(function(){
      x.classList.add(className);
      y.innerHTML = text;
      }, 500);
  
    setTimeout(function(){
      y.innerHTML = "";
      }, 4000);
  
    setTimeout(function(){
      x.classList.remove(className);
       x.className = x.className.replace("show", ""); 
      }, 5000);
  }