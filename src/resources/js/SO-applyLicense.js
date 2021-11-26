window.addEventListener('DOMContentLoaded',()=>{
  let token = Cookies.get('Authorization');
  if(token == undefined){
      popUpFromDown("login to continue",'red');
      setTimeout(function() {
          window.location.href='../landing_page/login.html';
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

      fetch("http://localhost:8080/OSCA_war_exploded/ApplyLicenseServlet", options)
      .then(res => res.json())
      .then((data) => {
      ut = data['utype']
      console.log(data);
      if(ut!=5){
          popUpFromDown("Access denied!",'red');
          setTimeout(function() {
              window.location.href='../landing_page/login.html';
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

            makeArray(data['songNames']);
            makeArray2(data['songIds']);
            makeArray3(data['fNames'],  data['lNames'], data['songYears']);

          }        
      })
      .catch(err =>{
          popUpFromDown("Login again",'red');
          setTimeout(function() {
              window.location.href='../landing_page/login.html';
          },3000);
          console.error(err);
        });
  }
});



document.getElementById('btnSubmit2').addEventListener('click', function(){

  let filled1 = validateInputFields1();
  // let filled2 = lastValidation2();

  if(filled1){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
    }
    else{
      const loading = document.getElementById("loader-wrapper");
      const realpage = document.getElementById("notsoLoad");
    
      loading.classList.remove("hideME");
      realpage.classList.add("hideME");
    
      let myUL = document.getElementById("myUL");   
      let s = myUL.childNodes;
  
      let firstNames = []
      let lastNames = []
      let songDetails = []
      let finalIDs = []

      let count = 0;

      for (let index = 0; index < myUL.childElementCount; index++) {
        let name = s[index].nextSibling.firstChild.innerHTML;
        let singers = s[index].nextSibling.firstChild.nextSibling.innerHTML;

        let tempF = []
        let tempL = []
        let temp = name.split("<i");
        temp[1] = temp[1].split(" ")[2];
        temp = temp.map(Function.prototype.call, String.prototype.trim)
        songDetails[count] = temp;

        let singerNameArr = singers.split("|");
        singerNameArr[0] = singerNameArr[0].substring(2) 
        singerNameArr = singerNameArr.map(Function.prototype.call, String.prototype.trim)

        for (let j = 0; j < singerNameArr.length; j++) {
          let tempArr = singerNameArr[j].split(" ");
          tempF[j] = tempArr[0];
          tempL[j] = tempArr[1];
        }

        firstNames[count] = tempF;
        lastNames[count] = tempL;
        count = count + 1;
      }

      for (let index = 0; index < songDetails.length; index++) {
        
        let found = true;
        for (let i = 0; i < suggestions.length; i++) {
          if(suggestions[i] == songDetails[index][0]){
            
            if (songDetails[index][1] != year[i]){
              found = false;
            }

            if (checkSingerNames(firstNames[index], lastNames[index], i) == false){
              found = false;
            }

            if (found == true){
              finalIDs[index] = songIDs[i];
              break;
            }
          }
        }
      }

      let inputBox1 = document.getElementById("imput1").value;
      let inputBox2 = document.getElementById("imput2").value;
      let inputBox3 = document.getElementById("calendar2").value;

      if (finalIDs.length != 0) {
        
        let payload = {
          "songIds":finalIDs,
          "concertName":inputBox1,
          "venue":inputBox2,
          "date":inputBox3,
          "requestType":2
      }
          
      let options = {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload) 
      }
    

      
        fetch("http://localhost:8080/OSCA_war_exploded/ApplyLicenseServlet", options)
        .then( res => res.json())
        .then(data =>{
          console.log(data);
          if(data['ok'] == 1){
            popUpFromDown("License request sent",'greenColour');
            
            setTimeout(function() {
                window.location.href='SO-paymentForLicense.html'+"?"+data['numbers'];
            },3000);
          }
          else{
            popUpFromDown("Error try again",'red');
            setTimeout(function() {
              loading.classList.add("hideME");
              realpage.classList.remove("hideME");
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

      else{
        popUpFromDown("Add songs",'red');
        loading.classList.add("hideME");
        realpage.classList.remove("hideME");
      }
    }
  }
})







document.getElementById('btnSubmit1').addEventListener('click', function(){

  let filled1 = validateInputFields2();

  if(filled1){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
    }
    else{
      const loading = document.getElementById("loader-wrapper");
      const realpage = document.getElementById("notsoLoad");
    
      loading.classList.remove("hideME");
      realpage.classList.add("hideME");

      let inputBox1 = document.getElementById("imput3").value;
      let inputBox2 = document.getElementById("imput4").value;
      let inputBox3 = document.getElementById("calendar1").value;

      let payload = {
        "concertName":inputBox1,
        "venue":inputBox2,
        "date":inputBox3,
        "requestType":1
    }
        
    let options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload) 
    }
   

    
      fetch("http://localhost:8080/OSCA_war_exploded/ApplyLicenseServlet", options)
      .then( res => res.json())
      .then(data =>{
        console.log(data);
        if(data['ok'] == 1){
          // popUpFromDown("License request sent",'greenColour');
          setTimeout(function() {
            window.location.href='SO-paymentForLicense.html'+"?"+data['numbers'];
          },3000);
        }
        else{
          popUpFromDown("Error try again",'red');
          setTimeout(function() {
            loading.classList.add("hideME");
            realpage.classList.remove("hideME");
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

  }
})

function checkSingerNames(fnamesArr, lnamesArr, indexPassed){

  for (let index = 0; index < fnamesArr.length; index++) {
    if (singersFnames[indexPassed][index] != fnamesArr[index]){
      return false;
    }

    if (singersLnames[indexPassed][index] != lnamesArr[index]){
      return false;
    }    
  }

  return true;
}










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

// function newElement() {
//   var li = document.createElement("li");
//   var inputValue = document.getElementById("myInput").value;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("myInput").value = "";
//   console.log("awa");
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close2";
//   span.appendChild(txt);
//   li.appendChild(span);

//   for (i = 0; i < close.length; i++) {
//     close[i].onclick = function() {
//       var div = this.parentElement;
//       div.style.display = "none";
//     }
//   }
// }
 




$(function(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  $('#calendar1').attr('min',today);
  $('#calendar2').attr('min',today);
});



const searchWrapper = document.getElementById("search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

inputBox.onkeyup = (e)=>{
    let userData = e.target.value;
    let isMember = checkInputFromUser(e.target.value);
    let emptyArray = [];
   
    console.log(isMember);
    if(userData != "" && isMember != -1){
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





let suggestions = [];
let songIDs = [];
let singersFnames = [];
let singersLnames = [];
let year = [];

function makeArray(data){
  for (let i = 0; i < data.length; i++) {
    suggestions[i] = data[i];
  }
}

function makeArray2(data){
  for (let i = 0; i < data.length; i++) {
    songIDs[i] = data[i];
  }
}

function makeArray3(data1, data2,data3){
  for (let i = 0; i < data1.length; i++) {
    singersFnames[i] = data1[i];
    singersLnames[i] = data2[i];
    year[i] = data3[i];
  }
}




function newElement(inp, val) {
    
    var ul = inp;
    var input = val;
    
    let isMember = checkInputFromUser(val);

    if (isNamePresent(val,inp) == 0 && isMember != -1) {
      
      if (input != '') {

        let idFTW = getID(val);
        let fnamesFTW = getSingersFNames(val);
        let lnamesFTW = getSingersLNames(val);
        let yearFTW = getYear(val);

        var li = document.createElement("li");
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        var t = document.createElement("h5");
        var t1 = document.createElement("h8");
        t.innerHTML = input + " <i style = 'font-size:10px;'>in " + yearFTW + ' </i>';

        t1.innerHTML = "By "
        for (let index = 0; index < fnamesFTW.length - 1; index++) {
          t1.innerHTML = t1.innerHTML + fnamesFTW[index] + " " +lnamesFTW[index] + " | " ;
          
        }
        
        t1.innerHTML = t1.innerHTML + fnamesFTW[fnamesFTW.length - 1] + " " +lnamesFTW[fnamesFTW.length - 1];
        // console.log(fnamesFTW);
        // console.log(lnamesFTW);
        // console.log(yearFTW);


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

  let nodes = ul.childNodes
  for (let index = 0; index < ul.childElementCount; index++) {
    let name = nodes[index].nextSibling.firstChild.innerHTML;
    let temp = name.split("<i");

    if (temp[0].trim() == val){
      return 1;
    }
  }
  return 0;
}


function checkInputFromUser(name){
  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i].toLocaleLowerCase().startsWith(name.toLocaleLowerCase())) {
      return i;
    }
  }
  return -1; 
}

function getID(data){
  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i] == data) {
      return songIDs[i];
    }
  }
  return -1; 
}

function getSingersFNames(data){
  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i] == data) {
      return singersFnames[i];
    }
  }
  return -1; 
}

function getSingersLNames(data){
  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i] == data) {
      return singersLnames[i];
    }
  }
  return -1; 
}

function getYear(data){
  for (let i = 0; i < suggestions.length; i++) {
    if (suggestions[i] == data) {
      return year[i];
    }
  }
  return -1; 
}



//validation

function validateInputFields1(){
  var input1 = document.getElementById("imput1");
  var input2 = document.getElementById("imput2");
  var input3 = document.getElementById("calendar2");
  var filled = true;


  if(input1.value == ""){
    showValidate(input1, "imput1");
    filled = false;
  }

  if(input2.value == ""){
    showValidate(input2, "imput2");
    filled = false;
  }

  if(input3.value == ""){
    showValidate(input3, "calendar2");
    filled = false;
  }

  return filled;
}


function validateInputFields2(){
  var input1 = document.getElementById("imput3");
  var input2 = document.getElementById("imput4");
  var input3 = document.getElementById("calendar1");
  var filled = true;


  if(input1.value == ""){
    showValidate(input1, "imput3");
    filled = false;
  }

  if(input2.value == ""){
    showValidate(input2, "imput4");
    filled = false;
  }

  if(input3.value == ""){
    showValidate(input3, "calendar1");
    filled = false;
  }

  return filled;
}



function showValidate (input, id) {
  if($(input).val().trim() == '') {
    var field = document.getElementById(id);
    var text = field.nextElementSibling;

    if($(input).attr('name') == 'concert'){
      text.innerHTML = "Concert name is required";
      text.style.color = "#ff0000";
    }

    if($(input).attr('name') == 'venue'){
      text.innerHTML = "Concert venue is required";
      text.style.color = "#ff0000";
    }

 
    if($(input).attr('name') == 'date2'){
      text.innerHTML = "Concert date is required";
      text.style.color = "#ff0000";
    }
  }
}


function hideValidate (id) {
  var field = document.getElementById(id);
  var text = field.nextElementSibling;

  if(field == document.activeElement) {
    text.innerHTML = "";
    text.style.color = "#ff0000";
  }
}