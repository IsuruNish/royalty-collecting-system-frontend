
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

function popUpFromDown(text) {
    var x = document.getElementById("toast");
    var y = document.getElementById("desc");
    x.className = "show";
  
    setTimeout(function(){
      y.innerHTML = text;
      }, 500);
  
    setTimeout(function(){
      y.innerHTML = "";
      }, 4000);
  
    setTimeout(function(){
       x.className = x.className.replace("show", ""); 
      }, 5000);
  }
  

// function launch_toast(text) {
//     var x = document.getElementById("toast");
//     var y = document.getElementById("desc");
//     y.innerHTML  = text;
//     x.className = "show";
//     setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
// }

