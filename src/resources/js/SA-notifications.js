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
  
        fetch("http://localhost:8080/OSCA_war_exploded/NotificationServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['ut']
        console.log(data);
        if(ut!=1){
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
                // window.location.href='../landing_page/login.html';
            },3000);
            }
            else{
              const loading = document.getElementById("loader-wrapper");
              const realpage = document.getElementById("notsoLoad");
              let fname = document.getElementById("Topname");
              let pic = document.getElementById("profilePicSmall");
  
              fname.innerHTML = "Hello "+ data['fname']+",";
              pic.src = data['dpPath'];
              loading.classList.add("hideME");
              realpage.classList.remove("hideME");
  
              makeNotifications(data['msg']);
            }        
        })
        .catch(err =>{
            popUpFromDown("Login again",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },3000);
            console.error(err);
          });
    }
  });
  
  

  let notiID = []

  function makeNotifications(data){
  let notificationDiv = document.getElementById("notifyME");
    for (let i = 0; i < data[0].length; i++) {
        
        ///////correct thisssss
        ///////correct thisssss
        ///////correct thisssss
        ///////correct thisssss
        ///////correct thisssss
        ///////correct thisssss
        notiID.push(data[i]);
        



        var parentDiv = document.createElement("div");
        var div = document.createElement("div");
        var div2 = document.createElement("div");
        var div3 = document.createElement("div");
        var div4 = document.createElement("div");
        var span = document.createElement("span");
        var pTag = document.createElement("p");
        var bTag = document.createElement("b");
        var iTag = document.createElement("i");


        parentDiv.setAttribute("class", "notification");
        parentDiv.setAttribute("id", "line1");
        div.setAttribute("class", "circle");
        div.setAttribute("class", "active");
        div2.setAttribute("id", "notiDIV");
        div3.setAttribute("id", "left");
        div4.setAttribute("id", "right");
        span.setAttribute("class", "time");
        iTag.setAttribute("class", "fas");
        iTag.setAttribute("class", "fa-trash");
        iTag.setAttribute("onclick", "Delete(this)");

        // DivColTag_i3.classList.add("fa-times-circle");


        parentDiv.appendChild(div);
        parentDiv.appendChild(span);
        pTag.appendChild(bTag);
        div3.appendChild(pTag);
        div4.appendChild(iTag);
        div2.appendChild(div3);
        div2.appendChild(div4);
        parentDiv.appendChild(div2);
        notificationDiv.appendChild(parentDiv);

        // span.innerHTML = data[i][0];
        // bTag.innerHTML = data[i][1];

    }
  }
  
  
  
  function Delete(is){
      var element = is.parentElement.parentElement.parentElement;
    //   console.log(element);
      element.remove();
    }