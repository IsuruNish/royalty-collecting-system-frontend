function validateInputFields(){
    var input = $('.newInputs');
    var filled = true;
  
    for(var i = 0; i < input.length; i++){
      if(validateInputs(input[i]) == false){
        showValidate(input[i], input[i].id);
        filled = false;
      }
    }

    return filled;

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


function hideValidate (id) {
    var field = document.getElementById(id);
    var text = field.nextElementSibling;
  
    if(field == document.activeElement) {
      text.innerHTML = "";
      text.style.color = "#ff0000";
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
  }
}



function validateEmail(){
    var email = $("#email").val();
    var text = document.getElementById('formwords');
    // var form = document.getElementById('form');
    var pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    
    if(email.match(pattern)){
      text.innerHTML = "";
      text.style.color = "#26b30c";
      return 1;
    }
    else{
      text.innerHTML = "Your email address is invalid";
      text.style.color = "#ff0000";
      return 0;
    }
  }


  function lastValidation(){
    var fname = $("#fname").val().trim();
    var lname = $("#lname").val().trim();
    var nic = $("#nic").val().trim();
    var phone = $("#phone").val().trim();
    var phoneno1 = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var phoneno2 = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    var nic1 = /[0-9]{9}v{1}$/i
    var nic2 = /^[0-9]{12}$/
    let filled = true;
    if(fname.length < 4){
  
      var field = document.getElementById('fname');
      var text = field.nextElementSibling;
  
      text.innerHTML = "At least 4 letters required";
      text.style.color = "#ff0000";
      filled = false;
    }
    
    else if(fname.match(/(.+)?[0-9](.+)?/)){
  
      var field = document.getElementById('fname');
      var text = field.nextElementSibling;
  
      text.innerHTML = "Numbers aren't allowed";
      text.style.color = "#ff0000";
      filled = false;
    }
  
    if(lname.length < 4){
  
      var field = document.getElementById('lname');
      var text = field.nextElementSibling;
  
      text.innerHTML = "At least 4 letters required";
      text.style.color = "#ff0000";
      filled = false;
    }
  
    else if(lname.match(/(.+)?[0-9](.+)?/)){
  
      var field = document.getElementById('lname');
      var text = field.nextElementSibling;
  
      text.innerHTML = "Numbers aren't allowed";
      text.style.color = "#ff0000";
      filled = false;
    }
  
    if(validateEmail() == 0){
      var field = document.getElementById('email');
      var text = field.nextElementSibling;
  
      text.innerHTML = "Your email address is invalid";
      text.style.color = "#ff0000";
      filled = false;
    }
  
    if(!phone.match(phoneno1) && !phone.match(phoneno2)){
      var field = document.getElementById('phone');
      var text = field.nextElementSibling;
  
      text.innerHTML = "Invalid phone number";
      text.style.color = "#ff0000";
      filled = false;
    }
  
    if(!nic.match(nic1) && !nic.match(nic2)){
      var field = document.getElementById('nic');
      var text = field.nextElementSibling;
  
      text.innerHTML = "Invalid NIC number";
      text.style.color = "#ff0000";
      filled = false;
    }

    return filled;
}

function validateIBankFields(){
  var input = $('.BankInputs');
  var filled = true;

  for(var i = 0; i < input.length; i++){
    if(validateInputs(input[i]) == false){
      showBankValidate(input[i], input[i].id);
      filled = false;
    }
  }

  return filled;
}



function showBankValidate (input, id) {
  if($(input).val().trim() == '') {
    var field = document.getElementById(id);
    var text = field.nextElementSibling;

    if($(input).attr('name') == 'bankName'){
      text.innerHTML = "Bank name is required";
      text.style.color = "#ff0000";
    }

    if($(input).attr('name') == 'bankBranch'){
      text.innerHTML = "Bank branch is required";
      text.style.color = "#ff0000";
    }

    if($(input).attr('name') == 'accNo'){
      text.innerHTML = "Account number is required";
      text.style.color = "#ff0000";
    }
  }
}


function lastValidationOfBank(){
  var bankName = $("#bankName").val().trim();
  var bankBranch = $("#bankBranch").val().trim();
  var accNo = $("#accNo").val().trim();

  let filled = true;
  if(bankName.match(/(.+)?[0-9](.+)?/)){

    var field = document.getElementById('bankName');
    var text = field.nextElementSibling;

    text.innerHTML = "Numbers aren't allowed";
    text.style.color = "#ff0000";
    filled = false;
  }

   if(bankBranch.match(/(.+)?[0-9](.+)?/)){

    var field = document.getElementById('bankBranch');
    var text = field.nextElementSibling;

    text.innerHTML = "Numbers aren't allowed";
    text.style.color = "#ff0000";
    filled = false;
  }

  if(accNo.match(/(.+)?[a-zA-Z](.+)?/)){

    var field = document.getElementById('accNo');
    var text = field.nextElementSibling;

    text.innerHTML = "Letters aren't allowed";
    text.style.color = "#ff0000";
    filled = false;
  }

  return filled;
}