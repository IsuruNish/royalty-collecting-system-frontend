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

        fetch("http://localhost:8080/OSCA_war_exploded/SARemoveUsersServlet", options)
        .then(res => res.json())
        .then((data) => {

        ut = data['utype']
        if(ut!=2){
            popUpFromDown("Access denied!",'red');
            setTimeout(function() {
                window.location.href='../landing_page/login.html';
            },1000);
            }
            else{
                const loading = document.getElementById("loader-wrapper");
                const realpage = document.getElementById("notsoLoad");
                var Topname = document.getElementById('Topname');
                var picSmall = document.getElementById('profilePicSmall');
                
                console.log(data);
                picSmall.src = data['DPpath'];
                Topname.innerHTML = "Hello "+ data['fname']+",";

                setTimeout(function() {
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);

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