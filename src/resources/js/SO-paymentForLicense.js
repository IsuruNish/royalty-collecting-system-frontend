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
        uid = data['uid'];
        if(ut!=5){
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
                // window.location.href='../landing_page/login.html';
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
                // document.getElementById("paymentValue").value =  data['totalFee'];
              })
              .catch(err =>{
                popUpFromDown("Login again",'red');
                setTimeout(function() {
                    // window.location.href='../landing_page/login.html';
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
            // window.location.href='../landing_page/login.html';
          },3000);
          console.error(err);
        });
      }
  
    }
  })



  
  // let button2 = document.getElementById("payment");
 
  

  // button2.addEventListener('click', function(){
  //   window.location.href='SO-paymentUI.html?'+uid;
  // })







  // Called when user completed the payment. It can be a successful payment or failure
  payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    //Note: validate the payment and show success or failure page to the customer
};

// Called when user closes the payment without completing
payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
};

// Called when error happens when initializing payment such as invalid parameters
payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:"  + error);
};

// Put the payment variables here
var payment = {
    "sandbox": true,
    "merchant_id": "1218935",    
    "return_url": "https://www.youtube.com/watch?v=dPW5kUKjmR4",     // Important
    "cancel_url": "https://www.youtube.com",
    "notify_url": "http://google.com",
    "order_id": "ItemNo12345",
    "items": "Licenses",
    "amount": "1000.00",
    "currency": "LKR",
    "first_name": "Saman",
    "last_name": "Perera",
    "email": "samanp@gmail.com",
    "phone": "0771234567",
    "address": "No.1, Galle Road",
    "city": "Colombo",
    "country": "Sri Lanka",
    "delivery_address": "No. 46, Galle road, Kalutara South",
    "delivery_city": "Kalutara",
    "delivery_country": "Sri Lanka",
    "custom_1": "",
    "custom_2": ""
};

// Show the payhere.js popup, when "PayHere Pay" is clicked
document.getElementById('payment').onclick = function (e) {
    payhere.startPayment(payment);
};
