window.addEventListener("DOMContentLoaded", () => {
    let token = Cookies.get("Authorization");
    if (token == undefined) {
      popUpFromDown("login to continue", "red");
      alert("login to continue");
      setTimeout(function () {
        window.location.href = "../landing_page/login.html";
      }, 3000);
      window.location.href = "../landing_page/login.html";
    } else {
      let options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
  
      fetch("http://localhost:8080/OSCA_war_exploded/MHelpServlet", options)
        .then((res) => res.json())
        .then((data) => {
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
          alert("Email or Password is wrong");
          popUpFromDown("Login again", "red");
          setTimeout(function () {
            window.location.href = "../landing_page/login.html";
          }, 3000);
          popUp("Email or Password is wrong");
          console.error(err);
        });
    }
  });
  
  