let logout = document.getElementById('logoutBtn');

logout.addEventListener('click', function(){
    Cookies.set('Authorization', undefined);
    window.location.href='../landing_page/Home.html';
})


window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || ( typeof window.performance != "undefined" && window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      window.location.reload();
    }
});