window.addEventListener('DOMContentLoaded',()=>{
  const loading = document.getElementById("loader-wrapper");
  const realpage = document.getElementById("notsoLoad");

  loading.classList.remove("hideME");
  realpage.classList.add("hideME");
  if(document.referrer != ""){
    popUpFromDown("Invalid URl", 'red')
    setTimeout(function() {
      window.location.href='../landing_page/login.html';
    },3000);
  }

  else{
    loading.classList.add("hideME");
    realpage.classList.remove("hideME");
  }
})

$('#btn').on('click', ()=>{
  let filled = true;
  let text = document.getElementById("newPassWord");
  let num = validatePassword($("#pass1").val().trim());

  if($("#pass1").val().trim() == '' || $("#pass2").val().trim() == '' ){
    filled =  false;
    text.innerHTML = "Email is required";
    text.style.color = "#ff0000";
  }
  else if($("#pass1").val().trim() != $("#pass2").val().trim()){
    filled =  false;
    text.innerHTML = "Passwords do not match";
    text.style.color = "#ff0000";
  }
  else if(num != 0){
    if (num == 1) {
        text.innerHTML = "Passwords must contain at least 4 lower case letters";
        filled = false;
    }

    else if (num == 2) {
        text.innerHTML = "Passwords must contain at least 1 upper case letter";
        filled = false;
    }

    else if (num == 3) {
        text.innerHTML = "Passwords must contain at least 2 digit";
        filled = false;
    }

    else if (num == 4) {
        text.innerHTML = "Passwords must be at 1 special character.";
        filled = false;
    }

    text.style.color = "#ff0000";
    
    }
      

  if(filled){
    resetPassword();
  }
})






  function resetPassword(){
    const loading = document.getElementById("loader-wrapper");
    const realpage = document.getElementById("notsoLoad");

    loading.classList.remove("hideME");
    realpage.classList.add("hideME");
    const urlSplit = document.URL.split("?=");
  
    var pass1 = $("#pass1").val().trim();
    let hashpw = sha256(pass1);

    let payload = {
      "otp":urlSplit[1],
      "pass":hashpw,
    }
      
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
    }
  
      fetch("http://localhost:8080/OSCA_war_exploded/ResetPasswordServlet", options)
      .then(res => res.json())
      .then(data => {
        ut = data['ok']
        if(ut!=1){
          loading.classList.add("hideME");
          realpage.classList.remove("hideME");
          popUpFromDown("Error try again",'red');
        }
        else {
          popUpFromDown("Password changed",'greenColour');
          setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },3000);

        }
        
      })
      .catch(err=> {
        loading.classList.add("hideME");
        realpage.classList.remove("hideME");
        popUpFromDown("Error try again!",'red');
        console.log(err);
        })
  }




function validatePassword(pass) {

  if (!pass.match(/(.*)?[a-z](.*)?[a-z](.*)?[a-z](.*)?[a-z](.*)?/)) {
      return 1    
    }
    else if (!pass.match(/(.*)?[A-Z](.*)?/)) {
      return 2
    }
    else if (!pass.match(/(.*)?[0-9](.*)?/)) {
      return 3
    }
    else if (!pass.match(/(.*)?[@#$%^&*](.*)?/)) {
      return 4
    }

  else{
    return 0;
  }
}


function hideValidate () {
  var pass1 = document.getElementById("pass1");
  var pass2 = document.getElementById("pass2");
  let text = document.getElementById("newPassWord");


  if(pass1 == document.activeElement || pass2 == document.activeElement) {
    text.innerHTML = "";
    text.style.color = "#ff0000";
  }
}

document.getElementById("pass1").addEventListener('keyup',()=>{
  checkPass(document.getElementById("pass1").value);
})

function checkPass(password){
  var bar = document.getElementById('strength');
  var s = 0;

  if(password.match(/(.+)?[a-z](.+)?[a-z](.+)?[a-z](.+)?[a-z](.+)?/)){
    s +=1;
  }

  if(password.match(/(.+)?[0-9](.+)?[0-9](.+)?/)){
    s +=1;
  }

  if(password.match(/(.+)?[A-Z](.+)?/)){
    s +=1;
  }

  if(password.match(/(.+)?[!@#$%^?><*()](.+)?/)){
    s +=1;
  }

  // if(password.length>5){
  //   s +=1;
  // }

  switch(s){
    case 0:
      bar.value = 0;
      break;

    case 1:
      bar.value = 25;
      bar.classList.add('red');
      bar.classList.remove('yellow');
      bar.classList.remove('orange');
      bar.classList.remove('green');
      break;

    case 2:
      bar.value = 50;
      bar.classList.add('yellow');
      bar.classList.remove('red');
      bar.classList.remove('orange');
      bar.classList.remove('green');
      break;

    case 3:
      bar.value = 75;
      bar.classList.add('orange');
      bar.classList.remove('red');
      bar.classList.remove('yellow');
      bar.classList.remove('green');
      break;

    case 4:
      bar.value = 100;
      bar.classList.add('green');
      bar.classList.remove('yellow');
      bar.classList.remove('orange');
      bar.classList.remove('red');
      break;
  }

}
