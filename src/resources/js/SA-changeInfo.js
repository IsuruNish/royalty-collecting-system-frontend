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


