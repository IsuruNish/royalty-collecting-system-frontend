
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

        fetch("http://localhost:8080/OSCA_war_exploded/SARemoveSOServlet", options)
        .then(res => res.json())
        .then((data) => {

            console.log(data);
            ut = data[0]['userType']
            if(ut!=1){
                alert("Access denied!");
                setTimeout(function() {
                    window.location.href='../landing_page/login.html';
                },1000);
            }
            else{
                const loading = document.getElementById("loader-wrapper");
                const realpage = document.getElementById("notsoLoad");
                const theDiv = document.getElementById("SODiv");
                
                var Topname = document.getElementById('Topname');
                Topname.innerHTML = "Hello "+ data[0]['fname']+",";

                for (let i = 1; i < data.length; i++) {
                    var insideDiv = document.createElement("div");
                    var uid = document.createElement("h2");
                    var name = document.createElement("h2");
                    var email = document.createElement("h2");
                    var phone = document.createElement("h2");
                    var button = document.createElement("button");
                    
                    theDiv.appendChild(insideDiv);

                    insideDiv.classList.add("profileCard");
                    button.classList.add("remove-btn");
                    button.setAttribute('id', 'deletebtn');

                    uid.innerHTML =  data[i]['uid'];
                    name.innerHTML =  data[i]['fname']+" "+data[i]['lname'];
                    email.innerHTML =  data[i]['email']
                    phone.innerHTML =  data[i]['phone']

                    button.innerHTML =  "Remove User"
                    insideDiv.appendChild(uid);
                    insideDiv.appendChild(name);
                    insideDiv.appendChild(email);
                    insideDiv.appendChild(phone);
                    insideDiv.appendChild(button);

                    button.onclick = function () {
                        var userEmail = this.previousSibling.innerHTML;
                        var userName = this.previousSibling.previousSibling.previousSibling.innerHTML;
                        var userPhone = this.previousSibling.previousSibling.innerHTML;
                        
                        console.log("hi");

                        let payload = {
                            "email":userEmail,
                            "fname":userName,
                            "phone":userPhone
                        }

                        let options = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify(payload) 
                        }
                
                        fetch("http://localhost:8080/OSCA_war_exploded/SARemoveSOServlet", options)
                        .then(window.location.href='../super_admin/SA - removeSO.html');
                        
                    };

                    // theDiv.append('<li><img src="images/' + i + '.jpg"></li>');
  
                }
               
                setTimeout(function() {
                    loading.classList.add("hideME");
                    realpage.classList.remove("hideME");
                },500);

            }

        });
    }
});