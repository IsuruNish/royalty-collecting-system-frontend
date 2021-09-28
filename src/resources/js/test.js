
window.addEventListener('DOMContentLoaded',()=>
    $.post('http://localhost:8080/OSCA_war_exploded/CookiesVarificationServlet',
    {
        "osca": Cookies.get('OSCA')
    },
    function(data) {
        alert(data);
        if(data!=1){
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
    }
    )
)