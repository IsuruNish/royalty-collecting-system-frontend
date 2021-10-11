function myFun1(){
     
   
    if(document.getElementById("openLicense").classList.contains("close")){
 
       document.getElementById("openLicense").classList.toggle("close");
       document.getElementById("closeLicense").classList.add("close");
    //    document.getElementById("tbl3").classList.add("close");
       
       document.getElementById("btn1").classList.add("select");
       document.getElementById("btn2").classList.remove("select");
    //    document.getElementById("btn3").classList.remove("select");
       
    //    document.getElementById("svg").classList.add("close");
 
    }
 
    
   
   
  }
 
  function myFun2(){
      
    
    if(document.getElementById("closeLicense").classList.contains("close")){
 
       document.getElementById("closeLicense").classList.toggle("close");
       document.getElementById("openLicense").classList.add("close");
    //    document.getElementById("tbl3").classList.add("close");
 
 
       document.getElementById("btn2").classList.add("select");
       document.getElementById("btn1").classList.remove("select");
    //    document.getElementById("btn3").classList.remove("select");
 
    //    document.getElementById("svg").classList.add("close");
 
    }
 
    
   
   
  }



  // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
var myNodelist = document.getElementsByName("li");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close2";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close2");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev) {
//   if (ev.target.tagName === 'LI') {
//     ev.target.classList.toggle('checked');
//   }
// }, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close2";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}
 