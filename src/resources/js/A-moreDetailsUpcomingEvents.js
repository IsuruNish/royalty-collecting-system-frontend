
window.addEventListener('DOMContentLoaded',()=>{
  let token = Cookies.get('Authorization');
  if(token == undefined){
      popUpFromDown("login to continue",'red');
      setTimeout(function() {
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

      fetch("http://localhost:8080/OSCA_war_exploded/UpcomingEventsServlet", options)
      .then(res => res.json())
      .then((data) => {
      ut = data['ut']
      console.log(data);
      if(ut!=2){
          popUpFromDown("Access denied!",'red');
          setTimeout(function() {
              window.location.href='../landing_page/login.html';
          },3000);
          }
          else{
            const loading = document.getElementById("loader-wrapper");
            const realpage = document.getElementById("notsoLoad");
            let fname = document.getElementById("Topname");
            let pic = document.getElementById("profilePicSmall");

            fname.innerHTML = "Hello "+ data['fname']+",";
            pic.src = data['DPpath'];
            loading.classList.add("hideME");
            realpage.classList.remove("hideME");

            let id = document.URL.split("?")[1];
            let payload = {
              "concertID":id
            }
              
            let options = {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(payload) 
            }

            fetch("http://localhost:8080/OSCA_war_exploded/SOupcomingEventsMoreDetailsServlet", options)
            .then(res => res.json())
            .then((data) => {
              console.log(data);

              POSTelement(data['songs'],"singer");

            })
            .catch(err =>{
              popUpFromDown("Login again",'red');
              setTimeout(function() {
                  window.location.href='A-upcomingEvents.html';
              },3000);
              console.error(err);
            });
          }        
      })
      .catch(err =>{
          popUpFromDown("Login again",'red');
          setTimeout(function() {
              window.location.href='A-upcomingEvents.html';
          },3000);
          console.error(err);
        });
  }
});



function POSTelement(fnames, className) {
  
  let ul = document.getElementsByClassName(className)[0];

  if (fnames.length == 0){
    console.log();
    document.getElementsByClassName(className)[0].previousSibling.previousSibling.setAttribute('class','hideME');
    
  }
    for (let i = 0; i < fnames.length; i++) {
      var li = document.createElement("li");
      var t = document.createElement("h5");
      t.innerHTML = fnames[i];

      li.appendChild(t);
      ul.appendChild(li);
      li.setAttribute('class','normalCol');
    }
}