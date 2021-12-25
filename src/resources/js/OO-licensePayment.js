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
  
        fetch("http://localhost:8080/OSCA_war_exploded/OOlicensePaymentServlet", options)
        .then(res => res.json())
        .then((data) => {
  
            console.log(data);
            ut = 0;
                try{
                    ut = parseInt(data['info'][1]);
                }
                catch{
                    popUpFromDown("Access denied!",'red');
                    setTimeout(function() {
                        window.location.href='../landing_page/login.html';
                    },1000);
                }

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
                    Topname.innerHTML = "Hello "+ data['info'][0]+",";
 
                    var picSmall = document.getElementById('profilePicSmall');           
                    picSmall.src = data['info'][3];
  
                    makeLicenseAppReqArr(data['licenseAppReqs']);

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
  
  
  document.getElementById("denyBTN").addEventListener("click",function(){
    hdiePopUp();
  });
    
  
  
  
  
let Concert_licenseAppReqIDs = []
let SO_licenseAppReqIDs = []

function makeLicenseAppReqArr(data){
    var ul = document.getElementById('table1').firstChild.nextSibling;

    for (let i = 0; i < data.length; i++) {
        Concert_licenseAppReqIDs.push(data[i][0]);
        SO_licenseAppReqIDs.push(data[i][8]);

        var li = document.createElement("li");
        var DivCol1 = document.createElement("div");
        var DivCol2 = document.createElement("div");
        var DivCol3 = document.createElement("div");
        var DivCol4 = document.createElement("div");
        var DivCol5 = document.createElement("div");
        var DivCol6 = document.createElement("div");
        var DivCol7 = document.createElement("div");
        var DivCol8 = document.createElement("div");
        var DivCol9 = document.createElement("div");
        
        var DivColTag_i1 = document.createElement("i");
        var DivColTag_i2 = document.createElement("i");
        var DivColTag_i3 = document.createElement("i");


        DivCol1.setAttribute("data-label", "License ID");
        DivCol2.setAttribute("data-label", "Concert Name");
        DivCol3.setAttribute("data-label", "Show Organizer");
        DivCol4.setAttribute("data-label", "Concert Date");
        DivCol5.setAttribute("data-label", "Venue");
        DivCol6.setAttribute("data-label", "License Type");

        DivCol7.setAttribute("data-label", "Payment slip");
        DivCol8.setAttribute("data-label", "Accept");
        DivCol9.setAttribute("data-label", "Reject");

        DivCol7.setAttribute("id", "Payment Slip");
        DivCol8.setAttribute("id", "Accept");
        DivCol9.setAttribute("id", "Reject");

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
        DivCol8.classList.add("col");
        DivCol8.classList.add("col-8");
        DivCol9.classList.add("col");
        DivCol9.classList.add("col-9");

        // if (flag == true){
        //     DivColTag_i1.classList.add("fas");
        //     DivColTag_i1.classList.add("fa-money-check-alt");
        // }

        DivColTag_i1.classList.add("fas");
        DivColTag_i1.classList.add("fa-money-check-alt");
        DivColTag_i2.classList.add("fas");
        DivColTag_i2.classList.add("fa-check-circle");
        DivColTag_i3.classList.add("fas");
        DivColTag_i3.classList.add("fa-times-circle");

        DivCol8.appendChild(DivColTag_i2);
        DivCol9.appendChild(DivColTag_i3);
        
        li.appendChild(DivCol1);
        li.appendChild(DivCol2);
        li.appendChild(DivCol3);
        li.appendChild(DivCol4);
        li.appendChild(DivCol5);
  

        DivCol1.innerHTML = data[i][0];
        DivCol2.innerHTML = data[i][1];
        DivCol3.innerHTML = data[i][2] + " " + data[i][3];
        DivCol4.innerHTML = data[i][4];
        DivCol5.innerHTML = data[i][6];
        DivCol6.innerHTML = data[i][5];

        DivColTag_i1.onclick = function(){
            window.location.href = data[i][7];
        }
        
        DivCol7.appendChild(DivColTag_i1);
        li.appendChild(DivCol6);
        li.appendChild(DivCol7);
        li.appendChild(DivCol8);
        li.appendChild(DivCol9);
        ul.appendChild(li);


        let nameOfConcert = data[i][1];
        DivColTag_i2.onclick = function(){
            popUp("Do you want to accept the payment?")
            licenseID = this.parentElement.parentElement.firstChild.innerHTML;

            document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
                console.log("1");
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
              
              let showOrganizerID = findSOid(licenseID);
              let payload = {
                  "licenseID":licenseID,
                  "reqType":1,
                  "showOrganizerID":showOrganizerID,
                  "concertName":nameOfConcert

              }

              let options = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(payload) 
              }
      
              fetch("http://localhost:8080/OSCA_war_exploded/OOlicensePaymentServlet", options)
              .then( data => {
                popUpFromDown("License payment accepted", 'greenColour');
                setTimeout(function() {
                  window.location.href='OO-licensePayment.html';
              },3000);
              })

              .catch(err =>{
                popUpFromDown("Error try again", 'red');
                setTimeout(function() {
                    window.location.href='OO-licensePayment.html';
                },5000);
                console.error(err);
              });
            });
        }

        
        DivColTag_i3.onclick = function(){
            popUp("Do you want to reject the payment?")
            licenseID = this.parentElement.parentElement.firstChild.innerHTML;

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
              
              let showOrganizerID = findSOid(licenseID);
              let payload = {
                  "licenseID":licenseID,
                  "reqType":2,
                  "showOrganizerID":showOrganizerID,
                  "concertName":nameOfConcert

              }

              let options = {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                  },
                  body: JSON.stringify(payload) 
              }
      
              fetch("http://localhost:8080/OSCA_war_exploded/OOlicensePaymentServlet", options)
              .then( data => {
                popUpFromDown("License payment rejected", 'greenColour');
                setTimeout(function() {
                  window.location.href='OO-licensePayment.html';
              },3000);
              })

              .catch(err =>{
                popUpFromDown("Error try again", 'red');
                setTimeout(function() {
                    window.location.href='OO-licensePayment.html';
                },5000);
                console.error(err);
              });
            });
        }
    }
}


function findSOid(id){
    for (let i = 0; i < Concert_licenseAppReqIDs.length; i++) {
        if (Concert_licenseAppReqIDs[i] == id) {
            return SO_licenseAppReqIDs[i];
        }
    }
}




