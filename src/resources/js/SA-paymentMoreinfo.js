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
  
        fetch("http://localhost:8080/OSCA_war_exploded/SAoscaPaymentMoreDetailsServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['ut']
        console.log(data);
        if(ut!=1){
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
              let isMem = document.URL.split("?")[2];
              let typeOFreq = 0;
            
              if (isMem == "M") {
                typeOFreq = 2;
              }
              else{
                typeOFreq = 1;
              }

              let payload = {
                "songID":id,
                "typeOfreq":typeOFreq
              }
                
              let options = {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload) 
              }
  
              fetch("http://localhost:8080/OSCA_war_exploded/SAoscaPaymentMoreDetailsServlet", options)
              .then(res => res.json())
              .then((data) => {
                console.log(data);
                console.log("data");
  
                let songname = document.getElementsByClassName("input1");
                let version = document.getElementsByClassName("input2");
                let year = document.getElementsByClassName("input3");
                let bname = document.getElementsByClassName("input4");
                let bbranch = document.getElementsByClassName("input5");
                let accNo = document.getElementsByClassName("input6");
                
                songname[0].value = data['data'][0];
                version[0].value = data['data'][1];
                year[0].value = data['data'][2];

                if (data['data'].length == 3) {
                    bname[0].value =  "-";
                    bbranch[0].value =  "-";
                    accNo[0].value = "-";
                }
                else{
                    bname[0].value = data['data'][4];
                    bbranch[0].value = data['data'][5];
                    accNo[0].value = data['data'][3];
                }
  
              
              })
              .catch(err =>{
                popUpFromDown("Login again",'red');
                setTimeout(function() {
                    window.location.href='SA-upcomingPayments.html'
                },3000);
                console.error(err);
              });
            }        
        })
        .catch(err =>{
            popUpFromDown("Login again",'red');
            setTimeout(function() {
                window.location.href='SA-upcomingPayments.html'
            },3000);
            console.error(err);
          });
    }
  });
  
  
