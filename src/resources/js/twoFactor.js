let token = "";

window.addEventListener('DOMContentLoaded',()=>{
    token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
          // alert("cookie undefined")
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
  
      console.log(token);
        fetch("http://localhost:8080/OSCA_war_exploded/TwoFactorAuthServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['userType'];
        console.log(data);
        // Cookies.set('Authorization', undefined)
        if(ut!=1){
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
  
                window.location.href='../landing_page/login.html';
            },3000);
            }  

        else{
            if (data['ok'] != 1) {
                popUpFromDown("Error try again!",'red');
                window.location.href='../landing_page/login.html';
                
            }
          const loading = document.getElementById("loader-wrapper");
          const realpage = document.getElementById("notsoLoad");
          loading.classList.add("hideME");
          realpage.classList.remove("hideME");

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




let redo = document.getElementById('redo');
let buttonPush = document.getElementById('btn');
let home = document.getElementById('home');

home.addEventListener('click',()=>{
    window.location.href='../landing_page/home.html';
});


redo.addEventListener('click',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },3000);
    }
  
    else{
                   
        let payload = {
            "reqType":2
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload) 
        }

  
        fetch("http://localhost:8080/OSCA_war_exploded/TwoFactorAuthServlet", options)
        .then(res => res.json())
        .then((data) => {
        if (data['ok'] != 1) {
            popUpFromDown("Error try again!",'red');
            window.location.href='../landing_page/login.html';
            
        }
            popUpFromDown("Pin sent",'greenColour');

          const loading = document.getElementById("loader-wrapper");
          const realpage = document.getElementById("notsoLoad");
          loading.classList.add("hideME");
          realpage.classList.remove("hideME");

        }   
        )

        .catch(err =>{
            popUpFromDown("Login again",'red');
            setTimeout(function() {
              alert("iinside catch")
  
                window.location.href='../landing_page/login.html';
            },3000);
            console.error(err);
          });
    }
  });



  buttonPush.addEventListener('click',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
          // alert("cookie undefined")
            window.location.href='../landing_page/login.html';
        },3000);
    }
  
    else{

      let inputVal = document.getElementById('SMS');
                   
      if (inputVal.value != ""){
        let payload = {
          "reqType":1,
          "pin": parseInt(inputVal.value)
        }

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload) 
        }


        fetch("http://localhost:8080/OSCA_war_exploded/TwoFactorAuthServlet", options)
        .then(res => res.json())
        .then((data) => {
        if (data['ok'] == 0) {
            popUpFromDown("The pin is incorrect try again!",'red');
            // window.location.href='../landing_page/login.html';
        }
          
        else if(data['ok'] == 1){
          console.log(data);
          popUpFromDown("Pin matched",'greenColour');
          window.location.href='../super_admin/SA-dashboard.html';

          const loading = document.getElementById("loader-wrapper");
          const realpage = document.getElementById("notsoLoad");
          loading.classList.add("hideME");
          realpage.classList.remove("hideME");

        }
    
    }   
    )

      .catch(err =>{
          popUpFromDown("Login again",'red');
          setTimeout(function() {

              window.location.href='../landing_page/login.html';
          },3000);
          console.error(err);
        });
    }
        
    }
  });