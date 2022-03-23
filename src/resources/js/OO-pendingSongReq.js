window.addEventListener('DOMContentLoaded',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
      popUpFromDown("login to continue",'red')
        window.location.href='../landing_page/login.html';
    }
  
    else{
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
        }
  
        fetch("http://localhost:8080/OSCA_war_exploded/PendingSongReqServlet", options)
        .then(res => res.json())
        .then((data) => {
  
            console.log("data");
            console.log(data);
            let ut = 0;
            ut = data['ut'];
  
            if(ut!=3){
                popUpFromDown("Access denied!",'red');
                setTimeout(function() {
                    window.location.href='../landing_page/login.html';
                },1000);
            }
            else{
                const loading = document.getElementById("loader-wrapper");
                const realpage = document.getElementById("notsoLoad");
                
                var Topname = document.getElementById('Topname');
                var picSmall = document.getElementById('profilePicSmall');           
  
                Topname.innerHTML = "Hello "+ data['fname']+",";
                picSmall.src = data['DPpath'];
  
  
                makeSongArr(data['songs']);
                    
                setTimeout(function() {
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);
  
                }
           
  
        })
        .catch(err =>{
          popUpFromDown("Login again",'red');
          setTimeout(function() {
              window.location.href='../landing_page/login.html';
          },5000);
          console.error(err);
        });
    }
  });
  
   
  let realSongID = []
  let REALtempSongID = []
  
  
  function makeSongArr(data){
    var ul = document.getElementById('ul');
  
    for (let i = 0; i < data.length; i++) {
      realSongID.push(data[i][1]);
      REALtempSongID.push(data[i][0]);
  
        var li = document.createElement("li");
        var DivCol1 = document.createElement("div");
        var DivCol2 = document.createElement("div");
        var DivCol3 = document.createElement("div");
        var DivCol4 = document.createElement("div");
        var DivCol6 = document.createElement("div");
        var DivCol7 = document.createElement("div");
        var DivCol8 = document.createElement("div");
        
        var DivColTag_i1 = document.createElement("i"); 
        var DivColTag_i2 = document.createElement("i"); 
  
        DivCol1.setAttribute("data-label", "Song ID");
        DivCol2.setAttribute("data-label", "Song Name");
        DivCol3.setAttribute("data-label", "Song Version");
        DivCol4.setAttribute("data-label", "Published Year");
        DivCol6.setAttribute("data-label", "Request Type");
        DivCol7.setAttribute("data-label", "More Details");
        DivCol8.setAttribute("data-label", "Cancel Request");
  
        DivCol7.setAttribute("id", "moreInfo");
        DivCol8.setAttribute("id", "delInfo");
  
        li.classList.add("table-row");
        DivCol1.classList.add("col");
        DivCol1.classList.add("col-1");
        DivCol1.classList.add("col");
        DivCol1.classList.add("col-1");
        DivCol2.classList.add("col");
        DivCol2.classList.add("col-2");
        DivCol3.classList.add("col");
        DivCol3.classList.add("col-3");
        DivCol4.classList.add("col");
        DivCol4.classList.add("col-4");
        DivCol6.classList.add("col");
        DivCol6.classList.add("col-6");
        DivCol7.classList.add("col");
        DivCol7.classList.add("col-7");
        DivCol8.classList.add("col");
        DivCol8.classList.add("col-8");

  
        DivColTag_i1.classList.add("fas");
        DivColTag_i1.classList.add("fa-info-circle");
        DivColTag_i2.classList.add("fas");
        DivColTag_i2.classList.add("fa-trash");
  
        DivCol7.appendChild(DivColTag_i1);
        DivCol8.appendChild(DivColTag_i2);
        
        li.appendChild(DivCol1);
        li.appendChild(DivCol2);
        li.appendChild(DivCol3);
        li.appendChild(DivCol4);
        li.appendChild(DivCol6);
        li.appendChild(DivCol7);
        li.appendChild(DivCol8);

  
        DivCol1.innerHTML = data[i][0];
        DivCol2.innerHTML = data[i][1];
        DivCol3.innerHTML = data[i][2];
        DivCol4.innerHTML = data[i][3];

        if (data[i][4] == 1){
            DivCol6.innerHTML = "Song registration";
        }
        else if (data[i][4] == 2){
            DivCol6.innerHTML = "Song ownership change";
        }
        else if (data[i][4] == 3){
            DivCol6.innerHTML = "Song deletetion";
        }
        
        ul.appendChild(li);
  

        DivColTag_i1.onclick = function(){
          songID = this.parentElement.parentElement.firstChild.innerHTML;
  
          const loading = document.getElementById("loader-wrapper");
          const realpage = document.getElementById("notsoLoad");
          loading.classList.remove("hideME");
          realpage.classList.add("hideME");

          window.location.href='pendingRequestMoreDetails.html?'+songID ;
        }
        


        DivColTag_i2.onclick = function(){
            popUp("Do you want to request to delete this song ?")
            songID = this.parentElement.parentElement.firstChild.innerHTML;
            songName = this.parentElement.parentElement.firstChild.nextElementSibling.innerHTML;
            version = this.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.innerHTML;
            publishedYear = this.parentElement.parentElement.firstChild.nextElementSibling.nextElementSibling.nextElementSibling.innerHTML;
  
            document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
              console.log(songID);
              console.log(songName);
              console.log(version);
              console.log(publishedYear);
              
              hdiePopUp();
              const loading = document.getElementById("loader-wrapper");
              const realpage = document.getElementById("notsoLoad");
              loading.classList.remove("hideME");
              realpage.classList.add("hideME");
              let token = Cookies.get('Authorization');
              if(token == undefined){
                  popUpFromDown("login to continue",'red');
                  window.location.href='../landing_page/login.html';
              }
              
              let payload = {
                  "songID":songID,
                  "songName":songName,
                  "version":version,
                  "publishedYear":publishedYear,
                  "reqType": 200
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
              .then( res => res.json())
              .then(data =>{
  
                console.log(data);
  
                popUpFromDown("License application accepted", 'greenColour');
                setTimeout(function() {
                  window.location.href='M-changeSongOwnership.html';
              },3000);
              })
  
  
              .catch(err =>{
                popUpFromDown("Error try again", 'red');
                setTimeout(function() {
                    window.location.href='M-changeSongOwnership.html';
                },5000);
                console.error(err);
              });
            });
        }
      }
    }
  
         
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#ul li").not(":eq(0)").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });  

  document.getElementById("denyBTN").addEventListener("click",function(){
    hdiePopUp();
  });
  