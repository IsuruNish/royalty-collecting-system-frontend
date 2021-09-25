const signup = document.querySelector("#signupBtn");
const login = document.querySelector("#loginBtn");
const containerLogin = document.querySelector(".containerLogin");
const containerSignup = document.querySelector(".visuallyhidden");

signup.addEventListener("click", () => {
    containerLogin.classList.add("visuallyhidden");
    setTimeout(function () {
        containerLogin.classList.add('hidden');
      }, 600);

      setTimeout(function () {
        containerSignup.classList.remove('hidden');
        containerSignup.classList.add("containerSignup");
      }, 800);

      setTimeout(function () {
        containerSignup.classList.remove('visuallyhidden');
      }, 1000);
});


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

    let ut = 0;

    if(filled){
      $.post("http://localhost:8080/OSCA_war_exploded/LoginServlet",
      {
        email:email,
        password:password
      },
      function(data,status){
        alert("Data: " + data + "\nStatus: " + status);
        if(parseInt(data)==1){
          ut = 1;
                    // window.location.href='../super_admin/SA-dashboard.html';
        }
        else if(parseInt(data)==2){
          ut = 2;
          // window.location.href='../admin/A-dashboard';
        }else if(parseInt(data)==3){
          ut = 3;
          // window.location.href='../osca_officail/OO-dashboard';
        }
        else if(parseInt(data)==4){
          ut = 4;
          // window.location.href='../member/M-dashboard';
        }
        else if(parseInt(data)==5){
          ut = 5;
          // window.location.href='../show_organizer/SO-dashboard';
        }
        else {
          ut = -1;
          alert(data);
        }
      });




      $.getJSON('http://localhost:8080/OSCA_war_exploded/LoginServlet',
      {
        email:email,
        password:password
      } 

      ,function(data) {
          Cookies.set('OSCA', data);
          if(ut==1){
            alert("hello");
            alert(data);
            window.location.href='../super_admin/SA-dashboard.html';
          }
          else if(ut==2){
            window.location.href='../admin/A-dashboard';
          }else if(ut==3){
            window.location.href='../osca_officail/OO-dashboard';
          }
          else if(ut==4){
            window.location.href='../member/M-dashboard';
          }
          else if(ut==5){
            window.location.href='../show_organizer/SO-dashboard';
          }
          else {
            alert(data);
          }
    }
    );





      


      
    }
  });
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

  if(validateEmail() == 0){
    window.alert("Your email is invalid!");
  }

  else if(pass != pass2){
    window.alert("Passwords do not match!");
  }

  else{
    $.post("http://localhost:8080/OSCA_war_exploded/signup", {
        fname:fname,
        lname:lname,
        nic:nic,
        email:email,
        phone:phone,
        pw:pass
        }
    );
    
    window.location.href='../show_organizer/SO-dashboard.html';
  }
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

  if(password.match(/[a-z0-9][a-z0-9]+/)){
    s +=1;
  }


  if(password.match(/[A-Z][A-Z]+/)){
    s +=1;
  }

  if(password.match(/[!@#$%^?><*()]+/)){
    s +=1;
  }

  if(password.length>5){
    s +=1;
  }

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



