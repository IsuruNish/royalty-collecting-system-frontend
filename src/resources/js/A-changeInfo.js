let fnameVal = null;
let lnameVal = null;
let emailVal = null;
let phoneVal = null;
let nicVal = null;

window.addEventListener('DOMContentLoaded',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
    }

    else{
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        fetch("http://localhost:8080/OSCA_war_exploded/ChangeInfoServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['utype']
        console.log(data);
        if(ut!=2){
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },5000);
            }
            else{
                const loading = document.getElementById("loader-wrapper");
                const realpage = document.getElementById("notsoLoad");

                var fname = document.getElementById('fname');
                var lname = document.getElementById('lname');
                var nic = document.getElementById('nic');
                var email = document.getElementById('email');
                var phone = document.getElementById('phone');
                var imageCard = document.getElementById('insideImgCard');
                var profilePic = document.getElementById('imageSelect');
                
                var Topname = document.getElementById('Topname');
                var picSmall = document.getElementById('profilePicSmall');

                setTimeout(function() {
                    imageCard.style.backgroundImage = `url(${data['DPpath']})`;
                    picSmall.src = data['DPpath'];
                    fname.value = data['fname'];
                    lname.value = data['lname'];
                    Topname.innerHTML = "Hello "+ data['fname']+",";
                    email.value = data['email'];
                    phone.value = data['phoneNo'];
                    nic.value = data['nic'];

                    fnameVal = fname.value;
                    lnameVal = lname.value;
                    emailVal = email.value;
                    phoneVal = phone.value;
                    nicVal = nic.value;
    
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);

            }
        
        })
        .catch(err =>{
            // alert("Email or Password is wrong");
            popUpFromDown("Login again",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },5000);
            // popUp("Email or Password is wrong");
            console.error(err);
          });
    }
});


$('#imageSelect').change(function () {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
       $('#insideImgCard').css('background-image', 'url("' + reader.result + '")');
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
    }
});



                
var photoChangeBtn = document.getElementById('photoChangeBtn');
var photoDelBtn = document.getElementById('photoDeleteBtn');
var personalInfoBtn = document.getElementById('personalInfo');
var passChangeBtn = document.getElementById('passChangeBtn');


photoChangeBtn.addEventListener('click', function(){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
    }

    let file = document.getElementById('imageSelect').files[0];
    let formData = new FormData();
    formData.append("file", file);
    
    let options = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },

        body: formData

  }
  const loading = document.getElementById("loader-wrapper");
  const realpage = document.getElementById("notsoLoad");
  loading.classList.remove("hideME");
  realpage.classList.add("hideME");

  fetch("http://localhost:8080/OSCA_war_exploded/ChangeInfoServlet", options)
  .then(res => res.json())
  .then(data => {
      
      if(data['userType'] == 2){
        // const loading = document.getElementById("loader-wrapper");
        // const realpage = document.getElementById("notsoLoad");
        // loading.classList.remove("hideME");
        // realpage.classList.add("hideME");
        popUpFromDown("Profile picture changed successfully",'greenColour');
        setTimeout(function() {
            // loading.classList.add("hideME");
            // realpage.classList.remove("hideME");

            // alert("Profile picture deleted successfully");
            window.location.href='A-ChangeInfo.html';
        },3000);
      }
      else{
        popUpFromDown("Error try again",'red');
        loading.classList.add("hideME");
        realpage.classList.remove("hideME");
        //   alert("Current password is incorrect!");
      }
    })

    .catch(err=> {
        loading.classList.add("hideME");
        realpage.classList.remove("hideME");
        // alert("Details invalid try again!");
        popUpFromDown("Select a picture!",'red');
        console.log(err);
        })

})


photoDelBtn.addEventListener('click', function(){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
    }

    let payload = {
        "reqNo" : 1
    }
    
    let options = {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
  }

  fetch("http://localhost:8080/OSCA_war_exploded/ChangeInfoServlet", options)
  .then(res => res.json())
  .then(data => {
      
      if(data['userType'] == 2){
        const loading = document.getElementById("loader-wrapper");
        const realpage = document.getElementById("notsoLoad");
        loading.classList.remove("hideME");
        realpage.classList.add("hideME");
        popUpFromDown("Profile picture deleted successfully",'greenColour');

        setTimeout(function() {
            // alert("Profile picture deleted successfully");
            // loading.classList.add("hideME");
            // realpage.classList.remove("hideME");
            window.location.href='A-ChangeInfo.html';
        },3000);
      }
      else{
        popUpFromDown("Error try again!",'red');

        //   alert("Request unsuccessful try again!");
      }
    })
    .catch(err=> {
        loading.classList.add("hideME");
        realpage.classList.remove("hideME");
        // alert("Details invalid try again!");
        popUpFromDown("Error try again!",'red');
        console.log(err);
        })
  })






personalInfoBtn.addEventListener('click', function(){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
    }

    // var fname = document.getElementById('fname').value;
    // var lname = document.getElementById('lname').value;
    // var nic = document.getElementById('nic').value;
    // var email = document.getElementById('email').value;
    // var phoneNo = document.getElementById('phone').value;

    var fname = $("#fname").val().trim();
    var lname = $("#lname").val().trim();
    var nic = $("#nic").val().trim();
    var email = $("#email").val().trim();
    var phoneNo = $("#phone").val().trim();

    let filled = true;
    if (fnameVal != fname) {
        if(fname.length < 4){

            var field = document.getElementById('fname');
            var text = field.nextElementSibling;
        
            text.innerHTML = "At least 4 letters required";
            text.style.color = "#fa1a0a";
            filled = false;
          }

        else if(fname.match(/(.+)?[0-9](.+)?/)){

            var field = document.getElementById('fname');
            var text = field.nextElementSibling;
        
            text.innerHTML = "Numbersd aren't allowed";
            text.style.color = "#fa1a0a";
            filled = false;
          }
    }

    if (lnameVal != lname) {
        if(lname.length < 4){

            var field = document.getElementById('lname');
            var text = field.nextElementSibling;
        
            text.innerHTML = "At least 4 letters required";
            text.style.color = "#fa1a0a";
            filled = false;
          }

        else if(lname.match(/(.+)?[0-9](.+)?/)){

            var field = document.getElementById('lname');
            var text = field.nextElementSibling;
        
            text.innerHTML = "Numbersd aren't allowed";
            text.style.color = "#fa1a0a";
            filled = false;
          }
    }



    if (nicVal != nic) {
        var nic1 = /[0-9]{9}v{1}$/i
        var nic2 = /^[0-9]{12}$/

        if(!nic.match(nic1) && !nic.match(nic2)){
            var field = document.getElementById('nic');
            var text = field.nextElementSibling;
        
            text.innerHTML = "Invalid NIC number";
            text.style.color = "#fa1a0a";
            filled = false;
          }
    }

    if (emailVal != email) {
        if(validateEmail() == 0){
            var field = document.getElementById('email');
            var text = field.nextElementSibling;
        
            text.innerHTML = "Your email address is invalid";
            text.style.color = "#fa1a0a";
            filled = false;
          }
    }

    if (phoneVal != phoneNo) {
        var phoneno1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        var phoneno2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if(!phoneNo.match(phoneno1) && !phoneNo.match(phoneno2)){
            var field = document.getElementById('phone');
            var text = field.nextElementSibling;
        
            text.innerHTML = "Invalid phone number";
            text.style.color = "#fa1a0a";
            filled = false;
          }
    }

    var emailFlag = 0;
    if (emailVal != email) {
        emailFlag = 1;
    }

    if(filled){
        let payload = {
            "reqNo" : 2,
            "fname":fname,
            "lname":lname,
            "nic":nic,
            "email":email,
            "phoneNo":phoneNo,
            "emailFlag":emailFlag
        }
        
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify(payload) 

    }

    fetch("http://localhost:8080/OSCA_war_exploded/ChangeInfoServlet", options)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data['utype'] == 2){
            document.getElementById('fname').value = data['fname'];
            document.getElementById('lname').value = data['lname'];
            document.getElementById('nic').value = data['nic'];
            document.getElementById('email').value = data['email'];
            document.getElementById('phone').value = data['phoneNo'];

            fnameVal = data['fname'];
            lnameVal = data['lname'];
            emailVal = data['email'];
            nicVal = data['nic'];
            phoneVal = data['phoneNo'];
            makeTextBoxDefault();
            // alert("Details updated!");
            popUpFromDown("Details updated!",'greenColour');
            // setTimeout(function() {
            //     window.location.href='SA-ChangeInfo.html';
            // },5000);
            
        }

        else{
            popUpFromDown("Error try again!",'red');

            //   alert("Invalid details!");
        }
        })

    .catch(err=> {
        // alert("Details invalid try again!");
        popUpFromDown("Details invalid try again!",'red');
        console.log(err);
        })
    }
})





passChangeBtn.addEventListener('click', function(){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
    }
    
    var pass = $("#oldpass").val().trim();
    var pass1 = $("#newpass1").val().trim();
    var pass2 = $("#newpass2").val().trim();

    var input = $('.passInput');
    var filled = true;
    
    for(var i = 0; i < input.length; i++){
      if(validateInputs(input[i]) == false){
        showLoginValidate(input[i], input[i].id);
        filled = false;
      }
    }

    num = validatePassword(pass1);

    if(pass1 != pass2){
        // popUpFromDown("Passwords do not match!")
        var field = document.getElementById('newpass2');
        var text = field.nextElementSibling;
    
        text.innerHTML = "Passwords do not match!";
        text.style.color = "#ff0000";
        filled = false;
        
        // popUp("Passwords do not match!");
    }
    
    else if(num != 0){
    var field = document.getElementById('newpass2');
    var text = field.nextElementSibling;

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

        let hashpw1 = sha256(pass);
        let hashpw2 = sha256(pass1);
        let payload = {
            "reqNo" : 3,
            "pass":hashpw1,
            "newPass":hashpw2
        }
        
        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify(payload) 

        }

        fetch("http://localhost:8080/OSCA_war_exploded/ChangeInfoServlet", options)
        .then(res => res.json())
        .then(data => {
            
            if(data['userType'] == 2){
                // alert("Details updated!");
                
                popUpFromDown("Details updated!",'greenColour');
                document.getElementById('oldpass').value = "";
                document.getElementById('newpass1').value = "";
                document.getElementById('newpass2').value = "";
                document.getElementById('strength').value = 0;
                // setTimeout(function() {
                //     window.location.href='SA-ChangeInfo.html';
                // },5000);
            }

            else{
                // alert("Current password is incorrect!");
                popUpFromDown("Current password is incorrect!",'red');
            }
            
        })

        .catch(err=> {
            // alert("Details invalid try again!");
            popUpFromDown("Details invalid try again!",'red');
            console.log(err);
        })
    }
})

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
  
    // return true;
  }


function validateInputs(input) {  
    if($(input).val().trim() == ''){
        return false;
    } 
}


function showLoginValidate (input, id) {
    if($(input).val().trim() == '') {
      var field = document.getElementById(id);
      var text = field.nextElementSibling;
  
      text.innerHTML = "This field is empty";
      text.style.color = "#ff0000";
    }
  }

  function hideValidate (id) {
    var field = document.getElementById(id);
    var text = field.nextElementSibling;
  
    if(field == document.activeElement) {
      text.innerHTML = "";
      text.style.color = "#ff0000";
    }
  
    // if(id == 'pass'){
    //   var field = document.getElementById('pass2');
    //   var text = field.nextElementSibling;
    //   text.innerHTML = "";
    //   text.style.color = "#ff0000";
    // }
  }


function makeTextBoxDefault(){
    document.getElementById('fname').classList.remove('greenBorder');
    document.getElementById('fname').classList.add('NoBorder');

    document.getElementById('lname').classList.remove('greenBorder');
    document.getElementById('lname').classList.add('NoBorder');

    document.getElementById('nic').classList.remove('greenBorder');
    document.getElementById('nic').classList.add('NoBorder');

    document.getElementById('email').classList.remove('greenBorder');
    document.getElementById('email').classList.add('NoBorder');

    document.getElementById('phone').classList.remove('greenBorder');
    document.getElementById('phone').classList.add('NoBorder');
}







  

const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const nic = document.getElementById('nic');


fname.addEventListener('focusout', function(){
    if(fnameVal !=  fname.value.trim()) {
        fname.classList.add('greenBorder');
        fname.classList.remove('NoBorder');
    }
    else{
        fname.classList.remove('greenBorder');
        fname.classList.add('NoBorder');
    }
})

phone.addEventListener('focusout', function(){
    if(phoneVal !=  phone.value.trim()) {
        phone.classList.add('greenBorder');
        phone.classList.remove('NoBorder');
    }
    else{
        phone.classList.remove('greenBorder');
        phone.classList.add('NoBorder');
    }
})

lname.addEventListener('focusout', function(){
    if(lnameVal !=  lname.value.trim()) {
        lname.classList.add('greenBorder');
        lname.classList.remove('NoBorder');
    }
    else{
        lname.classList.remove('greenBorder');
        lname.classList.add('NoBorder');
    }
})

email.addEventListener('focusout', function(){
    if(emailVal !=  email.value.trim()) {
        email.classList.add('greenBorder');
        email.classList.remove('NoBorder');
    }
    else{
        email.classList.remove('greenBorder');
        email.classList.add('NoBorder');
    }
})

nic.addEventListener('focusout', function(){
    if(nicVal !=  nic.value.trim()) {
        nic.classList.add('greenBorder');
        nic.classList.remove('NoBorder');
    }
    else{
        nic.classList.remove('greenBorder');
        nic.classList.add('NoBorder');
    }
})



// var passButton = document.getElementById('passChangeBtn');
// passButton.addEventListener('click',()=>{


// }) 





var passInput = document.getElementById('newpass1');
passInput.addEventListener('keyup',()=>{
  checkPass(passInput.value);
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



// $('#personalInfo').on('click', ()=>{
//     var input = $('.NoBorder');
//     var filled = true;

//     var fname = $("#fname").val().trim();
//     var lname = $("#lname").val().trim();
//     var nic = $("#nic").val().trim();
//     var email = $("#email").val().trim();
//     var phone = $("#phone").val().trim();


//     if (fnameVal != fname) {
//         if(fname.length < 4){

//             var field = document.getElementById('fname');
//             var text = field.nextElementSibling;
        
//             text.innerHTML = "At least 4 letters required";
//             text.style.color = "#ff0000";
//           }

//         else if(fname.match(/(.+)?[0-9](.+)?/)){

//             var field = document.getElementById('fname');
//             var text = field.nextElementSibling;
        
//             text.innerHTML = "Numbersd aren't allowed";
//             text.style.color = "#ff0000";
//           }
//     }

//     if (lnameVal != lname) {
//         if(lname.length < 4){

//             var field = document.getElementById('lname');
//             var text = field.nextElementSibling;
        
//             text.innerHTML = "At least 4 letters required";
//             text.style.color = "#ff0000";
//           }

//         else if(lname.match(/(.+)?[0-9](.+)?/)){

//             var field = document.getElementById('lname');
//             var text = field.nextElementSibling;
        
//             text.innerHTML = "Numbersd aren't allowed";
//             text.style.color = "#ff0000";
//           }
//     }



//     if (nicVal != nic) {
//         var nic1 = /[0-9]{9}v{1}$/i
//         if(!nic.match(nic1) && !nic.match(nic2)){
//             var field = document.getElementById('nic');
//             var text = field.nextElementSibling;
        
//             text.innerHTML = "Invalid NIC number";
//             text.style.color = "#ff0000";
//           }
//     }

//     if (emailVal != email) {
//         if(validateEmail() == 0){
//             var field = document.getElementById('email');
//             var text = field.nextElementSibling;
        
//             text.innerHTML = "Your email address is invalid";
//             text.style.color = "#ff0000";
//           }
//     }

//     if (phoneVal != phone) {
//         var phoneno1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
//         var phoneno2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
//         if(!phone.match(phoneno1) && !phone.match(phoneno2)){
//             var field = document.getElementById('phone');
//             var text = field.nextElementSibling;
        
//             text.innerHTML = "Invalid phone number";
//             text.style.color = "#ff0000";
//           }
//     }
// })

function validateEmail(){
    var email = $("#email").val();
    var field = document.getElementById('email');
    var text = field.nextElementSibling;

    // var text = document.getElementById('formwords');
    // var form = document.getElementById('form');
  
    var pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    
    if(email.match(pattern)){
    //   form.classList.add('valid');
    //   form.classList.remove('invalid');
      text.innerHTML = "";
      text.style.color = "#26b30c";
      return 1;
    }
    else{
    //   form.classList.remove('valid');
    //   form.classList.add('invalid');
      text.innerHTML = "Your email address is invalid";
      text.style.color = "#ff0000";
      return 0;
    }
}

function hideValidate (id) {
    var field = document.getElementById(id);
    var text = field.nextElementSibling;
  
    if(field == document.activeElement) {
      text.innerHTML = "";
      text.style.color = "#ff0000";
    }
  
    // if(id == 'pass'){
    //   var field = document.getElementById('pass2');
    //   var text = field.nextElementSibling;
    //   text.innerHTML = "";
    //   text.style.color = "#ff0000";
    // }
  }
// lnameBtn.addEventListener('click', ()=>{
//     lname.disabled = !lname.disabled

//     if(!lname.disabled){
//         lnameBtn.style = "background-color: red; color: white;";
//         lnameBtn.innerHTML = "Done";

//     }

//     else{
//         lnameBtn.style = "background-color: rgb(1, 201, 201); color: black;";
//         lnameBtn.innerHTML = "Change";
//     }
// })


// emailBtn.addEventListener('click', ()=>{
//     email.disabled = !email.disabled

//     if(!email.disabled){
//         emailBtn.style = "background-color: red; color: white;";
//         emailBtn.innerHTML = "Done";
//     }

//     else{
//         emailBtn.style = "background-color: rgb(1, 201, 201); color: black;";
//         emailBtn.innerHTML = "Change";
//     }
// })


// phoneBtn.addEventListener('click', ()=>{
//     phone.disabled = !phone.disabled

//     if(!phone.disabled){
//         phoneBtn.style = "background-color: red; color: white;";
//         phoneBtn.innerHTML = "Done";
//     }

//     else{
//         phoneBtn.style = "background-color: rgb(1, 201, 201); color: black;";
//         phoneBtn.innerHTML = "Change";
//     }
// })


// nicBtn.addEventListener('click', ()=>{
//     nic.disabled = !nic.disabled

//     if(!nic.disabled){
//         nicBtn.style = "background-color: red; color: white;";
//         nicBtn.innerHTML = "Done";
//     }

//     else{
//         nicBtn.style = "background-color: rgb(1, 201, 201); color: black;";
//         nicBtn.innerHTML = "Change";
//     }
// })


