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
          // setTimeout(function() {
          //     window.location.href='../landing_page/login.html';
          // },3000);
          }
          else{
            const loading = document.getElementById("loader-wrapper");
            const realpage = document.getElementById("notsoLoad");

            loading.classList.add("hideME");
            realpage.classList.remove("hideME");
            makeArray(data['memberNames']);
            makeArray2(data['memberIDs']);
          }        
      })
      .catch(err =>{
          alert("Email or Password is wrong");
          popUpFromDown("Login again",'red');
          setTimeout(function() {
              // window.location.href='../landing_page/login.html';
          },3000);
          // popUp("Email or Password is wrong");
          console.error(err);
        });
  }
});



document.querySelector(".submitBTN").addEventListener('click', function(){

//form validation

  let token = Cookies.get('Authorization');
  if(token == undefined){
      popUpFromDown("login to continue",'red');
      setTimeout(function() {
          // window.location.href='../landing_page/login.html';
      },5000);
  }

  let singers = document.querySelector(".myUL");
  let composers = document.querySelector(".myUL1");
  let writters = document.querySelector(".myUL2");


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
  // console.log(memSingers);
  // console.log(NOmemSingers);
  // console.log(memComposers);
  // console.log(NOmemComposers);
  // console.log(memWritters);
  // console.log(NOmemWritters);

  // let memSingersIDs = []
  // let memComposersIDs = []
  // let memWrittersIDs = []

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
  // const loading = document.getElementById("loader-wrapper");
  // const realpage = document.getElementById("notsoLoad");
  // loading.classList.remove("hideME");
  // realpage.classList.add("hideME");

  fetch("http://localhost:8080/OSCA_war_exploded/SongRegistrationServlet", options)



})


// function getIDsOfSingers(names)











let suggestions = [];
let memIDs = [];

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



function newElement(inp, val) {
    
    var ul = inp;
    var input = val;

    if (isNamePresent(val,inp) == 0) {
      
      isMember = checkMember(val);
      if (input != '') {

        var li = document.createElement("li");
        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        var t = document.createElement("h5");
        var t1 = document.createElement("h8");
        t.innerHTML = input;

        if (isMember == 1) {
          t1.innerHTML = "Member";
        }
        else{
          t1.innerHTML = "Non-member";
        }

        li.appendChild(t);
        li.appendChild(t1);
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

