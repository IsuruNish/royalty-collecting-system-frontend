function getNotificationNumber(){
    let token = Cookies.get('Authorization');

    let payload = {
        "requestType": 1
    }
        
    let options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload) 
    }

      fetch("http://localhost:8080/OSCA_war_exploded/NotificationServlet", options)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        console.log(data['numbers']);

        if (data['numbers'] != 0) {
            document.getElementById("notifyNumber").innerHTML = data['numbers'];
        }
        else{
            document.getElementById("notifyNumber").classList.add('letsHideForAwhile');
        }
        
        })
    }