
let login = document.getElementById('login');
// let home = document.getElementById('home');


// home.addEventListener("click", function(){
//     window.location.href='home.html';
// })


login.addEventListener("click", function(){
    window.location.href='login.html';
})


window.addEventListener('DOMContentLoaded',()=>{

    let uid = document.URL.split("?")[1];

    let payload = {
        "pin":uid,
        "reqType":2
    }

    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload) 
    }

    fetch("http://localhost:8080/OSCA_war_exploded/EmailVerificationServlet", options)
    .then(res => res.json())
    .then((data) => {


    })
    
})
