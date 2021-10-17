function popUp(text){
      document.getElementsByClassName("popup")[0].classList.add("active");
      var list = document.getElementById("notsoLoad");
      var h3 = document.getElementById("poUptext");
      
      h3.innerHTML = text;
      list.classList.add('blur');
    
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    
      window.onscroll = function() {
          window.scrollTo(scrollLeft, scrollTop);
      };
    };

function hdiePopUp(){
    document.getElementsByClassName("popup")[0].classList.remove("active");
    var list = document.getElementById("notsoLoad");
    list.classList.remove('blur');
    window.onscroll = function() {};
};


     
// document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
//     hdiePopUp();
//     return true;
// });

// document.getElementById("denyBTN").addEventListener("click",function(){
//     hdiePopUp();
//     return false;
// });