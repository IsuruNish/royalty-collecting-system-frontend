window.addEventListener('DOMContentLoaded',()=>{
  let token = Cookies.get('Authorization');
  if(token == undefined){
      popUpFromDown("login to continue",'red');
      setTimeout(function() {
          // window.location.href='../landing_page/login.html';
      },3000);
  }

  else{
      let options = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      }

      fetch("http://localhost:8080/OSCA_war_exploded/SongRegistrationServlet", options)
      .then(res => res.json())
      .then((data) => {
      ut = data['userType']
      console.log(data);
      if(ut!=4){
          popUpFromDown("Access denied!",'red');
          setTimeout(function() {
              // window.location.href='../landing_page/login.html';
          },3000);
          }
          else{
            const loading = document.getElementById("loader-wrapper");
            const realpage = document.getElementById("notsoLoad");
            let fname = document.getElementById("Topname");
            let pic = document.getElementById("profilePicSmall");

            fname.innerHTML = "Hello "+ data['fname']+",";
            pic.src = data['DPpath'];
            loading.classList.add("hideME");
            realpage.classList.remove("hideME");

            //songnames
            //songIDs
            //singers
            makeArray(data['songNames']);
            makeArray2(data['songIDs']);
            makeArray3(data['singers']);
          }        
      })
      .catch(err =>{
          popUpFromDown("Login again",'red');
          setTimeout(function() {
              // window.location.href='../landing_page/login.html';
          },3000);
          console.error(err);
        });
  }
});



document.getElementById('btnSubmit2').addEventListener('click', function(){

  // let filled1 = validateInputFields();
  // let filled2 = lastValidation2();

  // if(filled1 && filled2){

    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            // window.location.href='../landing_page/login.html';
        },5000);
    }
    else{
      const loading = document.getElementById("loader-wrapper");
      const realpage = document.getElementById("notsoLoad");
    
      loading.classList.remove("hideME");
      realpage.classList.add("hideME");
    
      let songs = document.querySelector(".myUL");   
    
      let s = singers.childNodes;
      let c = composers.childNodes;
      let w = writters.childNodes;
    
      let memSingers = []
      let NOmemSingers = []
      let memComposers = []
      let NOmemComposers = []
      let memWritters = []
      let NOmemWritters = []
    
      let count1 = 0
      let count2 = 0
      for (let index = 0; index < singers.childElementCount; index++) {
        let name = s[index].nextSibling.firstChild.innerHTML;
        let mORnot = s[index].nextSibling.firstChild.nextSibling.innerHTML;
    
        if (mORnot == "Member"){
          memSingers[count1] = name
          count1 +=1
        }
        else{
          NOmemSingers[count2] = name
          count2 +=1
        }
      }
    
      count1 = 0
      count2 = 0
      for (let index = 0; index < composers.childElementCount; index++) {
        let name = c[index].nextSibling.firstChild.innerHTML;
        let mORnot = c[index].nextSibling.firstChild.nextSibling.innerHTML;
    
        if (mORnot == "Member"){
          memComposers[count1] = name
          count1 +=1
        }
        else{
          NOmemComposers[count2] = name
          count2 +=1
        }
      }
    
      count1 = 0
      count2 = 0
      for (let index = 0; index < writters.childElementCount; index++) {
        let name = w[index].nextSibling.firstChild.innerHTML;
        let mORnot = w[index].nextSibling.firstChild.nextSibling.innerHTML;
    
        if (mORnot == "Member"){
          memWritters[count1] = name
          count1 +=1
        }
        else{
          NOmemWritters[count2] = name
          count2 +=1
        }
      }
    
      let memSingersIDs = getID(memSingers)
      let memComposersIDs = getID(memComposers)
      let memWrittersIDs = getID(memWritters)
    
      let song = document.getElementById("input1").value;
      let version = document.getElementById("input2").value;
      let year = document.getElementById("input3").value;
    
      let info = [song, version, year]
    
      let file = document.getElementById('myFile').files[0];
      let formData = new FormData();
      formData.append("file", file);
      formData.append("info", JSON.stringify(info));
      formData.append('memSingers', JSON.stringify(memSingersIDs));
      formData.append('memComposers', JSON.stringify(memComposersIDs));
      formData.append('memWritters', JSON.stringify(memWrittersIDs));
      formData.append('NOmemSingers', JSON.stringify(NOmemSingers));
      formData.append('NOmemComposers', JSON.stringify(NOmemComposers));
      formData.append('NOmemWritters', JSON.stringify(NOmemWritters));
      let options = {
          method: 'POST',
          headers: {
              // 'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
    
          body: formData
    
      }
    
      fetch("http://localhost:8080/OSCA_war_exploded/SongRegistrationServlet", options)
      .then( res => res.json())
      .then(data =>{
        console.log(data);
        if(data['ok'] == 1){
          popUpFromDown("New song request sent",'greenColour');
          setTimeout(function() {
              // window.location.href='M-songRegistration.html';
          },3000);
        }
        else{
          popUpFromDown("Error try again",'red');
          setTimeout(function() {
            loading.classList.add("hideME");
            realpage.classList.remove("hideME");
              // window.location.href='../landing_page/login.html';
          },3000);
        }
      })
      .catch(err =>{
        popUpFromDown("Error try again",'red');
        setTimeout(function() {
          loading.classList.add("hideME");
          realpage.classList.remove("hideME");
            // window.location.href='../landing_page/login.html';
        },3000);
        console.error(err);
      });
    }
  // }
})


















var images = document.getElementById('images');

function myFun1(){   
    if(document.getElementById("openLicense").classList.contains("close")){
       document.getElementById("openLicense").classList.toggle("close");
       document.getElementById("closeLicense").classList.add("close");
         
       document.getElementById("btn1").classList.add("select");
       document.getElementById("btn2").classList.remove("select");
       images.classList.add('hide');

    }

    else if(!document.getElementById("openLicense").classList.contains("close")){
      document.getElementById("openLicense").classList.toggle("close");
      document.getElementById("btn1").classList.remove("select");
      images.classList.remove('hide');

   }
}
 
  function myFun2(){
      
    
    if(document.getElementById("closeLicense").classList.contains("close")){
       document.getElementById("closeLicense").classList.toggle("close");
       document.getElementById("openLicense").classList.add("close");
 
       document.getElementById("btn2").classList.add("select");
       document.getElementById("btn1").classList.remove("select");
       images.classList.add('hide');
    }

    else if(!document.getElementById("closeLicense").classList.contains("close")){
      document.getElementById("closeLicense").classList.toggle("close");
      document.getElementById("btn2").classList.remove("select");
      images.classList.remove('hide');

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
 




$(function(){
  var dtToday = new Date();
  
  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
 
  var maxDate = year + '-' + month + '-' + day;

  $('#calendar1').attr('min', maxDate);
  $('#calendar2').attr('min', maxDate);
});



const searchWrapper = document.getElementById("search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

inputBox.onkeyup = (e)=>{
    let userData = e.target.value;
    let isMember = checkInputFromUser(e.target.value);
    let emptyArray = [];
    if(userData && isMember == 1){

        emptyArray = suggestions.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data)=>{
            return data = `<li>${data}</li>`;
        });

        searchWrapper.classList.add("active"); 
        showSuggestions(emptyArray, suggBox, inputBox);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute("onclick", "select(this,'search-input')");
        }
    }else{
        searchWrapper.classList.remove("active");
    }
}

function select(element, wrap){

    const sw = document.getElementById(wrap);

    let selectData = element.textContent;
    let ul = element.parentElement.parentElement.nextSibling.nextSibling;
    let inputField = element.parentElement.previousSibling.previousSibling;
    newElement(ul,selectData)

    element.textContent = ""
    inputField.value = ""
    sw.classList.remove("active");
}

function showSuggestions(list, ele, inp){
    let listData;
    if(!list.length){
        userValue = inp.value;
        listData = `<li>${userValue}</li>`;
    }else{
      listData = list.join('');
    }
    ele.innerHTML = listData;
}








// let suggestions = [];
let songIDs = [];
let singers = [];

function makeArray(data){
  for (let i = 0; i < data.length; i++) {
    suggestions[i] = data[i];
  }
}

function makeArray2(data){
  for (let i = 0; i < data.length; i++) {
    memIDs[i] = data[i];
  }
}

function makeArray3(data){
  for (let i = 0; i < data.length; i++) {
    singers[i] = data[i];
  }
}




function newElement(inp, val) {
    
    var ul = inp;
    var input = val;
    
    let isMember = checkInputFromUser(val);

    if (isNamePresent(val,inp) == 0 && isMember != -1) {
      
      if (input != '') {

        var li = document.createElement("li");
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        var t = document.createElement("h5");
        var t1 = document.createElement("h8");
        t.innerHTML = isMember + "  " +input;

        
        //getSingers function
        // if (isMember == 1) {
        //   t1.innerHTML = "Member";
        // }
        // else{
        //   t1.innerHTML = "Non-member";
        // }

        li.appendChild(t);
        li.appendChild(t1);
        ul.appendChild(li);
        span.setAttribute('id','spanME');

        span.className = "close2";
        span.appendChild(txt);
        li.appendChild(span);

        span.onclick = function(){
          var  parent = this.parentElement;
          parent.remove();
        };
        
      } 
    }
}

function checkMember(name){

  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i] == name) {
      return 1;
    }
  }
  return 0; 
}


function getID(names){
  let id = []
  let count = 0;

  for (let i = 0; i < names.length; i++) {
    for (let j = 0; j < suggestions.length; j++) {
      console.log(suggestions[j]);
      if (suggestions[j] == names[i]) {
        id[count] = memIDs[j];
        count +=1;
        break;
      }
    }
  }
  return id;
}


function isNamePresent(val, ul){

  console.log(ul.childElementCount);
  let nodes = ul.childNodes

  for (let index = 0; index < ul.childElementCount; index++) {

    let name = nodes[index].nextSibling.firstChild.innerHTML;
    if (name == val){
      return 1;
    }
  }
  return 0;
}


function checkInputFromUser(name){

  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i].startsWith(name)) {
      console.log(suggestions[i]);
      return i;
    }
  }
  return -1; 
}