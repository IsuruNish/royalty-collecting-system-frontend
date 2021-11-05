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
  

  let button = document.getElementsByClassName("formSubmitBtn");
 
  

  button.addEventListener('click', function(){

    // let filled1 = validateInputFields2();
  
    // if(filled1){
    //   let token = Cookies.get('Authorization');
    //   if(token == undefined){
    //       popUpFromDown("login to continue",'red');
    //       setTimeout(function() {
    //           window.location.href='../landing_page/login.html';
    //       },5000);
    //   }
    //   else{
    //     const loading = document.getElementById("loader-wrapper");
    //     const realpage = document.getElementById("notsoLoad");
      
    //     loading.classList.remove("hideME");
    //     realpage.classList.add("hideME");
        

    //     let year = document.getElementById("input3").value;
    
    //     let info = [song, version, year]
      
    //     let file = document.getElementById('myFile').files[0];
    //     let formData = new FormData();
    //     formData.append("file", file);
 
    //     let options = {
    //         method: 'POST',
    //         headers: {
    //             // 'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
      
    //         body: formData
      
    //     }
      
    //     fetch("http://localhost:8080/OSCA_war_exploded/LicensePaymentServlet", options)
    //     .then( res => res.json())
    //     .then(data =>{
    //       if(data['ok'] == 1){
    //         popUpFromDown("License request sent",'greenColour');
    //         setTimeout(function() {
    //           window.location.href='SO-paymentForLicense.html'+"?"+data['numbers'];
    //         },3000);
    //       }
    //       else{
    //         popUpFromDown("Error try again",'red');
    //         setTimeout(function() {
    //           loading.classList.add("hideME");
    //           realpage.classList.remove("hideME");
    //         },3000);
    //       }
    //     })
    //     .catch(err =>{
    //       popUpFromDown("Error try again",'red');
    //       setTimeout(function() {
    //         loading.classList.add("hideME");
    //         realpage.classList.remove("hideME");
    //         // window.location.href='../landing_page/login.html';
    //       },3000);
    //       console.error(err);
    //     });
    //   }
  
    // }
  })