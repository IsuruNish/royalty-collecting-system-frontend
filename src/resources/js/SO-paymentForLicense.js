let amountToPAy = 0;
let firstNameSO = "";
let lastNameSO = "";
let emailSO = "";
let phoneSO = "";
let orderIDyes = Math.floor(100000 + Math.random() * 900000);
let idSO = 0;

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
  
        fetch("http://localhost:8080/OSCA_war_exploded/LicensePaymentServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['utype']
        lastNameSO = data['lname'];
        emailSO = data['email'];
        PhoneSO = data['phone'];
        uid = data['uid'];
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

              firstNameSO = data['fname'];
  

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

                console.log("data");
                console.log(data);
                amount.innerHTML =  data['totalFee'];
                amountToPAy = data['totalFee'];
                // document.getElementById("paymentValue").value =  data['totalFee'];
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
                window.location.href='../landing_page/login.html';
            },3000);
            console.error(err);
          });
    }
  });
  
  let uid =0;

  let button = document.getElementById("btn101");
  

  button.addEventListener('click', function(){

    //validate the input
    let filled1 = true;
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
        
        let concertID = document.URL.split("?")[1];
        idSO = document.URL.split("?")[1];
        let concertIDArr = [concertID];
        console.log(concertIDArr);

        let file = document.getElementById('myFile').files[0];
        let formData = new FormData();
        formData.append("file", file);
        formData.append("concertID", JSON.stringify(concertID));
 
        let options = {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
      
            body: formData
      
        }
      
        fetch("http://localhost:8080/OSCA_war_exploded/LicensePaymentServlet", options)
        .then( res => res.json())
        .then(data =>{
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
            window.location.href='../landing_page/login.html';
          },3000);
          console.error(err);
        });
      }
  
    }
  })



function paymentDONE(){
    let id = document.URL.split("?")[1];
    let token = Cookies.get('Authorization');

    let payload = {
      "requestType":2,
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
        if (data['ok'] != 1) {
            popUpFromDown("Error try again",'red');
            window.location.href='SO-dashboard.html';
        }
        else{
          window.location.href='SO-dashboard.html';
          popUpFromDown("Payment successful",'greenColour');
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



document.getElementById('payment').onclick = function (e) {
  payhere.onCompleted = function onCompleted(orderId) {
    paymentDONE()
    console.log(orderId);
  };

  payhere.onDismissed = function onDismissed() {
    popUpFromDown("Payment dismissed",'red');
      console.log(("Payment dismissed"));
  };

  payhere.onError = function onError(error) {
    popUpFromDown("Error try again",'red');
    console.log(("Error"));
  };

  var payment = {
      "sandbox": true,
      "merchant_id": "1219328",
      "return_url": undefined,
      "cancel_url": undefined,
      "notify_url": "http://localhost:8080/OSCA_war_exploded/testServlet",
      "order_id": orderIDyes,
      "items": "License payment",
      "amount": amountToPAy,
      "currency": "LKR",
      "first_name": firstNameSO,
      "last_name": lastNameSO,
      "email": emailSO,
      "phone": phoneSO,
      "address": "-",
      "city": "-",
      "country": "-",
      "delivery_country": "-",
  };

  payhere.startPayment(payment);

};




