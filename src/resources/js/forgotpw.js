$('#btn').on('click', ()=>{
    // var input = $('.signupInput');
    // var filled = true;
  
    // for(var i = 0; i < input.length; i++){
    //   if(validateInputs(input[i]) == false){
    //     showValidate(input[i], input[i].id);
    //     filled = false;
    //   }
    // }
  
    // if(filled){
      signupSO();
    // }
  
  })


  function signupSO(){
   
    var pin=$("#pin").val().trim();
    var pass1 = $("#pass1").val().trim();
    // var pass2 = $("#pass2").val().trim();
    
    // var pass = $("#pass").val().trim();
    // var pass2 = $("#pass2").val().trim();
  
    // if(validateEmail() == 0){
    //   window.alert("Your email is invalid!");
    // }
  
    // else if(pass != pass2){
    //   window.alert("Passwords do not match!");
    // }
  
    // else{
  
      let hashpw = sha256(pass1);
      let payload = {

        "pin":pin,
        "pass1":hashpw,
        
       
      }
      
    //   let token = Cookies.get('Authorization');
      let options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        //   'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload) 
    
      }
  
      fetch("http://localhost:8080/OSCA_war_exploded/ResetPasswordServlet", options)
      .then(res => {
        console.log(res);
        res.json()})
      .then(data => {
        console.log(data);
        // ut = data['ok']
        // Cookies.set('Authorization', 'Bearer '+data['token'])
        // console.log(data);
        // if(ut!=0){
        //   alert(ut);
        //   window.location.href='../show_organizer/SO-dashboard.html';
        // }
        // else {
        //   alert("Signup unsuccessful");
        // }
        alert("hello");
         window.location.href='../landing_page/login.html';
        
      })
    }