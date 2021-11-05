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
  
        fetch("http://localhost:8080/OSCA_war_exploded/LicensePaymentServlet", options)
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
  

              let id = document.URL.split("?")[1];
              let payload = {
                "requestType":3,
                "concertID":id
            }
                
            let options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload) 
            }

              fetch("http://localhost:8080/OSCA_war_exploded/LicensePaymentServlet", options)
              .then(res => res.json())
              .then((data) => {
                let amount = document.getElementById("amount");

                amount.innerHTML =  data['totalFee'];
              })
              .catch(err =>{
                popUpFromDown("Login again",'red');
                setTimeout(function() {
                    window.location.href='../landing_page/login.html';
                },3000);
                console.error(err);
              });


              
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
  