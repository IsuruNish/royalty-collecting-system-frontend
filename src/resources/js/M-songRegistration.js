var sing = document.getElementById('singer');
var composer = document.getElementById('composer');
var writer = document.getElementById('writer');

sing.addEventListener('click', newElement);
composer.addEventListener('click', newElement);
writer.addEventListener('click', newElement);


function newElement() {

    var ul = this.nextSibling.nextSibling;
    var input = this.previousSibling.previousSibling.value;

    if (input != '') {
      var li = document.createElement("li");
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      var t = document.createTextNode(input);

      li.appendChild(t);
      ul.appendChild(li);
      span.setAttribute('id','spanME');


      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);

      span.onclick = function(){
        var  parent = this.parentElement;
        parent.remove();
      };
    } 

    this.previousSibling.previousSibling.value = "";
  }

