const signup = document.querySelector("#signupBtn");
const login = document.querySelector("#loginBtn");
const containerLogin = document.querySelector(".visuallyhidden");
const containerSignup = document.querySelector(".containerSignup");


// function popUp(text){
//   document.getElementsByClassName("popup")[0].classList.add("active");
//   var list = document.getElementById("notsoLoad");
//   var h3 = document.getElementById("poUptext");
  
//   h3.innerHTML = text;
//   list.classList.add('blur');

//   scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

//   window.onscroll = function() {
//       window.scrollTo(scrollLeft, scrollTop);
//   };
// };
 
// document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
//   document.getElementsByClassName("popup")[0].classList.remove("active");
//   var list = document.getElementById("notsoLoad");
//   list.classList.remove('blur');
//   window.onscroll = function() {};
// });


function popUpFromDown(text) {
  var x = document.getElementById("toast");
  var y = document.getElementById("desc");
  x.className = "show";

  setTimeout(function(){
    y.innerHTML = text;
    }, 500);

  setTimeout(function(){
    y.innerHTML = "";
    }, 4000);

  setTimeout(function(){
     x.className = x.className.replace("show", ""); 
    }, 5000);
}



login.addEventListener("click", () => {
  containerSignup.classList.add("visuallyhidden");
    setTimeout(function () {
      containerSignup.classList.add('hidden');
      }, 600);

      setTimeout(function () {
        containerLogin.classList.remove('hidden');
        containerSignup.classList.remove('containerSignup');
        containerLogin.classList.add("containerLogin");
      }, 800);

      setTimeout(function () {
        containerLogin.classList.remove('visuallyhidden');
      }, 1000);
});


signup.addEventListener("click", () => {
  containerLogin.classList.add("visuallyhidden");
    setTimeout(function () {
      containerLogin.classList.add('hidden');
      }, 600);

      setTimeout(function () {
        containerSignup.classList.remove('hidden');
        containerLogin.classList.remove('containerLogin');
        containerSignup.classList.add("containerSignup");
      }, 800);

      setTimeout(function () {
        containerSignup.classList.remove('visuallyhidden');
      }, 1000);
});



$(document).ready(function(){
  $("#loginButton").click(function(){
    var email = $("#loginEmail").val().trim();;
    var password = $("#loginPass").val().trim();;
    var input = $('.loginInput');
    var filled = true;
    
    for(var i = 0; i < input.length; i++){
      if(validateInputs(input[i]) == false){
        showLoginValidate(input[i], input[i].id);
        filled = false;
      }
    }
    if(validateLoginEmail() == 0){
      // showLoginValidate(input[i], input[i].id);
      filled = false;
    }

    if(filled){  
      let hashpw = sha256(password);
      let payload = {
        "email":email,
        "password":hashpw
      }

      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) 
      }

      fetch("http://localhost:8080/OSCA_war_exploded/LoginServlet", options)
          .then(res => res.json())
          .then(data => {
            ut = data['userType']
            console.log(ut);
            Cookies.set('Authorization', data['token'])
            if(ut==1){
              window.location.href='../super_admin/SA-dashboard.html';
            }
            else if(ut==2){
              window.location.href='../admin/A-dashboard.html';
            }else if(ut==3){
              window.location.href='../osca_officail/OO-dashboard.html';
            }
            else if(ut==4){
              window.location.href='../member/M-dashboard.html';
            }
            else if(ut==5){
              window.location.href='../show_organizer/SO-dashboard.html';
            }
            else {
              // alert("Email or Password is wrong");
              popUpFromDown("Email or Password is wrong")
              // popUp("Email or Password is wrong");
            }
          })
          .catch(err =>{
            // alert("Email or Password is wrong");
            popUpFromDown("Email or Password is wrong")

            // popUp("Email or Password is wrong");
            console.error(err);
          });
          
    };
  })
});




// $('#loginButton').on('click', ()=>{
//   var input = $('.loginInput');
//   var filled = true;

//   for(var i = 0; i < input.length; i++){
//     if(validateInputs(input[i]) == false){
//       showLoginValidate(input[i], input[i].id);
//       filled = false;
//     }
//   }

//   if(filled){
//     loginUser();
//   }

// })


// function loginUser(){
//   var email = $("#loginEmail").val().trim();
//   var password = $("#loginPass").val().trim();

//   $.post("http://localhost:8080/OSCA_war_exploded/LoginServlet", {
//       email:email,
//       pw:password
//       },

//       function(data,status){
//         alert("Data: " + data + "\nStatus: " + status);
//         if(parseInt(data)==1){
//                     window.location.href='../super_admin/SA-dashboard.html';
//                   }
//         else if(parseInt(data)==2){
//           window.location.href='../admin/A-dashboard';
//         }else if(parseInt(data)==3){
//           window.location.href='../osca_officail/OO-dashboard';
//         }
//         else if(parseInt(data)==4){
//           window.location.href='../member/M-dashboard';
//         }
//         else if(parseInt(data)==5){
//           window.location.href='../show_organizer/SO-dashboard';
//         }
//         else {
//           alert(data);
//         }
//       });   
// }



function showLoginValidate (input, id) {
  if($(input).val().trim() == '') {
    var field = document.getElementById(id);
    var text = field.nextElementSibling;

    text.innerHTML = "This field is empty";
    text.style.color = "#ff0000";
  }
}















$('#signupButton').on('click', ()=>{
  var input = $('.signupInput');
  var filled = true;

  for(var i = 0; i < input.length; i++){
    if(validateInputs(input[i]) == false){
      showValidate(input[i], input[i].id);
      filled = false;
    }
  }

  if(filled){
    signupSO();
  }

})






function signupSO(){
  var fname = $("#fname").val().trim();
  var lname = $("#lname").val().trim();
  var nic = $("#nic").val().trim();
  var email = $("#email").val().trim();
  var phone = $("#phone").val().trim();
  var pass = $("#pass").val().trim();
  var pass2 = $("#pass2").val().trim();
  var phoneno1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  var phoneno2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
  var nic1 = /[0-9]{9}v{1}$/i

  var nic2 = /^[0-9]{12}$/
  console.log(nic.match(nic1))
  console.log(nic.match(nic2))

  var num = validatePassword(pass)

  if(fname.length < 4){

    var field = document.getElementById('fname');
    var text = field.nextElementSibling;

    text.innerHTML = "At least 4 letters required";
    text.style.color = "#ff0000";
  }

  else if(lname.length < 4){

    var field = document.getElementById('lname');
    var text = field.nextElementSibling;

    text.innerHTML = "At least 4 letters required";
    text.style.color = "#ff0000";
  }

  else if(validateEmail() == 0){
    // popUp("Your email is invalid!");
    // popUpFromDown("Your email is invalid!")
    var field = document.getElementById('email');
    var text = field.nextElementSibling;

    text.innerHTML = "Your email address is invalid";
    text.style.color = "#ff0000";
  }

  else if(!phone.match(phoneno1) && !phone.match(phoneno2)){
    var field = document.getElementById('phone');
    var text = field.nextElementSibling;

    text.innerHTML = "Invalid phone number";
    text.style.color = "#ff0000";
  }

  else if(!nic.match(nic1) && !nic.match(nic2)){
    var field = document.getElementById('nic');
    var text = field.nextElementSibling;

    text.innerHTML = "Invalid NIC number";
    text.style.color = "#ff0000";
  }

  else if(pass != pass2){
    // popUpFromDown("Passwords do not match!")
    var field = document.getElementById('pass2');
    var text = field.nextElementSibling;

    text.innerHTML = "Passwords do not match!";
    text.style.color = "#ff0000";
    
    // popUp("Passwords do not match!");
  }

  else if(num != 0){
    var field = document.getElementById('pass2');
    var text = field.nextElementSibling;

    if (num == 1) {
      text.innerHTML = "Passwords must contain at least 4 lower case letters";
    }

    else if (num == 2) {
      text.innerHTML = "Passwords must contain at least 1 upper case letter";
    }

    else if (num == 3) {
      text.innerHTML = "Passwords must contain at least 2 digit";
    }

    else if (num == 4) {
      text.innerHTML = "Passwords must be at 1 special character.";
    }

    text.style.color = "#ff0000";
    
    // popUp("Passwords do not match!");
  }

  else{

    let hashpw = sha256(pass);
    let payload = {
      "fname":fname,
      "lname":lname,
      "nic":nic,
      "email":email,
      "phone":phone,
      "password":hashpw
    }
    
    // let token = Cookies.get('Authorization');
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
  
    }

    fetch("http://localhost:8080/OSCA_war_exploded/SignupServlet", options)
    .then(res => res.json())
    .then(data => {
      ut = data['userType']
      Cookies.set('Authorization', 'Bearer '+data['token'])
      console.log(data);
      if(ut==5){
        // alert(ut);
        window.location.href='../show_organizer/SO-dashboard.html';
      }
      else if(ut = -1){
        // popUp("Email already exist");
        popUpFromDown("Email already exist")


      }
      else {
        // popUp("Signup unsuccessful");
        popUpFromDown("Signup unsuccessful")

      }
      
    })
  }
}


function validatePassword(pass) {

  if (pass.match(/[a-z]/g) < 4) {
    return 1    
  }
  else if (pass.match(/[A-Z]/g) < 1) {
    return 2
  }
  else if (pass.match(/[0-9]/g) < 2) {
    return 3
  }
  else if (pass.match(/[@#$%^&*]/g) < 1) {
    return 4
  }

  else{
    return 0;
  }

  // return true;
}


function validateEmail(){
  var email = $("#email").val();
  var text = document.getElementById('formwords');
  var form = document.getElementById('form');

  var pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
  
  if(email.match(pattern)){
    form.classList.add('valid');
    form.classList.remove('invalid');
    text.innerHTML = "";
    text.style.color = "#26b30c";
    return 1;
  }
  else{
    form.classList.remove('valid');
    form.classList.add('invalid');
    text.innerHTML = "Your email address is invalid";
    text.style.color = "#ff0000";
    return 0;
  }

  if(email == ""){
    form.classList.remove('valid');
    form.classList.remove('invalid');
    text.innerHTML = "";
    text.style.color = "#27bf0b";
    return 0;
  }
}



function validateLoginEmail(){
  var email = $("#loginEmail").val();
  var field = document.getElementById('loginEmail');
  // var form = document.getElementById('form');    
  var text = field.nextElementSibling;



  var pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
  
  if(email.match(pattern)){
    text.innerHTML = "";
    text.style.color = "#26b30c";
    return 1;
  }
  else{
    // form.classList.remove('valid');
    // form.classList.add('invalid');
    text.innerHTML = "Your email address is invalid";
    text.style.color = "#ff0000";
    
    return 0;
  }

}



function showValidate (input, id) {
  if($(input).val().trim() == '') {
    var field = document.getElementById(id);
    var text = field.nextElementSibling;

    if($(input).attr('name') == 'lname'){
      text.innerHTML = "Last name is required";
      text.style.color = "#ff0000";
    }

    if($(input).attr('name') == 'fname'){
      text.innerHTML = "First name is required";
      text.style.color = "#ff0000";
    }

    if($(input).attr('name') == 'phone'){
      text.innerHTML = "Phone number is required";
      text.style.color = "#ff0000";
    }

    if($(input).attr('name') == 'nic'){
      text.innerHTML = "NIC is required";
      text.style.color = "#ff0000";
    }

    if($(input).attr('name') == 'email'){
      text.innerHTML = "Email is required";
      text.style.color = "#ff0000";
    }

    // if($(input).attr('name') == 'pass'){
    //   text.innerHTML = "Password is required";
    //   text.style.color = "#ff0000";
    // }

    if($(input).attr('name') == 'pass2' || $(input).attr('name') == 'pass'){
      var field = document.getElementById('pass2');
      var text = field.nextElementSibling;

      text.innerHTML = "Password is required 2 times";
      text.style.color = "#ff0000";
    }
  }
}


function hideValidate (id) {
  var field = document.getElementById(id);
  var text = field.nextElementSibling;

  if(field == document.activeElement) {
    text.innerHTML = "";
    text.style.color = "#ff0000";
  }

  if(id == 'pass'){
    var field = document.getElementById('pass2');
    var text = field.nextElementSibling;
    text.innerHTML = "";
    text.style.color = "#ff0000";
  }
}


function validateInputs(input) {
  if($(input).attr('type') != 'email' | $(input).attr('name') != 'email') {
    if($(input).val().trim() == ''){
        return false;
    }
  }

  if($(input).attr('type') == 'email' | $(input).attr('name') == 'email') {
    if($(input).val().trim() == ''){
        return false;
    }
  }
}


//password bar
var pass = document.getElementById('pass');
pass.addEventListener('keyup',()=>{
  checkPass(pass.value);
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



