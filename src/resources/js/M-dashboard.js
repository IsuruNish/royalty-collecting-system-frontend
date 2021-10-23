window.addEventListener('DOMContentLoaded',()=>{
    // console.log(data['token']);
    let token = Cookies.get('Authorization');
    console.log(token);

    if(token == undefined){
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            alert("no token")
            // window.location.href='../landing_page/login.html';
        },5000);

        console.log(token);
    }


    else{
        console.log(token);
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
        

        fetch("http://localhost:8080/OSCA_war_exploded/MemAndSODashboardServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['userType']
        console.log(data);
        if(ut!=4){
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
                alert("not show organizer")
                // window.location.href='../landing_page/login.html';
            },5000);
            }
        else{
            const loading = document.getElementById("loader-wrapper");
            const realpage = document.getElementById("notsoLoad");

            var name = document.getElementById('name');
            var id = document.getElementById('id');
            var email = document.getElementById('email');
            var phone = document.getElementById('phone');
            var Topname = document.getElementById('Topname');

            var uIncome = document.getElementById('uIncome');
            var pIncome = document.getElementById('pIncome');

            var picSmall = document.getElementById('profilePicSmall');
            var picLarge = document.getElementById('profilePic');

            if(document.referrer == "http://127.0.0.1:5500/landing_page/login.html" || document.referrer == "http://127.0.0.1:5500/landing_page/signup.html"){
                popUpFromDown("Welcome back "+data['fname'], 'default');
            }

            setTimeout(function() {
                picLarge.src = data['DPpath'];
                picSmall.src = data['DPpath'];
                name.innerHTML = data['fname']+" "+data['lname'];
                Topname.innerHTML = "Hello "+ data['fname']+",";
                id.innerHTML = data['uid'];
                email.innerHTML = data['email'];
                phone.innerHTML = data['phone'];
                uIncome.innerHTML = data['upcomingIncome'];
                pIncome.innerHTML = data['pastIncome'];

                loading.classList.add("hideME");
                realpage.classList.remove("hideME");
            },500);

        }
    
    })
        .catch(err =>{
            popUpFromDown("Login again",'red');
            setTimeout(function() {
                alert("catch")
                // window.location.href='../landing_page/login.html';
            },5000);
            console.error(err);
          });
    }
});








const changeiinfo = document.getElementById("changeiinfo");


changeiinfo.addEventListener("click", ()=>{
    window.location = "M-ChangeInfo.html";
});