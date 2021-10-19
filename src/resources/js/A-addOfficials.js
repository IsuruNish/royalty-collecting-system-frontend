window.addEventListener('DOMContentLoaded',()=>{
  let token = Cookies.get('Authorization');
  if(token == undefined){
      popUpFromDown("login to continue",'red');
      setTimeout(function() {
        // alert("cookie undefined")
          window.location.href='../landing_page/login.html';
      },3000);
  }

  else{
      let options = {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
      }

      fetch("http://localhost:8080/OSCA_war_exploded/AddUsersServlet", options)
      .then(res => res.json())
      .then((data) => {
      ut = data['utype'];
      if(ut!=2){
          popUpFromDown("Access denied!",'red');
          setTimeout(function() {
            // alert("not admin")

              window.location.href='../landing_page/login.html';
          },3000);
          }  
      else{
        var Topname = document.getElementById('Topname');
        var picSmall = document.getElementById('profilePicSmall');

        Topname.innerHTML = "Hello "+ data['fname']+",";
        picSmall.src = data['DPpath'];

        console.log(data);

        const loading = document.getElementById("loader-wrapper");
        const realpage = document.getElementById("notsoLoad");
        loading.classList.add("hideME");
        realpage.classList.remove("hideME");
      }   
      })
      .catch(err =>{
          popUpFromDown("Login again",'red');
          setTimeout(function() {
            alert("iinside catch")

              window.location.href='../landing_page/login.html';
          },3000);
          console.error(err);
        });
  }
});

$('#add').on('click', ()=>{
  let filled1 = validateInputFields();
  let filled2 = lastValidation();

    if(filled1 && filled2){
      const loading = document.getElementById("loader-wrapper");
      const realpage = document.getElementById("notsoLoad");

      loading.classList.remove("hideME");
      realpage.classList.add("hideME");
      var fname = $("#fname").val().trim();
      var lname = $("#lname").val().trim();
      
      var email = $("#email").val().trim();
      var phone = $("#phone").val().trim();
      var nic = $("#nic").val().trim();
    
      let payload = {
        "fname":fname,
        "lname":lname,
        "nic":nic,
        "email":email,
        "phone":phone,
        "forWhom":"official",
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
    
      fetch("http://localhost:8080/OSCA_war_exploded/AddUsersServlet", options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data['ok'] == 1){
          popUpFromDown("User added successfully",'greenColour');
          setTimeout(function() {
            // alert("iinside catch")
  
              window.location.href='A-addofficials.html';
          },3000);
        }

        else if(data['ok'] == 0){
          popUpFromDown("Error try again",'red');
          setTimeout(function() {
              window.location.href='A-addofficials.html';
          },3000);
        }
        else if(data['ok'] == -1){
          popUpFromDown("Email already exist",'red');
          loading.classList.add("hideME");
          realpage.classList.remove("hideME");
        }
      })
      .catch(err =>{
        popUpFromDown("Error",'red');
        setTimeout(function() {
            window.location.href='A-addofficials.html';
        },3000);
        console.error(err);
      });

    }
})
