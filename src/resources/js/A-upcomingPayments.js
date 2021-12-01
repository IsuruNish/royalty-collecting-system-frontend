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
  
        fetch("http://localhost:8080/OSCA_war_exploded/SAupcomingPaymentServlet", options)
        .then(res => res.json())
        .then((data) => {
            let ut = parseInt(data['ut']);
            if(ut!=2){
                popUpFromDown("Access denied!",'red');
                setTimeout(function() {
                    window.location.href='../landing_page/login.html';
                },1000);
            }
            else{
                const loading = document.getElementById("loader-wrapper");
                const realpage = document.getElementById("notsoLoad");
                
                console.log(data);
                var Topname = document.getElementById('Topname');
                Topname.innerHTML = "Hello "+ data['fname']+",";

                var picSmall = document.getElementById('profilePicSmall');           
                picSmall.src = data['DPpath'];


                makeLicenseAppReqArr(data['license']);
                makeSongReqArr(data['music']);

                loading.classList.remove("hideME");
                realpage.classList.add("hideME");
            
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
  
   
  
 
function makeLicenseAppReqArr(data){
    var ul = document.getElementById('table1').firstChild.nextSibling;

    console.log(data);
    for (let i = 0; i < data.length; i++) {

        var li = document.createElement("li");
        var DivCol1 = document.createElement("div");
        var DivCol2 = document.createElement("div");
        var DivCol3 = document.createElement("div");
        var DivCol4 = document.createElement("div");
        var DivCol5 = document.createElement("div");
        var DivCol6 = document.createElement("div");
        var DivCol7 = document.createElement("div");
        var DivCol1Img = document.createElement("img");
        
        var DivColTag_i1 = document.createElement("i");
        var DivColTag_i2 = document.createElement("i");


        DivCol1Img.src = data[i][5];

        // DivCol1.setAttribute("data-label", "User ID");
        DivCol2.setAttribute("data-label", "User ID");
        DivCol3.setAttribute("data-label", "Full Name");
        DivCol4.setAttribute("data-label", "Type");
        DivCol5.setAttribute("data-label", "Amount");
        DivCol6.setAttribute("data-label", "More information");
        DivCol7.setAttribute("data-label", "Delete");
        DivCol1Img.classList.add("tableImage");

        li.classList.add("table-row");
        DivCol1.classList.add("col");
        DivCol1.classList.add("col-1");
        DivCol2.classList.add("col");
        DivCol2.classList.add("col-2");
        DivCol3.classList.add("col");
        DivCol3.classList.add("col-3");
        DivCol4.classList.add("col");
        DivCol4.classList.add("col-4");
        DivCol5.classList.add("col");
        DivCol5.classList.add("col-5");
        DivCol6.classList.add("col");
        DivCol6.classList.add("col-6");
        DivCol7.classList.add("col");
        DivCol7.classList.add("col-7");

        DivColTag_i1.classList.add("fas");
        DivColTag_i1.classList.add("fa-check-circle");

        DivColTag_i2.classList.add("fas");
        DivColTag_i2.classList.add("fa-info-circle");


        DivCol7.appendChild(DivColTag_i1);
        DivCol6.appendChild(DivColTag_i2);

        DivCol1.appendChild(DivCol1Img);
        li.appendChild(DivCol1);
        li.appendChild(DivCol2);
        li.appendChild(DivCol3);
        li.appendChild(DivCol4);
        li.appendChild(DivCol5);
        li.appendChild(DivCol6);
        li.appendChild(DivCol7);
  
        // DivCol1.innerHTML = data[i][0];
        DivCol2.innerHTML = data[i][0];
        DivCol3.innerHTML = data[i][4];
        DivCol5.innerHTML = data[i][2];

        DivCol4.innerHTML = "License cancellation payment for "+data[i][1]+ " concert";
        
        ul.appendChild(li);

        DivColTag_i2.onclick = function(){
            window.location.href='SA-paymentMoreinfo.html?'+data[i][0]+"?S";
        }

        DivColTag_i1.onclick = function(){
            popUp("Do you want to delete this pending payment ?")
            licenseID = this.parentElement.parentElement.firstChild.innerHTML;

            IDconcert = data[i][3];
            IDuser = data[i][0];
            document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
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
                  "concertID":IDconcert,
                  "userID":IDuser,
                  "typeOfreq":100
              }

              let options = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(payload) 
              }
      
              fetch("http://localhost:8080/OSCA_war_exploded/SAupcomingPaymentServlet", options)
              .then( data => {
                popUpFromDown("Removed", 'greenColour');
                setTimeout(function() {
                  window.location.href='SA-upcomingPayments.html';
              },3000);
              })

              .catch(err =>{
                popUpFromDown("Error try again", 'red');
                setTimeout(function() {
                    window.location.href='SA-upcomingPayments.html';
                },5000);
                console.error(err);
              });
            });
        }
    }
}


 
function makeSongReqArr(data){
    var ul = document.getElementById('table1').firstChild.nextSibling;

    console.log(data);
    for (let i = 0; i < data.length; i++) {

        var li = document.createElement("li");
        var DivCol1 = document.createElement("div");
        var DivCol2 = document.createElement("div");
        var DivCol3 = document.createElement("div");
        var DivCol4 = document.createElement("div");
        var DivCol5 = document.createElement("div");
        var DivCol6 = document.createElement("div");
        var DivCol7 = document.createElement("div");
        var DivCol1Img = document.createElement("img");
        
        var DivColTag_i1 = document.createElement("i");
        var DivColTag_i2 = document.createElement("i");


        DivCol1Img.src = data[i][11];

        // DivCol1.setAttribute("data-label", "User ID");
        DivCol2.setAttribute("data-label", "User ID");
        DivCol3.setAttribute("data-label", "Full Name");
        DivCol4.setAttribute("data-label", "Type");
        DivCol5.setAttribute("data-label", "Amount");
        DivCol6.setAttribute("data-label", "More information");
        DivCol7.setAttribute("data-label", "Delete");
        DivCol1Img.classList.add("tableImage");

        li.classList.add("table-row");
        DivCol1.classList.add("col");
        DivCol1.classList.add("col-1");
        DivCol2.classList.add("col");
        DivCol2.classList.add("col-2");
        DivCol3.classList.add("col");
        DivCol3.classList.add("col-3");
        DivCol4.classList.add("col");
        DivCol4.classList.add("col-4");
        DivCol5.classList.add("col");
        DivCol5.classList.add("col-5");
        DivCol6.classList.add("col");
        DivCol6.classList.add("col-6");
        DivCol7.classList.add("col");
        DivCol7.classList.add("col-7");

        DivColTag_i1.classList.add("fas");
        DivColTag_i1.classList.add("fa-check-circle");

        DivColTag_i2.classList.add("fas");
        DivColTag_i2.classList.add("fa-info-circle");


        DivCol7.appendChild(DivColTag_i1);
        DivCol6.appendChild(DivColTag_i2);

        DivCol1.appendChild(DivCol1Img);
        li.appendChild(DivCol1);
        li.appendChild(DivCol2);
        li.appendChild(DivCol3);
        li.appendChild(DivCol4);
        li.appendChild(DivCol5);
        li.appendChild(DivCol6);
        li.appendChild(DivCol7);
  
        DivCol2.innerHTML = data[i][2];
        DivCol3.innerHTML = data[i][5] + " " +data[i][6];
        DivCol4.innerHTML = "Song royalty payment for "+data[i][10]+ " song";
        DivCol5.innerHTML = data[i][4];
        
        ul.appendChild(li);



        DivColTag_i2.onclick = function(){
            window.location.href='SA-paymentMoreinfo.html?'+data[i][2]+"?M";
        }

        DivColTag_i1.onclick = function(){
            popUp("Do you want to delete this pending payment ?")

            let IDconcert = data[i][1];
            let IDmem = data[i][2];
            let IDsong = data[i][0];

            console.log(IDconcert);
            console.log(IDmem);
            console.log(IDsong);
            document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
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
                  "concertID":IDconcert,
                  "memberID":IDmem,
                  "songID":IDsong,
                  "typeOfreq":200,
              }

              let options = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(payload) 
              }
      
              fetch("http://localhost:8080/OSCA_war_exploded/SAupcomingPaymentServlet", options)
              .then( data => {
                popUpFromDown("Removed", 'greenColour');
                setTimeout(function() {
                  window.location.href='SA-upcomingPayments.html';
              },3000);
              })

              .catch(err =>{
                popUpFromDown("Error try again", 'red');
                setTimeout(function() {
                    window.location.href='SA-upcomingPayments.html';
                },5000);
                console.error(err);
              });
            });
        }
    }
}

  
document.getElementById("denyBTN").addEventListener("click",function(){
    hdiePopUp();
  });