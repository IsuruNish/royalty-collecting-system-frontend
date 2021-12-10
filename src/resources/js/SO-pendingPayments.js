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
  
        fetch("http://localhost:8080/OSCA_war_exploded/SOpendingPaymentsServlet", options)
        .then(res => res.json())
        .then((data) => {
            let ut = parseInt(data['ut']);
            if(ut!=5){
                popUpFromDown("Access denied!",'red');
                setTimeout(function() {
                    // window.location.href='../landing_page/login.html';
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


                makeLicenseAppReqArr(data['details']);

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
            //   window.location.href='../landing_page/login.html';
          },5000);
          console.error(err);
        });
    }
  });
  
   
  
 
function makeLicenseAppReqArr(data){
    var ul = document.getElementById('table1').firstChild.nextSibling;

    for (let i = 0; i < data.length; i++) {

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

        DivCol1.setAttribute("data-label", "Concert ID");
        DivCol2.setAttribute("data-label", "Concert Name");
        DivCol3.setAttribute("data-label", "Venue");
        DivCol4.setAttribute("data-label", "Concert Date");
        DivCol5.setAttribute("data-label", "License type");
        DivCol6.setAttribute("data-label", "Fee");
        DivCol7.setAttribute("data-label", "Applied date");
        DivCol8.setAttribute("data-label", "More information");
        DivCol9.setAttribute("data-label", "Payment");

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

        DivCol8.appendChild(DivColTag_i1);
        DivCol9.appendChild(DivColTag_i2);
        
        li.appendChild(DivCol1);
        li.appendChild(DivCol2);
        li.appendChild(DivCol3);
        li.appendChild(DivCol4);
        li.appendChild(DivCol5);
        li.appendChild(DivCol6);
        li.appendChild(DivCol7);
  
        DivCol1.innerHTML = data[i][0];
        DivCol2.innerHTML = data[i][1];
        DivCol3.innerHTML = data[i][2];
        DivCol4.innerHTML = data[i][3];
        DivCol5.innerHTML = data[i][4];
        DivCol6.innerHTML = data[i][5];
        DivCol7.innerHTML = data[i][6];

        if (data[i][4] == "Open") {
            DivCol8.innerHTML = "-"
        }
        else{
            DivCol8.appendChild(DivColTag_i1);
            DivColTag_i1.classList.add("fas");
            DivColTag_i1.classList.add("fa-info-circle");

            DivColTag_i1.onclick = function(){
                window.location.href = "SO-moreDetailsUpcomingEvents.html?"+data[i][0];
            }
        }

        DivCol9.appendChild(DivColTag_i2);
        DivColTag_i2.classList.add("fas");
        DivColTag_i2.classList.add("fa-money-check-alt");

        DivColTag_i2.onclick = function(){
            window.location.href = "SO-paymentForLicense.html?"+data[i][0];
        }
        
        li.appendChild(DivCol8);
        li.appendChild(DivCol9);
        ul.appendChild(li);
    }
}

function findSOid(id){
    for (let i = 0; i < Concert_licenseAppReqIDs.length; i++) {
        if (Concert_licenseAppReqIDs[i] == id) {
            return SO_licenseAppReqIDs[i];
        }
    }
}






