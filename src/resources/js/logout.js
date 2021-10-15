let logout = document.getElementById('logoutBtn');

logout.addEventListener('click', function(){
    Cookies.set('Authorization', undefined);
    window.location.href='../landing_page/Home.html';
})