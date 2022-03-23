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

      fetch("http://localhost:8080/OSCA_war_exploded/SongRegistrationServlet", options)
      .then(res => res.json())
      .then((data) => {
      ut = data['userType']
      console.log(data);
      if(ut!=4){
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
            makeArray(data['memberNames']);
            makeArray2(data['memberIDs']);

            let id = document.URL.split("?")[1];
            let payload = {
              "songID":id,
              "reqType":100
            }
              
            let options = {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(payload) 
            }

            fetch("http://localhost:8080/OSCA_war_exploded/ChangeSongOwnershipServlet", options)
            .then(res => res.json())
            .then((data) => {
              console.log(data);
              console.log("data");

              let songname = document.getElementsByClassName("input1");
              let version = document.getElementsByClassName("input2");
              let year = document.getElementsByClassName("input3");

              noneMemberNames = data['allNoneMemberNames'];
              
              songname[0].value = data['POSTinfo'][1];
              version[0].value = data['POSTinfo'][2];
              year[0].value = data['POSTinfo'][3];

              for (let i = 0; i < data['POSTsingers'][0].length; i++) {
                POSTsingersID[i] = data['POSTsingers'][0][i];
                POSTsingersFname[i] = data['POSTsingers'][1][i];
                POSTsingersLname[i] = data['POSTsingers'][2][i];                
              }

              for (let i = 0; i < data['POSTcomposers'][0].length; i++) {
                POSTcomposersID[i] = data['POSTcomposers'][0][i];
                POSTcomposersFname[i] = data['POSTcomposers'][1][i];
                POSTcomposersLname[i] = data['POSTcomposers'][2][i];                
              }

              for (let i = 0; i < data['POSTwriters'][0].length; i++) {
                POSTwirtersID[i] = data['POSTwriters'][0][i];
                POSTwirtersFname[i] = data['POSTwriters'][1][i];
                POSTwirtersLname[i] = data['POSTwriters'][2][i];                
              }
            
              POSTelement(POSTsingersFname,POSTsingersLname,"singer");
              POSTelement(POSTcomposersFname,POSTcomposersLname,"composer");
              POSTelement(POSTwirtersFname,POSTwirtersLname,"writer");
            })
            .catch(err =>{
              popUpFromDown("Login again",'red');
              setTimeout(function() {
                  window.location.href='M-songModification.html?'+id;
              },3000);
              console.error(err);
            });
          }        
      })
      .catch(err =>{
          popUpFromDown("Login again",'red');
          setTimeout(function() {
              window.location.href='M-songModification.html?'+id;;
          },3000);
          console.error(err);
        });
  }
});


let POSTsingersID = [];
let POSTsingersFname = [];
let POSTsingersLname = [];
let POSTcomposersID = [];
let POSTcomposersFname = [];
let POSTcomposersLname = [];
let POSTwirtersID = [];
let POSTwirtersFname = [];
let POSTwirtersLname = [];

let noneMemberNames = [];


function POSTelement(fnames, lnames, className) {
    
  let ul = document.getElementsByClassName(className)[0];

  if (fnames.length == 0){
    console.log();
    document.getElementsByClassName(className)[0].previousSibling.previousSibling.setAttribute('class','hideME');
    
  }
    for (let i = 0; i < fnames.length; i++) {
      
      var li = document.createElement("li");
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      var t = document.createElement("h5");
      t.innerHTML = fnames[i]+ " "+ lnames[i];

      li.appendChild(t);
      ul.appendChild(li);
      span.setAttribute('id','spanME');
      li.setAttribute('class','normalCol');

      span.className = "close";

      if (className == "singer") {
        span.setAttribute('onclick','take1(this)');
      }
      else if (className == "composer") {
        span.setAttribute('onclick','take2(this)');
      }
      else if (className == "writer") {
        span.setAttribute('onclick','take3(this)');
      }

      span.appendChild(txt);
      li.appendChild(span);

    }
}





document.querySelector(".submitBTN").addEventListener('click', function(){
  
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
    
      let newSingers = document.querySelector(".myUL");
      let newComposers = document.querySelector(".myUL1");
      let newWritters = document.querySelector(".myUL2");
      let curSingers = document.querySelector(".singer");
      let curComposer = document.querySelector(".composer");
      let curWritter = document.querySelector(".writer");

    
      let s = newSingers.childNodes;
      let c = newComposers.childNodes;
      let w = newWritters.childNodes;

      let curSingerChilds = curSingers.childNodes;
      let curComposerChilds = curComposer.childNodes;
      let curWriterChilds = curWritter.childNodes;
   
      // console.log(curSingerChilds[0].nextSibling.firstChild.innerHTML);
      // console.log(curComposerChilds[0].nextSibling.firstChild.innerHTML);
      // console.log(curWriterChilds[0].nextSibling.firstChild.innerHTML);

      let memSingers = []
      let NOmemSingers = []
      let memComposers = []
      let NOmemComposers = []
      let memWritters = []
      let NOmemWritters = []

      let count1 = 0
      let count2 = 0
      for (let index = 0; index < curSingers.childElementCount; index++) {
        if (!curSingerChilds[index].nextSibling.classList.contains('redCol')) {
          let name = curSingerChilds[index].nextSibling.firstChild.innerHTML;
          memSingers[count1] = name
          count1 +=1
        }
      }

      for (let index = 0; index < newSingers.childElementCount; index++) {
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
      for (let index = 0; index < curComposer.childElementCount; index++) {
        if (!curComposerChilds[index].nextSibling.classList.contains('redCol')) {
          let name = curComposerChilds[index].nextSibling.firstChild.innerHTML;
          memComposers[count1] = name
          count1 +=1
        }
      }

      for (let index = 0; index < newComposers.childElementCount; index++) {
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
      for (let index = 0; index < curWritter.childElementCount; index++) {
        if (!curWriterChilds[index].nextSibling.classList.contains('redCol')) {
          let name = curWriterChilds[index].nextSibling.firstChild.innerHTML;
          memWritters[count1] = name
          count1 +=1
        }
      }
      for (let index = 0; index < newWritters.childElementCount; index++) {
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


      //code here

      for (let index123 = 0; index123 < memSingers.length; index123++) {
        if (noneMemberNames.includes(memSingers[index123])) {
          NOmemSingers.push(memSingers[index123]);
        }
      }

      for (let index123 = 0; index123 < memComposers.length; index123++) {
        if (noneMemberNames.includes(memComposers[index123])) {
          NOmemComposers.push(memComposers[index123]);
        }
      }

      for (let index123 = 0; index123 < memWritters.length; index123++) {
        if (noneMemberNames.includes(memWritters[index123])) {
          NOmemWritters.push(memWritters[index123]);
        }
      }

      

    
      let memSingersIDs = getID(memSingers)
      let memComposersIDs = getID(memComposers)
      let memWrittersIDs = getID(memWritters)




      let deleteSingers = document.querySelector(".newUL1");
      let deleteComposers = document.querySelector(".newUL2");
      let deleteWritters = document.querySelector(".newUL3");
      
      // let ss = deleteSingers.childNodes;
      // let cc = deleteComposers.childNodes;
      // let ww = deleteWritters.childNodes;

      let delSingers = [];
      delSingers[0] = deleteSingers.childElementCount;

      let delComposers = [];
      deleteComposers[0] = deleteComposers.childElementCount;

      let delWritters = [];
      delWritters[0] = delWritters.childElementCount;
    
      // for (let index = 0; index < deleteSingers.childElementCount; index++) {
      //   let name = ss[index].nextSibling.firstChild.innerHTML;
      //   delSingers[index] = name
      // }
    
      // for (let index = 0; index < deleteComposers.childElementCount; index++) {
      //   let name = cc[index].nextSibling.firstChild.innerHTML;
      //   delComposers[index] = name
      //   }
    
      // for (let index = 0; index < deleteWritters.childElementCount; index++) {
      //   let name = ww[index].nextSibling.firstChild.innerHTML;
      //   delWritters[index] = name
      // }

      // currentSingers(delSingers);
      // currentComposers(delComposers);
      // currentWriters(delWritters);

      // console.log(deleteSingersID);
      // console.log(deleteComposersID);
      // console.log(deleteWritersID);

      let song = document.getElementsByClassName("input1")[0].value;
      let version = document.getElementsByClassName("input2")[0].value;
      let publishedyear = document.getElementsByClassName("input3")[0].value;
      let songID = document.URL.split("?")[1];


      let info = [songID, song, version, publishedyear]

      let file = document.getElementById('myFile').files[0];

      if(delSingers.length == 0 && delComposers.length == 0 &&  delWritters.length == 0 &&  memSingers.length == 0 &&  NOmemSingers.length == 0 &&  memWritters.length == 0 &&  NOmemWritters.length == 0 &&  memComposers.length == 0 && NOmemComposers.length == 0){
        popUpFromDown("No changes are made",'red');
        loading.classList.add("hideME");
        realpage.classList.remove("hideME");
      }

      else if(file == undefined){
        popUpFromDown("Submit confirmation documents",'red');
        loading.classList.add("hideME");
        realpage.classList.remove("hideME");
      }

      else{
    
        memSingersIDs = memSingersIDs.filter((item, i, ar) => ar.indexOf(item) === i);
        memComposersIDs = memComposersIDs.filter((item, i, ar) => ar.indexOf(item) === i);
        memWrittersIDs = memWrittersIDs.filter((item, i, ar) => ar.indexOf(item) === i);

        NOmemSingers = NOmemSingers.filter((item, i, ar) => ar.indexOf(item) === i);
        NOmemComposers = NOmemComposers.filter((item, i, ar) => ar.indexOf(item) === i);
        NOmemWritters = NOmemWritters.filter((item, i, ar) => ar.indexOf(item) === i);

        let formData = new FormData();
        formData.append("file", file);
        formData.append("info", JSON.stringify(info));
        formData.append('memSingers', JSON.stringify(memSingersIDs));
        formData.append('memComposers', JSON.stringify(memComposersIDs));
        formData.append('memWritters', JSON.stringify(memWrittersIDs));
        formData.append('NOmemSingers', JSON.stringify(NOmemSingers));
        formData.append('NOmemComposers', JSON.stringify(NOmemComposers));
        formData.append('NOmemWritters', JSON.stringify(NOmemWritters));

        // formData.append('delSinger', JSON.stringify(deleteSingersID));
        // formData.append('delComposers', JSON.stringify(deleteComposersID));
        // formData.append('delWritters', JSON.stringify(deleteWritersID));

        // formData.append('info', JSON.stringify(info));

        console.log("here comesssssssss");
        console.log(memSingersIDs);
        console.log(memComposersIDs);
        console.log(memWrittersIDs);
        console.log(NOmemSingers);
        console.log(NOmemComposers);
        console.log(NOmemWritters);


        let options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
      
            body: formData
      
        }

        fetch("http://localhost:8080/OSCA_war_exploded/ChangeSongOwnershipServlet", options)
        .then( res => res.json())
        .then(data =>{
          console.log(data);
          if(data['ok'] == 1){
            popUpFromDown("New song request sent",'greenColour');
            setTimeout(function() {
                window.location.href='M-changeSongOwnership.html';
            },3000);
          }
          else{
            popUpFromDown("Error try again",'red');
            setTimeout(function() {
              loading.classList.add("hideME");
              realpage.classList.remove("hideME");
                window.location.href='../landing_page/login.html';
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

let deleteSingersID = []
let deleteComposersID = []
let deleteWritersID = []

function currentSingers(names){
  for (let i = 0; i < names.length; i++) {
    bothNames = names[i].split(" ");

    for (let j = 0; j < POSTsingersID.length; j++) {
      if (!(POSTsingersFname[j] == bothNames[0] && POSTsingersLname[j] == bothNames[1])) {
        deleteSingersID[i] = POSTsingersID[j];
      }
    }
  }
}

function currentComposers(names){
  for (let i = 0; i < names.length; i++) {
    bothNames = names[i].split(" ");

    for (let j = 0; j < POSTcomposersID.length; j++) {
      if (!(POSTcomposersFname[j] == bothNames[0] && POSTcomposersLname[j] == bothNames[1])) {
        deleteComposersID[i] = POSTcomposersID[j];
        break;
      }
    }
  }
}

function currentWriters(names){
  for (let i = 0; i < names.length; i++) {
    bothNames = names[i].split(" ");

    for (let j = 0; j < POSTwirtersID.length; j++) {
      if (!(POSTwirtersFname[j] == bothNames[0] && POSTwirtersLname[j] == bothNames[1])) {
        deleteWritersID[i] = POSTwirtersID[j];
        break;
      }
    }
  }
}



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
      // console.log(suggestions[j]);
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

  // console.log(ul.childElementCount);
  let nodes = ul.childNodes

  for (let index = 0; index < ul.childElementCount; index++) {

    let name = nodes[index].nextSibling.firstChild.innerHTML;
    if (name == val){
      return 1;
    }
  }
  return 0;
}




























// var sing = document.getElementById('singer');
// var composer = document.getElementById('composer');
// var writer = document.getElementById('writer');

// sing.addEventListener('click', newElement);
// composer.addEventListener('click', newElement);
// writer.addEventListener('click', newElement);


// function newElement2() {

//     var ul = this.nextSibling.nextSibling;
//     var input = this.previousSibling.previousSibling.value;

//     if (input != '') {
//       var li = document.createElement("li");
//       var span = document.createElement("SPAN");
//       var txt = document.createTextNode("\u00D7");
//       var t = document.createElement('h5');
//       t.innerHTML = input

//       li.appendChild(t);
//       ul.appendChild(li);
//       span.setAttribute('id','spanME');


//       span.className = "close";
//       span.appendChild(txt);
//       li.appendChild(span);

//       span.onclick = function(){
//         var  parent = this.parentElement;
//         parent.remove();
//       };
//     } 

//     this.previousSibling.previousSibling.value = "";
//   }

// function makeRed(id){
//   var element = document.getElementById(id);

//   if (element.classList.contains(redCol)){
//       element.classList.remove('redCol');
//   }
//   else{
//       element.classList.add('redCol');
//   }
// }


function take1(is){
  // console.log(is.previousSibling.previousSibling.innerHTML)
  // console.log(is.previousSibling.innerHTML)

  let newUl = document.querySelector(".newUL1");
  let child = newUl.children;
  let numberOfLi = newUl.childElementCount;
  
  let theChild = 0;
  for (let i = 0; i < numberOfLi; i++){
    if(child[i].firstChild.innerHTML == is.previousSibling.innerHTML){
        theChild = i;
        break;
    }
  }

  if (is.parentElement.classList.contains('redCol')){
    is.parentElement.classList.remove('redCol');
    is.parentElement.classList.add('normalCol');
    child[theChild].remove();

    if(newUl.childElementCount == 0){
      document.getElementById('removedPpl1').classList.add("hideTheTopic");
    }

  }
  else{
    // console.log(newUl.childElementCount);
    if(newUl.childElementCount == 0){
      document.getElementById('removedPpl1').classList.remove("hideTheTopic");
    }
    is.parentElement.classList.add('redCol');

    var li = document.createElement("li")
    li.classList.add('normalCol');
    var t = document.createElement('h5');
    t.innerHTML = is.previousSibling.innerHTML;

    li.appendChild(t);
    newUl.appendChild(li);

  }
}



function take2(is){
  // console.log(is.previousSibling.previousSibling.innerHTML)

  let newUl = document.querySelector(".newUL2");
  let child = newUl.children;
  let numberOfLi = newUl.childElementCount;
  
  let theChild = 0;
  for (let i = 0; i < numberOfLi; i++){
    if(child[i].firstChild.innerHTML == is.previousSibling.innerHTML){
        theChild = i;
        break;
    }
  }

  if (is.parentElement.classList.contains('redCol')){
    is.parentElement.classList.remove('redCol');
    is.parentElement.classList.add('normalCol');
    child[theChild].remove();

    if(newUl.childElementCount == 0){
      document.getElementById('removedPpl2').classList.add("hideTheTopic");
    }

  }
  else{
    // console.log(newUl.childElementCount);
    if(newUl.childElementCount == 0){
      document.getElementById('removedPpl2').classList.remove("hideTheTopic");
    }
    is.parentElement.classList.add('redCol');

    var li = document.createElement("li")
    li.classList.add('normalCol');
    var t = document.createElement('h5');
    t.innerHTML = is.previousSibling.innerHTML;

    li.appendChild(t);
    newUl.appendChild(li);

  }
}


function take3(is){
  // console.log(is.previousSibling.previousSibling.innerHTML)

  let newUl = document.querySelector(".newUL3");
  let child = newUl.children;
  let numberOfLi = newUl.childElementCount;
  
  let theChild = 0;
  for (let i = 0; i < numberOfLi; i++){
    if(child[i].firstChild.innerHTML == is.previousSibling.innerHTML){
        theChild = i;
        break;
    }
  }

  if (is.parentElement.classList.contains('redCol')){
    is.parentElement.classList.remove('redCol');
    is.parentElement.classList.add('normalCol');
    child[theChild].remove();

    if(newUl.childElementCount == 0){
      document.getElementById('removedPpl3').classList.add("hideTheTopic");
    }

  }
  else{
    console.log(newUl.childElementCount);
    if(newUl.childElementCount == 0){
      document.getElementById('removedPpl3').classList.remove("hideTheTopic");
    }
    is.parentElement.classList.add('redCol');

    var li = document.createElement("li")
    li.classList.add('normalCol');
    var t = document.createElement('h5');
    t.innerHTML = is.previousSibling.innerHTML;

    li.appendChild(t);
    newUl.appendChild(li);

  }
}