window.addEventListener('DOMContentLoaded',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
        alert("login to continue")
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

        fetch("http://localhost:8080/OSCA_war_exploded/ChangeInfoServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['utype']
        console.log(data);
        if(ut!=1){
            alert("Access denied!");
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },1000);
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
                  
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);

            }
        
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
        alert("login to continue")
        window.location.href='../landing_page/login.html';
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

  fetch("http://localhost:8080/OSCA_war_exploded/ChangeInfoServlet", options)
  .then(res => res.json())
  .then(data => {
      
      if(data['userType'] == 1){
        const loading = document.getElementById("loader-wrapper");
        const realpage = document.getElementById("notsoLoad");
        loading.classList.remove("hideME");
        realpage.classList.add("hideME");
        setTimeout(function() {
            alert("Profile picture deleted successfully");
            window.location.href='SA-ChangeInfo.html';
        },1000);
      }
      else{
          alert("Current password is incorrect!");
      }
    })

})


photoDelBtn.addEventListener('click', function(){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        alert("login to continue")
        window.location.href='../landing_page/login.html';
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
      
      if(data['userType'] == 1){
        const loading = document.getElementById("loader-wrapper");
        const realpage = document.getElementById("notsoLoad");
        loading.classList.remove("hideME");
        realpage.classList.add("hideME");
        setTimeout(function() {
            alert("Profile picture deleted successfully");
            window.location.href='SA-ChangeInfo.html';
        },1000);
      }
      else{
          alert("Request unsuccessful try again!");
      }
    })
  })






personalInfoBtn.addEventListener('click', function(){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        alert("login to continue")
        window.location.href='../landing_page/login.html';
    }

    var fname = document.getElementById('fname').value;
    var lname = document.getElementById('lname').value;
    var nic = document.getElementById('nic').value;
    var email = document.getElementById('email').value;
    var phoneNo = document.getElementById('phone').value;

    console.log(fname);
    console.log(lname);
    console.log(nic);
    console.log(email);
    console.log(phone);

    let payload = {
        "reqNo" : 2,
        "fname":fname,
        "lname":lname,
        "nic":nic,
        "email":email,
        "phoneNo":phoneNo
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
      
      if(data['userType'] == 1){
          alert("Details updated!");
          window.location.href='SA-ChangeInfo.html';
      }

      else{
          alert("Invalid details!");
      }
    })

  .catch(err=> {
    alert("Details invalid try again!");
    console.log(err);
    })
})





passChangeBtn.addEventListener('click', function(){
    let token = Cookies.get('Authorization');
    if(token == undefined){
        alert("login to continue")
        window.location.href='../landing_page/login.html';
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

    if(filled){

        if(pass1 != pass2){
            window.alert("Passwords do not match!");
          }
        
        else{
    
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
                
                if(data['userType'] == 1){
                    alert("Details updated!");
                    window.location.href='SA-ChangeInfo.html';
                }

                else{
                    alert("Current password is incorrect!");
                }
                
            })
    
            .catch(err=> {
                alert("Details invalid try again!");
                console.log(err);
            })
        }
    }
})



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










const fname = document.getElementById('fname');
const fnameBtn = document.getElementById('fnameBtn');

const lname = document.getElementById('lname');
const lnameBtn = document.getElementById('lnameBtn');

const email = document.getElementById('email');
const emailBtn = document.getElementById('emailBtn');

const phone = document.getElementById('phone');
const phoneBtn = document.getElementById('phoneBtn');

const nic = document.getElementById('nic');
const nicBtn = document.getElementById('nicBtn');

fnameBtn.addEventListener('click', ()=>{
    fname.disabled = !fname.disabled

    if(!fname.disabled){
        fnameBtn.style = "background-color: red; color: white;";
        fnameBtn.innerHTML = "Done";
    }

    else{
        fnameBtn.style = "background-color: rgb(1, 201, 201); color: black;";
        fnameBtn.innerHTML = "Change";
    }
})


lnameBtn.addEventListener('click', ()=>{
    lname.disabled = !lname.disabled

    if(!lname.disabled){
        lnameBtn.style = "background-color: red; color: white;";
        lnameBtn.innerHTML = "Done";

    }

    else{
        lnameBtn.style = "background-color: rgb(1, 201, 201); color: black;";
        lnameBtn.innerHTML = "Change";
    }
})


emailBtn.addEventListener('click', ()=>{
    email.disabled = !email.disabled

    if(!email.disabled){
        emailBtn.style = "background-color: red; color: white;";
        emailBtn.innerHTML = "Done";
    }

    else{
        emailBtn.style = "background-color: rgb(1, 201, 201); color: black;";
        emailBtn.innerHTML = "Change";
    }
})


phoneBtn.addEventListener('click', ()=>{
    phone.disabled = !phone.disabled

    if(!phone.disabled){
        phoneBtn.style = "background-color: red; color: white;";
        phoneBtn.innerHTML = "Done";
    }

    else{
        phoneBtn.style = "background-color: rgb(1, 201, 201); color: black;";
        phoneBtn.innerHTML = "Change";
    }
})


nicBtn.addEventListener('click', ()=>{
    nic.disabled = !nic.disabled

    if(!nic.disabled){
        nicBtn.style = "background-color: red; color: white;";
        nicBtn.innerHTML = "Done";
    }

    else{
        nicBtn.style = "background-color: rgb(1, 201, 201); color: black;";
        nicBtn.innerHTML = "Change";
    }
})


