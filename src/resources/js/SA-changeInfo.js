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
  .then(res => {

    const loading = document.getElementById("loader-wrapper");
    const realpage = document.getElementById("notsoLoad");
    loading.classList.remove("hideME");
    realpage.classList.add("hideME");


      setTimeout(function() {
        alert("Profile picture chaged successfully");
        window.location.href='SA-ChangeInfo.html';
    },1000);


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

    alert("Details updated!");
 
    window.location.href='SA-ChangeInfo.html';
  })

  .catch(err=> {
    alert("Details invalid try again!");
    console.log(err);
    })
  



})










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


