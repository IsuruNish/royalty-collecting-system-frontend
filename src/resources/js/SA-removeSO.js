
window.addEventListener('DOMContentLoaded',()=>{
    let token = Cookies.get('Authorization');
    if(token == undefined){
        alert("login to continue")
        window.location.href='../landing_page/login.html';
    }

    else{
        let options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        fetch("http://localhost:8080/OSCA_war_exploded/SAdashboardServlet", options)
        .then(res => res.json())
        .then((data) => {
        ut = data['utype']
        if(ut!=1){
            alert("Access denied!");
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },1000);
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

                setTimeout(function() {
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
        
        });
    }
});


let changeinfo = document.getElementById("changeinfo");


changeinfo.addEventListener("click", ()=>{
    window.location.href = "SA-ChangeInfo.html";
});


    
    // $.getJSON('http://localhost:8080/OSCA_war_exploded/SAdashboardServlet',
    // {
    //     "osca": Cookies.get('OSCA')
    // },
    // function(data) {

    //     console.log(data);
  
    //     if(data['utype']!=1){
    //     alert("Access denied!");
    //     setTimeout(function() {
    //         window.location.href='../landing_page/login.html';
    //     },1000);
    //     }

    //     else{
    //         const loading = document.getElementById("loader-wrapper");
    //         const realpage = document.getElementById("notsoLoad");

    //         var name = document.getElementById('name');
    //         var id = document.getElementById('id');
    //         var email = document.getElementById('email');
    //         var phone = document.getElementById('phone');
    //         var soNo = document.getElementById('showNo');
    //         var memNo = document.getElementById('memNo');
    //         var license = document.getElementById('licenseReq');
    //         var songs = document.getElementById('songReq');
    //         var memincome = document.getElementById('memIncome');
    //         var concerts = document.getElementById('concerts');
    //         var oscaIncome = document.getElementById('oscaIncome');
    //         var Topname = document.getElementById('Topname');

    //         setTimeout(function() {
    //             name.innerHTML = data['fname']+" "+data['lname'];
    //             Topname.innerHTML = "Hello "+ data['fname']+",";
    //             id.innerHTML = data['id'];
    //             email.innerHTML = data['email'];
    //             phone.innerHTML = data['phoneNo'];
    //             soNo.innerHTML = data['SOnum'];
    //             memNo.innerHTML = data['Mnum'];
    //             license.innerHTML = data['LicenseReqnum'];
    //             songs.innerHTML = data['SongReqnum'];
    //             memincome.innerHTML = data['memberIncome'];
    //             concerts.innerHTML = data['concerts'];
    //             oscaIncome.innerHTML = data['oscaIncome'];
    //             loading.classList.add("hideME");
    //             realpage.classList.remove("hideME");
    //         },500);

    //     }
    // }
    // )
// )