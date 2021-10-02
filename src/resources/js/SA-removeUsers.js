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

        fetch("http://localhost:8080/OSCA_war_exploded/SARemoveUsersServlet", options)
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

                setTimeout(function() {
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);

            }
        
        });
    }
});






















const rso = document.getElementById("rso");
const rm = document.getElementById("rm");
const roo = document.getElementById("roo");
const ra = document.getElementById("ra");


rso.addEventListener("click", ()=>{
    window.location = "SA - removeSO.html";
});

rm.addEventListener("click", ()=>{
    window.location = "SA - removeM.html";
});

roo.addEventListener("click", ()=>{
    window.location = "SA - removeOO.html";
});

ra.addEventListener("click", ()=>{
    window.location = "SA - removeA.html";
});