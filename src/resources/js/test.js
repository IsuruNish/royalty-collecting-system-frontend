
$(document).ready(function(){
    $.post('http://localhost:8080/OSCA_war_exploded/CookiesVarificationServlet',
    {
        "osca": Cookies.get('OSCA')
    },
    function(data) {
        console.log(data);
        if(data!=1){
        window.location.href='../landing_page/login.html';
        alert("Access denied!!");
        }
    }
    );
});
