$('#btn').on('click', ()=>{
  let filled = true;
  var pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;

  let text = document.getElementById("formwords");

  if($("#email").val().trim() == ''){
    filled =  false;
    text.innerHTML = "Email is required";
    text.style.color = "#ff0000";
  }
  else{

    if($("#email").val().match(pattern)){
      text.innerHTML = "";
      text.style.color = "#26b30c";
    }

    else{
      text.innerHTML = "Your email address is invalid";
      text.style.color = "#ff0000";
      filled = false;
    }
  }


  if(filled){
    sendVarificationPin();
  }
})


function sendVarificationPin(){
  var email = $("#email").val().trim();

  let payload = {
    "email":email
  }
    
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
  
    }

    fetch("http://localhost:8080/OSCA_war_exploded/ForgotPasswordServlet", options)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      ut = data['ok']
      if(ut == 0){
        alert("no such email");
      }
       else if(ut == 1){
        popUpFromDown("Wait a few seconds and request again",'red');
      }
      else if(ut == 2){
        popUpFromDown("Request unsuccessful",'red');
      }  

      else{
        popUpFromDown("Verification link is sent to your email",'greenColour');
      }
    })
}


function hideValidate(){
  let field = document.getElementById("email");
  let text = document.getElementById("formwords");

  if(field == document.activeElement) {
    text.innerHTML = "";
    text.style.color = "#ff0000";
  }
}

function validateEmail(){
  var pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;

  let text = document.getElementById("formwords");
  if($("#email").val().match(pattern)){
    text.innerHTML = "";
    text.style.color = "#26b30c";
  }

  else{
    text.innerHTML = "Your email address is invalid";
    text.style.color = "#ff0000";
  }
}