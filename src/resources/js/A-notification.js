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
        if(ut!=2){
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },3000);
            }
            else{
                if (data['numberOfNotifications'] != 0) {
                    document.getElementById("notifyNumber").innerHTML = data['numberOfNotifications'];
                }
                else{
                    document.getElementById("notifyNumber").classList.add('letsHideForAwhile');
                }

              const loading = document.getElementById("loader-wrapper");
              const realpage = document.getElementById("notsoLoad");
              let fname = document.getElementById("Topname");
              let pic = document.getElementById("profilePicSmall");
  
              fname.innerHTML = "Hello "+ data['fname']+",";
              pic.src = data['dpPath'];
              loading.classList.add("hideME");
              realpage.classList.remove("hideME");
  
              makeNotifications(data['msg']);



              let unreadIDs = getUnreadNotificationIDs(data['msg']);
              let token = Cookies.get('Authorization');

              let payload = {
                "unreadIDs": unreadIDs,
                "requestType": 3
            }
                
            let options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload) 
            }
        
              fetch("http://localhost:8080/OSCA_war_exploded/NotificationServlet", options)
            //   .then( res => res.json())
            //   .then(data =>{
            //     console.log(data);
            //     if(data['ok'] != 1){
            //       popUpFromDown("Error, try again",'red');
                  
            //       setTimeout(function() {
            //           window.location.href='SO-paymentForLicense.html'+"?"+data['numbers'];
            //       },3000);
            //     }
            //   })
              .catch(err =>{
                popUpFromDown("Error try again",'red');
                setTimeout(function() {
                  window.location.href='../landing_page/login.html';
                },3000);
                console.error(err);
              });
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
        notiID.push(data[i]);

        if (data[4][i] == 0) {
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
        
            div2.setAttribute("id", "notiDIV");
            div3.setAttribute("id", "left");
            div4.setAttribute("id", "right");
            span.setAttribute("class", "time");
            iTag.setAttribute("onclick", "Delete(this,"+data[0][i]+")");
    
            div.classList.add("circle");
            div.classList.add("active");

            iTag.classList.add("fas");
            iTag.classList.add("fa-trash");

            parentDiv.appendChild(div);
            parentDiv.appendChild(span);
            pTag.appendChild(bTag);
            div3.appendChild(pTag);
            div4.appendChild(iTag);
            div2.appendChild(div3);
            div2.appendChild(div4);
            parentDiv.appendChild(div2);
            notificationDiv.appendChild(parentDiv);

            span.innerHTML = timeConvert(data[3][i].substring(0,data[3][i].length-3))+ " on "+  data[2][i] ;
            bTag.innerHTML = data[1][i];
        }

        else{
            var parentDiv = document.createElement("div");
            var div = document.createElement("div");
            var div2 = document.createElement("div");
            var div3 = document.createElement("div");
            var div4 = document.createElement("div");
            var span = document.createElement("span");
            var pTag = document.createElement("p");
            var iTag = document.createElement("i");

            parentDiv.setAttribute("class", "notification");
            parentDiv.setAttribute("id", "line1");
            
            div2.setAttribute("id", "notiDIV");
            div3.setAttribute("id", "left");
            div4.setAttribute("id", "right");
            span.setAttribute("class", "time");
            iTag.setAttribute("onclick", "Delete(this,"+data[0][i]+")");

            div.classList.add("circle");
            div.classList.add("active");

            iTag.classList.add("fas");
            iTag.classList.add("fa-trash");

            parentDiv.appendChild(div);
            parentDiv.appendChild(span);
            div3.appendChild(pTag);
            div4.appendChild(iTag);
            div2.appendChild(div3);
            div2.appendChild(div4);
            parentDiv.appendChild(div2);
            notificationDiv.appendChild(parentDiv);

            span.innerHTML = timeConvert(data[3][i].substring(0,data[3][i].length-3))+ " on "+  data[2][i] ;
            pTag.innerHTML = data[1][i];
        }
    }
  }



function getUnreadNotificationIDs(data){
    let unreadIDs = []
    for (let i = 0; i < data[0].length; i++) {
        if (data[4][i] == 0) {
            unreadIDs.push(data[0][i]);
        }
    }
    return unreadIDs;
}  

// function makeNotificationsREAD(data){
//     console.log(data);
//     let notificationDiv = document.getElementById("notifyME");
//     for (let i = 0; i < data[0].length; i++) {
//       console.log(data[3][i].substring(0,data[3][i].length-3))
//       notiID.push(data[i]);

//     var parentDiv = document.createElement("div");
//     var div = document.createElement("div");
//     var div2 = document.createElement("div");
//     var div3 = document.createElement("div");
//     var div4 = document.createElement("div");
//     var span = document.createElement("span");
//     var pTag = document.createElement("p");
//     var iTag = document.createElement("i");

//     parentDiv.setAttribute("class", "notification");
//     parentDiv.setAttribute("id", "line1");
//     // parentDiv.setAttribute("name", data[0][i]);
    
//     div2.setAttribute("id", "notiDIV");
//     div3.setAttribute("id", "left");
//     div4.setAttribute("id", "right");
//     span.setAttribute("class", "time");
//     iTag.setAttribute("onclick", "Delete(this,"+data[0][i]+")");

//     div.classList.add("circle");
//     div.classList.add("active");

//     iTag.classList.add("fas");
//     iTag.classList.add("fa-trash");

//     parentDiv.appendChild(div);
//     parentDiv.appendChild(span);
//     div3.appendChild(pTag);
//     div4.appendChild(iTag);
//     div2.appendChild(div3);
//     div2.appendChild(div4);
//     parentDiv.appendChild(div2);
//     notificationDiv.appendChild(parentDiv);

//     span.innerHTML = timeConvert(data[3][i].substring(0,data[3][i].length-3))+ " on "+  data[2][i] ;
//     pTag.innerHTML = data[1][i];

//   }
// }
  
  function timeConvert (time) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  
    if (time.length > 1) { 
      time = time.slice (1);
      time[5] = +time[0] < 12 ? 'am' : 'pm'; 
      time[0] = +time[0] % 12 || 12;
    }
    return time.join ('');
  }
  

  
  function Delete(is, name){
    let element = is.parentElement.parentElement.parentElement;

    element.remove();

    let token = Cookies.get('Authorization');

      let payload = {
        "notificationID": name,
        "requestType": 2
    }
        
    let options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload) 
    }

      fetch("http://localhost:8080/OSCA_war_exploded/NotificationServlet", options)
      .then( res => res.json())
      .then(data =>{
        console.log(data);
        if(data['ok'] != 1){
          popUpFromDown("Error, try again",'red');
          
          setTimeout(function() {
              window.location.href='A-notification.html';
          },3000);
        }
      })
      .catch(err =>{
        popUpFromDown("Error try again",'red');
        console.error(err);
      });
    }