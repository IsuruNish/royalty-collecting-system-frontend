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
      var t = document.createElement('h5');
      t.innerHTML = input
      // var t = document.createTextNode(input);

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

// function makeRed(id){
//   var element = document.getElementById(id);

//   if (element.classList.contains(redCol)){
//       element.classList.remove('redCol');
//   }
//   else{
//       element.classList.add('redCol');
//   }
// }


function take(is){
  console.log(is.previousSibling.previousSibling.innerHTML)

  let newUl = document.querySelector(".newUL");
  let child = newUl.children;
  let numberOfLi = newUl.childElementCount;
  
  let theChild = 0;
  for (let i = 0; i < numberOfLi; i++){
    if(child[i].firstChild.innerHTML == is.previousSibling.previousSibling.innerHTML){
        theChild = i;
        break;
    }
  }

  if (is.parentElement.classList.contains('redCol')){
    is.parentElement.classList.remove('redCol');
    is.parentElement.classList.add('normalCol');
    child[theChild].remove();

    if(newUl.childElementCount == 0){
      document.getElementById('removedPpl').classList.add("hideTheTopic");
    }

  }
  else{
    console.log(newUl.childElementCount);
    if(newUl.childElementCount == 0){
      console.log("howdy");
      document.getElementById('removedPpl').classList.remove("hideTheTopic");
    }
    is.parentElement.classList.add('redCol');

    var li = document.createElement("li")
    li.classList.add('normalCol');
    var t = document.createElement('h5');
    t.innerHTML = is.previousSibling.previousSibling.innerHTML;

    li.appendChild(t);
    newUl.appendChild(li);

  }
}