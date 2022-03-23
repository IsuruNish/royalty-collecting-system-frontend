
let redo = document.getElementById('redo');
let home = document.getElementById('home');


home.addEventListener("click", function(){
    window.location.href='home.html';
})


redo.addEventListener("click", function(){
    let uid = document.URL.split("?")[1];

    let payload = {
        "pin":uid,
        "reqType":1
      }
      
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload) 
    
      }
  
      fetch("http://localhost:8080/OSCA_war_exploded/EmailVerificationServlet", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
  
    })
})