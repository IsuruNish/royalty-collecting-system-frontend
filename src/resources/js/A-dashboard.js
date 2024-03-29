window.addEventListener('DOMContentLoaded',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
        // alert("login to continue")
        popUpFromDown("login to continue",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
    }

    else{
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        fetch("http://localhost:8080/OSCA_war_exploded/AdashboardServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['utype']
        console.log(data['utype']);
        if(ut!=2){
            // alert("Access denied!");
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },5000);
            }
            else{
                const loading = document.getElementById("loader-wrapper");
                const realpage = document.getElementById("notsoLoad");

                var name = document.getElementById('name');
                var id = document.getElementById('id');
                var email = document.getElementById('email');
                var phone = document.getElementById('phone');
                var soNo = document.getElementById('showNo');
                var memNo = document.getElementById('memNo');
                var license = document.getElementById('licenseReq');
                var songs = document.getElementById('songReq');
                var memincome = document.getElementById('memIncome');
                var concerts = document.getElementById('concerts');
                var oscaIncome = document.getElementById('oscaIncome');
                var Topname = document.getElementById('Topname');

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
                    id.innerHTML = data['id'];
                    email.innerHTML = data['email'];
                    phone.innerHTML = data['phoneNo'];
                    soNo.innerHTML = data['SOnum'];
                    memNo.innerHTML = data['Mnum'];
                    license.innerHTML = data['LicenseReqnum'];
                    songs.innerHTML = data['SongReqnum'];
                    memincome.innerHTML = data['memberIncome'];
                    concerts.innerHTML = data['concerts'];
                    oscaIncome.innerHTML = data['oscaIncome'];
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);

            }
        
        })
        .catch(err =>{
            // alert("Email or Password is wrong");
            popUpFromDown("Login again",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },5000);
            // popUp("Email or Password is wrong");
            console.error(err);
          });
    }
});




const changeiinfo = document.getElementById("changeinfo");


changeiinfo.addEventListener("click", ()=>{
    window.location.href = "A-ChangeInfo.html";
});