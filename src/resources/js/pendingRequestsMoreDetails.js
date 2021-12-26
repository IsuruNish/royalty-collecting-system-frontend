let POSTsingersID = [];
let POSTsingersFname = [];
let POSTsingersLname = [];
let POSTcomposersID = [];
let POSTcomposersFname = [];
let POSTcomposersLname = [];
let POSTwirtersID = [];
let POSTwirtersFname = [];
let POSTwirtersLname = [];

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
  
              fetch("http://localhost:8080/OSCA_war_exploded/PendingSongReqServlet", options)
              .then(res => res.json())
              .then((data) => {
                console.log(data);
                console.log("data");
  
                let songname = document.getElementsByClassName("input1");
                let version = document.getElementsByClassName("input2");
                let year = document.getElementsByClassName("input3");
                
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
                    window.location.href='M-changeSongOwnership.html?'+id;
                },3000);
                console.error(err);
              });
            }        
        })
        .catch(err =>{
            popUpFromDown("Login again",'red');
            setTimeout(function() {
                window.location.href='M-changeSongOwnership.html?'+id;;
            },3000);
            console.error(err);
          });
    }
  });
  
  

  function POSTelement(fnames, lnames, className) {
    
    let ul = document.getElementsByClassName(className)[0];
  
    if (fnames.length == 0){
      console.log();
      document.getElementsByClassName(className)[0].previousSibling.previousSibling.setAttribute('class','hideME');
      
    }
      for (let i = 0; i < fnames.length; i++) {
        var li = document.createElement("li");
        var t = document.createElement("h5");
        t.innerHTML = fnames[i]+ " "+ lnames[i];
  
        li.appendChild(t);
        ul.appendChild(li);
        li.setAttribute('class','normalCol');
      }
  }