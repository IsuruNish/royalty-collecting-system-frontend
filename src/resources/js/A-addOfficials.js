
// $('#add').on('click', ()=>{
//     var input = $('.signupInput');
//     var filled = true;
  
//     for(var i = 0; i < input.length; i++){
//       if(validateInputs(input[i]) == false){
//         showValidate(input[i], input[i].id);
//         filled = false;
//       }
//     }
  
//     if(filled){
//       signupOO();
//     }
  
//   })


// function signupOO(){
//     var fname = $("#fname").val().trim();
//     var lname = $("#lname").val().trim();
    
//     var email = $("#email").val().trim();
//     var phone = $("#phone").val().trim();
//     var nic = $("#nic").val().trim();
//     // var pass = $("#pass").val().trim();
//     // var pass2 = $("#pass2").val().trim();
  
//     // if(validateEmail() == 0){
//     //   window.alert("Your email is invalid!");
//     // }
  
//     // else if(pass != pass2){
//     //   window.alert("Passwords do not match!");
//     // }
  
//     // else{
  
//     //   let hashpw = sha256(pass);
//     //   let payload = {
//     //     "fname":fname,
//     //     "lname":lname,
//     //     "nic":nic,
//     //     "email":email,
//     //     "phone":phone,
//     //     "password":hashpw
//     //   }
      
//       // let token = Cookies.get('Authorization');
//       let options = {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//           // 'Authorization': `Bearer ${token}`
//         },
//         // body: JSON.stringify(payload) 
    
//       }
  
//       fetch("http://localhost:8080/OSCA_war_exploded/AAddUsersServlet", options)
//       .then(res => res.json())
//       .then(data => {
//         ut = data['userType']
//         // Cookies.set('Authorization', 'Bearer '+data['token'])
//         // console.log(data);
       
//         //   window.location.href='A-dashboard.html';
      
        
//       })
//     }
// //   }




$('#add').on('click', ()=>{
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
  var fname = $("#fname").val().trim();
  var lname = $("#lname").val().trim();
  
  var email = $("#email").val().trim();
  var phone = $("#phone").val().trim();
  var nic = $("#nic").val().trim();
  // var pass = $("#pass").val().trim();
  // var pass2 = $("#pass2").val().trim();

  // if(validateEmail() == 0){
  //   window.alert("Your email is invalid!");
  // }

  // else if(pass != pass2){
  //   window.alert("Passwords do not match!");
  // }

  // else{

  //   let hashpw = sha256(pass);
    let payload = {
      "fname":fname,
      "lname":lname,
      "nic":nic,
      "email":email,
      "phone":phone,
  //     "password":hashpw
    }
    
    let token = Cookies.get('Authorization');
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload) 
  
    }

    fetch("http://localhost:8080/OSCA_war_exploded/AAddUsersServlet", options)
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
      // window.location.href='../show_organizer/SO-dashboard.html';
      
    })
  }
// }
