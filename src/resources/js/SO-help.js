window.addEventListener("DOMContentLoaded", () => {
    let token = Cookies.get("Authorization");
    if (token == undefined) {
      popUpFromDown("login to continue", "red");
      setTimeout(function () {
        window.location.href = "../landing_page/login.html";
      }, 3000);

    } else {
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      fetch("http://localhost:8080/OSCA_war_exploded/SOHelpServlet", options)
        .then((res) => res.json())
        .then((data) => {

          const loading = document.getElementById("loader-wrapper");
          const realpage = document.getElementById("notsoLoad");

          loading.classList.add("hideME");
          realpage.classList.remove("hideME");
          
          ut = data["uType"];
          console.log(data);
  
          if (ut != 5) {
            popUpFromDown("Access denied!", "red");
            setTimeout(function () {
              window.location.href = "../landing_page/login.html";
            }, 3000);
          } else {
            var Topname = document.getElementById("Topname");
            Topname.innerHTML = "Hello " + data["fName"] + ",";
  
            var picSmall = document.getElementById("profilePicSmall");
            picSmall.src = data["dpPath"];
           
          }
        })
  
        .catch((err) => {
          popUpFromDown("Error login again", "red");
          setTimeout(function () {
            window.location.href = "../landing_page/login.html";
          }, 3000);
          console.error(err);
        });
    }
  });
  
  