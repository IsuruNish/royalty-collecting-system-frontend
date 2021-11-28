
window.addEventListener('DOMContentLoaded',()=>{
  let token = Cookies.get('Authorization');
  if(token == undefined){
    popUpFromDown("login to continue",'red')
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
          if(data != 404){
              ut = data[0]['userType']
              if(ut!=1){
                popUpFromDown("Access denied!",'red');
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

                  var picSmall = document.getElementById('profilePicSmall');           
                  picSmall.src = data[0]['DPpath'];


                  for (let i = 1; i < data.length; i++) {
                    console.log(data[i]['DPpath']);
                    var ul = document.getElementById('ul');
                      var li = document.createElement("li");
                      var DivCol1 = document.createElement("div");
                      var DivCol2 = document.createElement("div");
                      var DivCol3 = document.createElement("div");
                      var DivCol4 = document.createElement("div");
                      var DivCol6 = document.createElement("div");
                      var DivCol8 = document.createElement("div");
                      var DivCol1Img = document.createElement("img");
                      var DivCol1I = document.createElement("i");

                      DivCol1Img.src = data[i]['DPpath'];

                      DivCol2.setAttribute("data-label", "User ID");
                      DivCol3.setAttribute("data-label", "Full Name");
                      DivCol4.setAttribute("data-label", "Email");
                      DivCol6.setAttribute("data-label", "Phone");
                      DivCol8.setAttribute("data-label", "Remove User");
                      DivCol1I.setAttribute("id", "RemoveTrash");

                      li.classList.add("table-row");
                      DivCol1.classList.add("col");
                      DivCol1.classList.add("col-1");
                      DivCol2.classList.add("col");
                      DivCol2.classList.add("col-2");
                      DivCol3.classList.add("col");
                      DivCol3.classList.add("col-3");
                      DivCol4.classList.add("col");
                      DivCol4.classList.add("col-4");
                      DivCol6.classList.add("col");
                      DivCol6.classList.add("col-6");
                      DivCol8.classList.add("col");
                      DivCol8.classList.add("col-8");
                      DivCol1Img.classList.add("tableImage");
                      DivCol1I.classList.add("fas");
                      DivCol1I.classList.add("fa-trash");

                      DivCol1.appendChild(DivCol1Img);
                      DivCol8.appendChild(DivCol1I);
                      
                      li.appendChild(DivCol1);
                      li.appendChild(DivCol2);
                      li.appendChild(DivCol3);
                      li.appendChild(DivCol4);
                      li.appendChild(DivCol6);
                      li.appendChild(DivCol8);

                      DivCol2.innerHTML = data[i]['uid'];
                      DivCol3.innerHTML = data[i]['fname']+" "+data[i]['lname'];
                      DivCol4.innerHTML = data[i]['email'];
                      DivCol6.innerHTML = data[i]['phone'];
                      ul.appendChild(li);


                      DivCol1I.onclick = function(){
                        popUp("Do you want to delete "+ data[i]['fname']+" "+data[i]['lname']+ " ?")
                        userID = this.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;

                        document.getElementById("dismiss-popup-btn").addEventListener("click",function(){
                          hdiePopUp();
                          // console.log(data[i]['fname']+" "+data[i]['lname']);
                          
                          const loading = document.getElementById("loader-wrapper");
                          const realpage = document.getElementById("notsoLoad");

                          loading.classList.remove("hideME");
                          realpage.classList.add("hideME");
            
                          let token = Cookies.get('Authorization');
                          if(token == undefined){
                              popUpFromDown("login to continue",'red');
                              window.location.href='../landing_page/login.html';
                          }
                          
                          let payload = {
                              "uid":userID
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
                          .then( data => {
                            
                            popUpFromDown("Successfully deleted the user", 'greenColour');
                            setTimeout(function() {
                              window.location.href='../super_admin/SA - removeSO.html';
                          },3000);
                          })

                          .catch(err =>{
                            popUpFromDown("Error try again", 'red');
                            setTimeout(function() {
                                window.location.href='../super_admin/SA - removeSO.html';
                            },5000);
                            console.error(err);
                          });
                        });
                    }
                  }
              
                  setTimeout(function() {
                      loading.classList.add("hideME");
                      realpage.classList.remove("hideME");
                  },500);

              }
          }
          else{
            popUpFromDown("Login again!",'red');
              setTimeout(function() {
                  window.location.href='../landing_page/login.html';
              },1000);
          }

      })
      .catch(err =>{
        popUpFromDown("Login again",'red');
        setTimeout(function() {
            window.location.href='../landing_page/login.html';
        },5000);
        console.error(err);
      });
  }
});


document.getElementById("denyBTN").addEventListener("click",function(){
  hdiePopUp();
});



$("#search").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $("#ul li").not(":eq(0)").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});